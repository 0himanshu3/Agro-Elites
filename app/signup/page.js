"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
    const [category, setCategory] = useState("");
    const [emailOrMobile, setEmailOrMobile] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailOrMobile, name, password, category }),
        });

        if (res.ok) {
            router.push("/"); 
        }
        else {
            setError("User already exists or something went wrong.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md w-80">
                <h2 className="text-2xl font-semibold mb-4 text-black">Sign Up</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-black">
                        <span>Email / Mobile Number</span>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded text-black"
                            required
                            value={emailOrMobile}
                            onChange={(e) => setEmailOrMobile(e.target.value)}
                        />
                    </label>
                    <label className="block mb-2 text-black">
                        <span>Name</span>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded text-black"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label className="block mb-4 text-black">
                        <span>Password</span>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded text-black"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label className="block mb-4 text-black">
                        <span>Category</span>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Farmer">Farmer</option>
                            <option value="Distributor">Distributor</option>
                        </select>
                    </label>
                    <div className="mt-6">
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                            Sign Up
                        </button>
                    </div>
                    <button
                        onClick={() => router.push("/login")}
                        className="w-full mt-4 text-lg text-blue-500 underline"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
