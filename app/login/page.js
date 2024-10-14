"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [emailOrMobile, setEmailOrMobile] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isFarmer, setIsFarmer] = useState(true); // Track if logging in as Farmer or Distributor
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const category = isFarmer ? "Farmer" : "Distributor";

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailOrMobile, password, category }),
        });

        if (res.ok) {
            router.push("/"); // Redirect to the homepage if login is successful
        } else {
            const errorData = await res.json();
            setError(errorData.error || "Login failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md w-80">
                <h2 className="text-2xl font-semibold mb-2 text-black">
                    {isFarmer ? "Farmer Login" : "Distributor Login"}
                </h2>
                <button
                    onClick={() => setIsFarmer(!isFarmer)}
                    className="text-blue-500 underline mb-4 text-sm"
                >
                    {isFarmer ? "Not a farmer?" : "Not a distributor?"}
                </button>
                {error && <p className="text-red-500 mb-2">{error}</p>}
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
                    <div className="mt-6">
                        <button type="submit" className="w-full bg-blue-500 text-black py-2 rounded">
                            Login
                        </button>
                    </div>
                    <button
                        onClick={() => router.push("/signup")}
                        className="w-full mt-4 text-lg text-blue-500 underline"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
