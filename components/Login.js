import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative max-w-md w-full bg-white rounded-lg shadow-lg mx-auto my-10">
      <div className="form p-8">
        <header className="text-2xl font-medium text-center mb-6">Login</header>
        <form action="#">
          <input
            type="text"
            placeholder="Enter your email"
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
          <a href="#" className="text-teal-600 text-lg hover:underline">
            Forgot password?
          </a>
          <input
            type="button"
            className="button bg-teal-600 bg-green-900 text-white text-lg font-medium mt-7 cursor-pointer transition-colors duration-300 hover:bg-teal-700 h-16 w-full rounded-lg"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
