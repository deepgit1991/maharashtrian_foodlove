import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "./api";
export default function Category() {

  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("Active");

  const [categories, setCategories] = useState([]);

  const [editId, setEditId] = useState(null);

  // Fetch Categories
  const fetchCategories = async () => {

    try {

      const res = await axios.get(`${API_URL}/categories`);

      setCategories(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add / Update
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        await axios.put(
          `${API_URL}/categories/${editId}`,
          {
            category_name: categoryName,
            status,
          }
        );

        alert("Category Updated");

      } else {

        await axios.post(`${API_URL}/categories`, {
            category_name: categoryName,
            status,
          }
        );

        alert("Category Added");
      }

      setCategoryName("");
      setStatus("Active");
      setEditId(null);

      fetchCategories();

    } catch (error) {
      console.log(error);
    }
  };

  // Delete
  const handleDelete = async (id) => {

    if (!window.confirm("Delete Category?")) {
      return;
    }

    try {

      await axios.delete(
        `${API_URL}/categories/${id}`
      );

      fetchCategories();

    } catch (error) {
      console.log(error);
    }
  };

  // Edit
  const handleEdit = (category) => {

    setEditId(category.id);

    setCategoryName(category.category_name);

    setStatus(category.status);
  };

 return (
  <div className="p-3 sm:p-6 overflow-x-hidden">

    {/* Heading */}
    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
      Category CRUD
    </h2>

    {/* Form */}
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-8"
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Category Input */}
        <input
          type="text"
          placeholder="Enter Category Name"
          value={categoryName}
          onChange={(e) =>
            setCategoryName(e.target.value)
          }
          className="border p-3 rounded w-full"
          required
        />

        {/* Status Select */}
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="border p-3 rounded w-full"
        >
          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>
        </select>
      </div>

      {/* Submit Button */}
      <button className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded w-full sm:w-auto">
        {editId
          ? "Update Category"
          : "Add Category"}
      </button>

    </form>

    {/* MOBILE CARD VIEW */}
    <div className="block md:hidden space-y-4">

      {categories.map((category) => (

        <div
          key={category.id}
          className="bg-white shadow rounded-lg p-4"
        >

          <div className="mb-2">
            <p className="text-sm text-gray-500">
              ID
            </p>

            <p className="font-medium">
              {category.id}
            </p>
          </div>

          <div className="mb-2">
            <p className="text-sm text-gray-500">
              Category
            </p>

            <p className="font-medium">
              {category.category_name}
            </p>
          </div>

          <div className="mb-4">
            <span
              className={`px-3 py-1 rounded-full text-white text-sm
              ${
                category.status === "Active"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {category.status}
            </span>
          </div>

          <div className="flex gap-2">

            <button
              onClick={() =>
                handleEdit(category)
              }
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(category.id)
              }
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

    {/* DESKTOP TABLE VIEW */}
    <div className="hidden md:block overflow-x-auto bg-white shadow-lg rounded-lg">

      <table className="min-w-full">

        <thead className="bg-[#1e293b] text-white">

          <tr>
            <th className="p-4 text-left">
              ID
            </th>

            <th className="p-4 text-left">
              Category
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>

        </thead>

        <tbody>

          {categories.map((category) => (

            <tr
              key={category.id}
              className="border-b"
            >

              <td className="px-4 py-3">
                {category.id}
              </td>

              <td className="px-4 py-3">
                {category.category_name}
              </td>

              <td className="px-4 py-3">

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm
                  ${
                    category.status === "Active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {category.status}
                </span>

              </td>

              <td className="px-4 py-3">

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      handleEdit(category)
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(category.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>
);
}