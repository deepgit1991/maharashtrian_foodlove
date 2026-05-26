

import { useEffect, useState } from "react";
import axios from "axios";

export default function NewArrival() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchNewArrivalDishes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/dishes/new-arrival"
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
        <section id="new-arrivals" className="py-16">
          <div className="max-w-7xl mx-auto px-6">

            {/* Heading */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-red-600">
                New Arrivals
              </h2>

              <p className="text-gray-500 mt-3">
                Freshly added Maharashtrian special dishes
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-gray-50 rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
                >
                  <img
                    src={`http://localhost:5000/uploads/${dish.image}`}
                    alt={dish.name}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-semibold">
                      {dish.name}
                    </h3>

                    <p className="text-gray-500 text-sm mt-2">
                      {dish.description}
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-red-500 font-bold text-lg">
                        ₹{dish.price}
                      </span>

                      
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