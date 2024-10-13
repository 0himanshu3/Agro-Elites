import connectDB from '@/db/connectDB';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
    await connectDB();
    const { email, password, category } = await req.json();

    try {
        const user = await User.findOne({ email });
        const isMatchCategory = user.category === category;
        
        if (!user || !isMatchCategory) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const isMatchPassword = bcrypt.compareSync(password, user.password);
        
        if (!isMatchPassword) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({ message: 'Login successful', user: { email: user.email, name: user.name, category: user.category } });
    }
    catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
