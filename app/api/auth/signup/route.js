import bcrypt from 'bcryptjs';
import connectDB from '@/db/connectDB';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectDB();
        const { email, name, password, category } = await req.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, name, password: hashedPassword, category });
        await newUser.save();

        return NextResponse.json({ message: "Signup successful" }, { status: 201 });
    }
    catch (error) {
        console.error("Signup error:", error); 
        return NextResponse.json({ error: "Signup failed" }, { status: 500 });
    }
}

