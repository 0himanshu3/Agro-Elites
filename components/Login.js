import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Only for signup

  return (
    <div className="relative max-w-md w-full bg-white rounded-lg shadow-lg mx-auto my-10">
      <div className="form p-8">
        <header className="text-2xl font-medium text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </header>
        <form action="#">
          {!isLogin && (
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-16 w-full px-4 text-lg mb-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          )}
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-16 w-full px-4 text-lg mb-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-16 w-full px-4 text-lg mb-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="button"
            className="button bg-green-900 text-white text-lg font-medium mt-7 cursor-pointer transition-colors duration-300 hover:bg-teal-700 h-16 w-full rounded-lg"
            value={isLogin ? "Login" : "Sign Up"}
          />
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-teal-600 text-lg mt-4 hover:underline"
        >
          {isLogin ? "Create an account" : "Already have an account?"}
        </button>
      </div>
    </div>
  );
};

export default Login;