

import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "./api";

export default function NewArrival() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchNewArrivalDishes = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/dishes/new-arrival`
        );
        setDishes(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNewArrivalDishes();
  }, []);

  return (
    <>
      {dishes.length > 0 && (
        <section id="new-arrivals" className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    {/* Section Header */}
    <div className="text-center mb-14">

      <div className="flex items-center justify-center gap-3 md:gap-6">

        {/* Left Line */}
        <div className="hidden sm:block w-20 md:w-40 h-[2px] bg-gradient-to-r from-transparent to-orange-500"></div>

        {/* Left Flag */}
        <img
          src="/assets/maharashtra-flag.png"
          alt="Flag"
          className="w-10 h-10 md:w-12 md:h-12"
        />

        {/* Title */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-red-700 uppercase tracking-wide">
            New Arrivals
          </h2>
        </div>

        {/* Right Flag */}
        <img
          src="/assets/maharashtra-flag.png"
          alt="Flag"
          className="w-10 h-10 md:w-12 md:h-12 scale-x-[-1]"
        />

        {/* Right Line */}
        <div className="hidden sm:block w-20 md:w-40 h-[2px] bg-gradient-to-l from-transparent to-orange-500"></div>

      </div>

      {/* Decorative Divider */}
      <div className="flex justify-center mt-4">
        <div className="w-24 h-1 bg-orange-500 rounded-full"></div>
      </div>

      {/* Subtitle */}
      <p className="mt-5 text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
        Experience the authentic taste of Maharashtra with our freshly added
        traditional delicacies prepared using age-old recipes and premium ingredients.
      </p>

    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {dishes.map((dish) => (
        <div
          key={dish.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group"
        >
          <div className="overflow-hidden">
            <img
              src={`${API_URL}/uploads/${dish.image}`}
              alt={dish.name}
              className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
            />
          </div>

          <div className="p-5">
            <h3 className="text-xl font-bold text-gray-800">
              {dish.name}
            </h3>

            <p className="text-gray-500 text-sm mt-2 line-clamp-3">
              {dish.description}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-red-600 font-bold text-xl">
                ₹{dish.price}
              </span>

              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition">
                View
              </button>
            </div>
          </div>
        </div>
      ))}

    </div>

  </div>
</section>
      )}
    </>
  );
}