
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "./api";

const Menu = () => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [menuData, setMenuData] = useState([]);

  const navigate = useNavigate();
  const ImagePath = `${API_URL}`;

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/categories`);

        const categoryTabs = res.data
          .map((item) =>
            (item.category_name || item.name || item)
              ?.toLowerCase()
              ?.replace(/\s+/g, "-")
          )
          .filter(Boolean);

        setTabs(categoryTabs);

        if (categoryTabs.length > 0) {
          setActiveTab(categoryTabs[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch Menu
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`${API_URL}/menu-dishes`);
        setMenuData(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMenu();
  }, []);

  // Filter Menu
  const filteredMenu = menuData.filter((item) => {
    const category = item.category?.toLowerCase();
    const type = item.type?.toLowerCase();
    const active = activeTab?.toLowerCase();

    return category === active || type === active;
  });

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-orange-500 tracking-[4px] uppercase text-sm font-semibold">
            Authentic Flavours
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mt-3">
            Maharashtrian Menu
          </h1>

          <div className="w-24 h-1 bg-orange-500 mx-auto mt-5 rounded-full"></div>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
            Discover the rich taste of Maharashtra with our carefully crafted
            traditional dishes made from authentic recipes.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300
                ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl scale-105"
                    : "bg-white border border-orange-100 text-gray-700 hover:border-orange-400 hover:shadow-md"
                }`}
            >
              {tab === "veg"
                ? "🥗 Veg"
                : tab === "non-veg"
                ? "🍗 Non-Veg"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(
                  `/dish/${item.name.replace(/\s+/g, "-")}`,
                  { state: item }
                )
              }
              className="group bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={`${ImagePath}/uploads/${item.image}`}
                  alt={item.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Veg / Non Veg */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white
                      ${
                        item.category?.toLowerCase() === "veg"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                  >
                    {item.category?.toLowerCase() === "veg"
                      ? "VEG"
                      : "NON VEG"}
                  </span>
                </div>

                {/* Dish Name */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-white text-xl font-bold">
                    {item.name}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <span className="text-sm uppercase text-orange-500 font-medium">
                    {item.type === "main"
                      ? "Main Course"
                      : item.type}
                  </span>

                  <span className="text-2xl font-bold text-gray-900">
                    ₹{item.price}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                  Traditional Maharashtrian delicacy prepared using fresh
                  ingredients and authentic regional spices.
                </p>

                <button
                  className="w-full mt-5 py-3 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-orange-500 to-red-500
                  hover:shadow-lg transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMenu.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-500">
              No dishes available
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
