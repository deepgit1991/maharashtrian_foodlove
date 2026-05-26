import React, { useState } from "react";
const specialityData = [
  {
    id: 1,
    name: "Puran Poli",
    image: "/assets/Puran-Poli-2-3.jpg",
    description: "Traditional Maharashtrian sweet flatbread stuffed with jaggery and lentils.",
  },
  {
    id: 2,
    name: "Misal Pav",
    image: "/assets/Misal-Pav-Recipe.jpg",
    description: "Spicy curry made of sprouts topped with farsan and served with pav.",
  },
  {
    id: 3,
    name: "Chicken Kolhapuri",
    image: "/assets/chicken-kolhapur.jpeg",
    description: "Famous spicy Kolhapuri chicken curry with rich masala.",
  },
  {
    id: 4,
    name: "Sabudana Vada",
    image: "/assets/sabudana-wada.jpeg",
    description: "Crispy deep-fried snack made from tapioca pearls and peanuts.",
  },
];
const OurSpeciality = () => {
  const [activeItem, setActiveItem] = useState(specialityData[0]);

  return (

      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Our Speciality
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* Left - List */}
          <div className="space-y-4">
            {specialityData.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`p-4 rounded-lg cursor-pointer transition border
                  ${
                    activeItem.id === item.id
                      ? "bg-orange-500 text-white shadow-lg"
                      : "bg-white hover:bg-orange-100"
                  }`}
              >
                {item.name}
              </div>
            ))}
          </div>

          {/* Right - Details */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
              src={activeItem.image}
              alt={activeItem.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800">
                {activeItem.name}
              </h3>
              <p className="text-gray-600 mt-2">
                {activeItem.description}
              </p>
            </div>
          </div>

        </div>
      </div>
   
  );
};

export default OurSpeciality;