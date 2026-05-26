import { useEffect, useState } from "react";
import axios from "axios";

export default function Category() {

  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("Active");

  const [categories, setCategories] = useState([]);

  const [editId, setEditId] = useState(null);

  // Fetch Categories
  const fetchCategories = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/categories"
      );

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
          `http://localhost:5000/categories/${editId}`,
          {
            category_name: categoryName,
            status,
          }
        );

        alert("Category Updated");

      } else {

        await axios.post(
          "http://localhost:5000/categories",
          {
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
        `http://localhost:5000/categories/${id}`
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
    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6">
        Category CRUD
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 mb-8"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Enter Category Name"
            value={categoryName}
            onChange={(e) =>
              setCategoryName(e.target.value)
            }
            className="border p-3 rounded-lg"
            required
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border p-3 rounded-lg"
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>

        <button className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg">
          {editId ? "Update Category" : "Add Category"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">

        <table className="w-full">

          <thead className="bg-orange-500 text-white">

            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {categories.map((category) => (

              <tr
                key={category.id}
                className="border-b"
              >
                <td className="p-4">
                  {category.id}
                </td>

                <td className="p-4">
                  {category.category_name}
                </td>

                <td className="p-4">

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

                <td className="p-4 flex gap-3">

                  <button
                    onClick={() =>
                      handleEdit(category)
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(category.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}