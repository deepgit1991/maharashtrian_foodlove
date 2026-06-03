import { useState , useEffect  } from "react";
import axios from "axios";
import API_URL from "./api";

export default function OrderPage() {
 

  const [mobileNumber, setMobileNumber] = useState("");
  const [customer, setCustomer] = useState(null);

  const [search, setSearch] = useState("");
  const [dishes, setDishes] = useState([]);

  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  const validateMobile = (num) => /^[6-9]\d{9}$/.test(num);

  // 1️⃣ Create customer/order
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateMobile(mobileNumber)) {
      alert("Invalid mobile number");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/orders`, {
        mobileNumber,
      });

      setCustomer(res.data);
      console.log(res.data);
      localStorage.setItem("customer", JSON.stringify(res.data));
      setMobileNumber("");
    } catch (err) {
      console.log(err);
    }
  };

  // 2️⃣ Search dishes
  const searchDishes = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/filterdishes?q=${search}`
      );
    const data = res.data;
    const list = Array.isArray(data)
      ? data
      : data?.dishes || data?.data || [];

    setDishes(list);
    } catch (err) {
      console.log(err);
    }
  };

  // 3️⃣ Add to cart
  const addToCart = (dish) => {
    setCart([...cart, dish]);
  };

  // 4️⃣ Remove from cart
  const removeFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  // 5️⃣ Total amount
  const totalAmount = cart.reduce(
  (sum, item) => sum + Number(item.price),
  0
);
 useEffect(() => {
  const savedCustomer = localStorage.getItem("customer");

  if (savedCustomer) {
    setCustomer(JSON.parse(savedCustomer));
    console.log(savedCustomer);
    
  }
  }, []);
  // 6️⃣ Place order
 const placeOrder = async () => {
    const customerId = customer?.customerId;
  try {
    await axios.post(`${API_URL}/place-order`, {
      customerId: customerId,
      items: cart,
      totalAmount,
    });

    alert("🎉 Your Order Booked Successfully!");
     setCart([]);
    setSearch("");
    setDishes([]);
    setCustomer(null);
    setMobileNumber("");
    setMessage("");

    localStorage.removeItem("customer");
  } catch (err) {
    console.log(err);
    alert("❌ Order failed. Please try again.");
  }
};

 

  return (
    <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg flex gap-6">

        <div className="w-2/3">
  <h2 className="text-2xl font-bold text-center mb-4">
    Food Order System
  </h2>

  {/* CUSTOMER */}
  {!customer?.customerId && (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        className="w-full border p-3 rounded"
        placeholder="Enter mobile number"
        value={mobileNumber}
        onChange={(e) =>
          setMobileNumber(e.target.value.replace(/\D/g, ""))
        }
        maxLength={10}
      />

      <button className="w-full bg-blue-600 text-white p-3 rounded">
        Create Customer
      </button>
    </form>
  )}

  {/* CUSTOMER INFO */}
  {customer?.customerId && (
    <div className="bg-green-100 p-3 rounded mb-4 flex justify-between">
      <p>
        <b>Customer ID:</b> {customer.customerId}
      </p>
      <p>
        <b>Mobile:</b> {customer.mobileNumber}
      </p>
    </div>
  )}

  {/* SEARCH */}
  {customer && (
    <>
      <div className="flex gap-2">
        <input
          className="border p-2 w-full"
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="button"
          onClick={searchDishes}
          className="bg-black text-white px-4"
        >
          Search
        </button>
      </div>

      {/* DISH LIST */}
      <div className="mt-3 space-y-2">
        {dishes.map((dish, i) => (
          <div key={i} className="flex justify-between border p-2 rounded">
            <div>
              <p className="font-semibold">{dish.name}</p>
              <p className="text-sm text-gray-500">₹{dish.price}</p>
            </div>

            <button
              onClick={() => addToCart(dish)}
              className="bg-blue-500 text-white px-3 rounded"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </>
  )}
</div>


<div className="w-1/3 border-l pl-6">
  {cart.length > 0 && (
    <div>
      <h3 className="font-bold text-lg mb-3">🛒 Cart</h3>

      {cart.map((item, i) => (
        <div key={i} className="flex justify-between border-b py-1">
          <span>{item.name}</span>
          <div className="flex gap-2">
            <span>₹{item.price}</span>
            <button
              onClick={() => removeFromCart(i)}
              className="text-red-500"
            >
              X
            </button>
          </div>
        </div>
      ))}

      <p className="mt-2 font-bold">Total: ₹{totalAmount}</p>

      <button
        onClick={placeOrder}
        className="w-full bg-green-600 text-white p-2 mt-3 rounded"
      >
        Confirm Order
      </button>
    </div>
  )}

  {cart.length === 0 && (
    <p className="text-gray-400 text-center mt-10">
      Place Order
    </p>
  )}
</div>
      </div>
    </div>
  );
}