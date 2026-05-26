import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [menuData, setMenuData] = useState([]);
  const navigate = useNavigate();
  const ImagePath = "http://localhost:5000";

  // =========================
  // FETCH CATEGORIES (TABS)
  // =========================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/categories");

        console.log("categories API:", res.data);

        // SAFE MAPPING (handles string OR object)
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

  // =========================
  // FETCH MENU DATA
  // =========================
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:5000/menu-dishes");

        console.log("menu API:", res.data);

        setMenuData(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMenu();
  }, []);

  // =========================
  // FILTER MENU
  // =========================
  const filteredMenu = menuData.filter((item) => {
    const category = item.category?.toLowerCase();
    const type = item.type?.toLowerCase();
    const active = activeTab?.toLowerCase();

    return category === active || type === active;
  });

  console.log("tabs:", tabs);
  console.log("activeTab:", activeTab);
  console.log("filteredMenu:", filteredMenu);

  return (
    <div className="flex items-center py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Maharashtrian Food Menu
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeTab === tab
                    ? "bg-orange-500 text-white shadow-md scale-105"
                    : "bg-white text-gray-600 border hover:bg-orange-100"
                }`}
            >
              {tab === "non-veg" ? "Non-Veg" : tab}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(
                  `/dish/${item.name.replace(/\s+/g, "-")}`,
                  { state: item }
                )
              }
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="w-full aspect-square relative overflow-hidden">
                <img
                 src={`${ImagePath}/uploads/${item.image}`}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h2 className="text-white font-semibold text-lg text-center px-2">
                    {item.name}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>

                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium
                      ${
                        item.category === "veg"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                  >
                    {item.category === "veg" ? "Veg" : item.category}
                  </span>

                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {item.type === "main" ? "Main Course" : item.type}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-orange-500 font-bold">
                    {item.price}
                  </p>

                  <button className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm hover:bg-orange-600">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Menu;