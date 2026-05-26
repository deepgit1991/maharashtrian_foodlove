import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "./api";


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
     // ✅ validation
        if (!name || !email || !password) {
            alert("All fields are required");
            return;
        }

    setLoading(true);

    try {
    const res = await axios.post(`${API_URL}/register`, {name,email,password,});
 
    if (res.status === 200) {
      alert("Signup Successful!");
      navigate("/login");
    }
    } catch (error) {
        console.log(error);
            alert(error.response?.data?.message || "Something went wrong");
    }
        setLoading(false);
  };
  

  return (
  <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative" style={{
    backgroundImage: "url('/assets/admin_login_banner.png')", }} >
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Signup Card */}
  <div className="relative z-10 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-[350px]">

    {/* Logo */}
    <div className="flex justify-center mb-4">
      <img src="/assets/logo.png" alt="Logo" className="w-16 h-16 object-contain rounded-full p-1 shadow-md" /></div>

    {/* Title */}
    <h2 className="text-3xl font-bold text-center mb-6 text-orange-700">
      Create Account 
      
    </h2>
{`${API_URL}/register`}
    {/* Name */}
    <input
      type="text"
      placeholder="Full Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
    />

    {/* Email */}
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
    />

    {/* Password */}
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full mb-5 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
    />

    {/* Button */}
    <button
      onClick={handleSignup}
      disabled={loading}
      className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition duration-300 font-semibold"
    >
      {loading ? "Creating..." : "Sign Up"}
    </button>

    {/* Login link */}
    <p className="text-center text-sm mt-4 text-gray-700">
      Already have an account?{" "}
      <span
        onClick={() => navigate("/login")}
        className="text-orange-700 cursor-pointer hover:underline font-semibold"
      >
        Login
      </span>
    </p>
  </div>
</div>
  );
}