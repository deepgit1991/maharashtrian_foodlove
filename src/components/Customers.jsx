import { useState } from "react";

export default function Customers() {
  const [search, setSearch] = useState("");

  const [customers, setCustomers] = useState([
    { id: 1, name: "Rahul Patil", email: "rahul@gmail.com", phone: "9876543210" },
    { id: 2, name: "Sneha Joshi", email: "sneha@gmail.com", phone: "9123456780" },
    { id: 3, name: "Amit Sharma", email: "amit@gmail.com", phone: "9988776655" },
  ]);

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="p-3 sm:p-6 overflow-x-hidden">

  {/* 🔝 Header */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">

    <h2 className="text-2xl font-bold text-center sm:text-left">
      👥 Customers
    </h2>

    <input
      type="text"
      placeholder="Search customer..."
      className="border px-3 py-2 rounded w-full sm:w-72"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

  </div>

  {/* 📱 MOBILE CARD VIEW */}
  <div className="block md:hidden space-y-4">

    {filteredCustomers.length > 0 ? (

      filteredCustomers.map((c) => (

        <div
          key={c.id}
          className="bg-white shadow rounded-lg p-4"
        >

          <div className="mb-2">
            <p className="text-sm text-gray-500">
              ID
            </p>

            <p className="font-medium">
              {c.id}
            </p>
          </div>

          <div className="mb-2">
            <p className="text-sm text-gray-500">
              Name
            </p>

            <p className="font-medium">
              {c.name}
            </p>
          </div>

          <div className="mb-2">
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="break-all">
              {c.email}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p>
              {c.phone}
            </p>
          </div>

          <button
            onClick={() => handleDelete(c.id)}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

        </div>

      ))

    ) : (

      <div className="bg-white shadow rounded-lg p-4 text-center text-gray-500">
        No customers found
      </div>

    )}

  </div>

  {/* 💻 DESKTOP TABLE VIEW */}
  <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">

    <table className="min-w-full text-left">

      <thead className="bg-gray-100">

        <tr>
          <th className="p-3">ID</th>
          <th className="p-3">Name</th>
          <th className="p-3">Email</th>
          <th className="p-3">Phone</th>
          <th className="p-3">Action</th>
        </tr>

      </thead>

      <tbody>

        {filteredCustomers.length > 0 ? (

          filteredCustomers.map((c) => (

            <tr
              key={c.id}
              className="border-t"
            >

              <td className="p-3">
                {c.id}
              </td>

              <td className="p-3">
                {c.name}
              </td>

              <td className="p-3 break-all">
                {c.email}
              </td>

              <td className="p-3">
                {c.phone}
              </td>

              <td className="p-3">

                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td
              colSpan="5"
              className="p-3 text-center text-gray-500"
            >
              No customers found
            </td>

          </tr>

        )}

      </tbody>

    </table>

  </div>

</div>
  );
}