import React, { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function LoginUI() {
  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); 
  const token = localStorage.getItem("token");
  
  function isTokenExpired(token) {
  try {
    // Decode JWT payload
    const payload = JSON.parse(atob(token.split('.')[1]));

    // exp is in seconds
    const expiryTime = payload.exp * 1000;

    // Current time in milliseconds
    return Date.now() > expiryTime;
  } catch (error) {
    return true; // Invalid token
  }
}

  useEffect(() => {

    if (token && !isTokenExpired(token)) {

      console.log("Already Logged In");

      navigate("/dashboard");

    }

  }, [token, navigate]);
  const handleLogin = async () => {
      try {
        const res = await axios.post("http://localhost:5000/login", {
          email,
          password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        console.log(res.data);
        console.log(res.data.user);
        console.log(res.data.token);
        

        navigate("/dashboard");
      } catch (error) {
        alert(error.response?.data?.message || "Login failed");
      }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative" style={{
    backgroundImage: "url('/assets/admin_login_banner.png')", }}>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Login Card */}
  <div className="relative z-10 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl w-[320px]">
    
    {/* Logo */}
    <div className="flex justify-center items-center mb-4">
      <img
        src="/assets/logo.png"
        className="w-16 h-16 object-contain"
        alt="logo"
      />
    </div>

    {/* Heading */}
    <h2 className="text-2xl font-bold text-center text-orange-700 mb-5">
      Welcome Back
    </h2>

    {/* Email */}
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full mb-3 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
    />

    {/* Password */}
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full mb-4 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
    />

    {/* Login Button */}
    <button
      onClick={handleLogin}
      className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition duration-300 font-semibold"
    >
      Login
    </button>

    {/* Signup */}
    <p className="text-sm text-center mt-4 text-gray-700">
      Don’t have an account?{" "}
      <span
        onClick={() => navigate("/signup")}
        className="text-orange-700 font-semibold cursor-pointer hover:underline"
      >
        Sign Up
      </span>
    </p>
  </div>
</div>
  );
}