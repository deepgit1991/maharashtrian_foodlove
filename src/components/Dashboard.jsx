import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
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
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    setUserName(user);
    if (!token && isTokenExpired(token))  {
      navigate("/login");
    }

    // Get user data
    // const userData = JSON.parse(localStorage.getItem("user"));

    // if (userData) {
    //   setUserName(userData.name);
    // }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">

        {/* Header */}
         <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-gray-700">
            Admin Panel
          </h1>

          <div className="flex items-center gap-4">

            {/* Logged User */}
            <div className="text-gray-700 font-medium">
              Welcome, { userName.replace(/"/g, "").trim().charAt(0).toUpperCase() + userName.replace(/"/g, "").trim().slice(1)}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>

          </div>
        </header>

        {/* Dynamic Content */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}