import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginUI() {
  const navigate = useNavigate(); 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-[300px]">

        <h2 className="text-xl text-center mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
        />

        {/* ✅ Your Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}