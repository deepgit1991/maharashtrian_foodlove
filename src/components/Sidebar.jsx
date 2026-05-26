import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, UtensilsCrossed , Shapes} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Customers", path: "/dashboard/customers", icon: <Users size={18} /> },
    { name: "Dishes", path: "/dashboard/dishes", icon: <UtensilsCrossed size={18} /> },
    { name: "Category", path: "/dashboard/category", icon: <Shapes size={18} /> },
  ];

  return (
   <aside className="w-64 min-h-screen bg-[#1e293b] text-white p-5 shadow-xl">

  {/* Logo + Title */}
  <div className="flex items-center gap-3 mb-10 border-b border-gray-700 pb-5">
    
    <img
      src="/assets/logo.png"
      alt="Logo"
      className="w-14 h-14 object-contain rounded-full  p-1 shadow-md"
    />

    <div>
      <h2 className="text-2xl font-bold text-orange-400">
        Admin
      </h2>

      <p className="text-xs text-gray-300 tracking-wide">
        Maharashtrian Food
      </p>
    </div>
  </div>

  {/* Menu */}
  <ul className="space-y-3">
    {menu.map((item) => (
      <li key={item.name}>
        <Link
          to={item.path}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
          ${
            location.pathname === item.path
              ? "bg-orange-500 text-white shadow-lg"
              : "hover:bg-[#334155] hover:text-orange-400"
          }`}
        >
          <span className="text-lg">{item.icon}</span>
          <span className="font-medium">{item.name}</span>
        </Link>
      </li>
    ))}
  </ul>
</aside>
  );
}