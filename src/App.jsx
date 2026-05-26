import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import ScrollToHash from "./components/ScrollToHash";

import Home from "./components/Home";
import Ourstory from "./components/Ourstory";
import Menu from "./components/Menu";
import Branches from "./components/Branches";
import ContactUI from "./components/ContactUI";
import OurSpeciality from "./components/OurSpeciality";
import Login from "./components/LoginUI";
import Dashboard from "./components/Dashboard";
import Customers from "./components/Customers";
import  DashboardHome from "./components/DashboardHome";
import Dishes from "./components/Dishes";
import ProtectedRoute from "./components/ProtectedRoute";
import DishDetails from "./components/DishDetails";
import NewArrival from "./components/NewArrival";
import Signup from "./components/Signup";
import Category from "./components/Category";
export default function App() {
 
  return (
    <Router>
      <Routes>

        {/* ✅ With Header/Footer */}
        <Route element={<MainLayout />}>
            <Route path="/dish/:id" element={<DishDetails />} />
          <Route
            path="/"
            element={
              <>
                <ScrollToHash />

                {/* HOME */}
                <section id="home" className="h-screen flex items-center bg-gradient-to-r from-orange-100 to-yellow-100 home-bg-img">
                  <Home />
                </section>

                {/* OUR STORY */}
                <section id="ourstory" className="h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-yellow-100">
                  <Ourstory />
                </section>

               <NewArrival />

                
                {/* MENU */}
                <section id="menu" className="min-h-screen py-12 bg-gray-50">
                  <Menu />
                </section>

                {/* RECIPE */}
                <section id="recipe" className="min-h-screen py-12 bg-[#fbf4ef]">
                  <OurSpeciality />
                </section>

                {/* BRANCHES */}
                <section id="ourbranches" className="min-h-screen flex items-center justify-center bg-gray-50 bg-branches">
                  <Branches />
                </section>

                {/* CONTACT */}
                <section id="contact" className="min-h-screen flex items-center justify-center bg-gray-50">
                  <ContactUI />
                </section>
              </>
            }
          />
        </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
              <Route index element={<DashboardHome />} />
              <Route path="customers" element={<Customers />} />
              <Route path="dishes" element={<Dishes />} />
              <Route path="category" element={<Category />} />
            </Route>
      </Routes>
    </Router>
  );
}