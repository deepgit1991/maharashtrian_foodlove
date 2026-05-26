import { useLocation, useNavigate } from "react-router-dom";

export default function DishDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const ImagePath = "http://localhost:5000";
  const dish = location.state;
  console.log(dish);
  
  if (!dish) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Dish not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-[80px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <span
            className="cursor-pointer hover:text-orange-600"
            onClick={() => navigate("/")}
          >
            Home
          </span>

          <span>/</span>

          <span
            className="cursor-pointer hover:text-orange-600"
            onClick={() =>navigate("/#menu")}
          >
            Menu
          </span>

          <span>/</span>

          <span className="text-gray-800 font-medium">
            {dish.name}
          </span>
        </div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT - IMAGE */}
          <div>
            <img
              src={`${ImagePath}/uploads/${dish.image}`}
             
              alt={dish.name}
              className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
            />
          </div>

          {/* RIGHT - TEXT */}
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-800">
              {dish.name}
            </h2>

            <p className="mt-4 text-gray-700 leading-relaxed">
              Category: {dish.category}
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed">
              Description: {dish.description}
            </p>

            <div className="mt-6 text-4xl border-l-4 border-yellow-600 pl-4 italic text-gray-800">
              {dish.price}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}