import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Dishes() {

  // States
  const [dishes, setDishes] = useState([]);
  const [imageFile, setImageFile] = useState(null);
 const [categories, setCategories] = useState([]);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 5;

  // Edit
  const [editId, setEditId] = useState(null);

  // File Ref
  const fileInputRef = useRef(null);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    tag: "",
    price: "",
    description: "",
  });

  // FETCH DISHES
  const fetchDishes = async (page = 1) => {

    try {

      const res = await axios.get(
        `http://localhost:5000/dishes?page=${page}&limit=${itemsPerPage}`
      );

      setDishes(res.data.dishes);

      setTotalPages(res.data.totalPages);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDishes(currentPage);
  }, [currentPage]);

   // Fetch Categories
  useEffect(() => {

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

    fetchCategories();

  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // HANDLE IMAGE
  const handleImage = (e) => {
    setImageFile(e.target.files[0]);
  };

  // ADD / UPDATE
  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("tag", formData.tag);
    data.append("price", formData.price);
    data.append("description", formData.description);
    console.log("Deepika" , editId);
    
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {

      // UPDATE
      if (editId) {
        console.log("editid" , editId);
        
        await axios.put(
          `http://localhost:5000/dishes/${editId}`,
          data
        );

        alert("Dish Updated Successfully");

      } else {

        // ADD
        await axios.post(
          "http://localhost:5000/dishes",
          data
        );

        alert("Dish Added Successfully");
      }

      fetchDishes(currentPage);

      // CLEAR FORM
      setFormData({
        name: "",
        category: "",
        tag: "",
        price: "",
        description: "",
      });

      setImageFile(null);

      setEditId(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");
    }
  };

  // EDIT
  const handleEdit = (dish) => {

    setFormData({
      name: dish.name,
      category: dish.category,
      tag: dish.tag,
      price: dish.price,
      description: dish.description,
    });

    setEditId(dish.id);
  };

  // DELETE
  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/dishes/${id}`
      );

      alert("Dish Deleted Successfully");

      fetchDishes(currentPage);

    } catch (error) {

      console.log(error);

      alert("Delete Failed");
    }
  };

  // CANCEL
  const handleCancel = () => {

    setEditId(null);

    setFormData({
      name: "",
      category: "",
      tag: "",
      price: "",
      description: "",
    });

    setImageFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  console.log(dishes);
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h2 className="text-3xl font-bold mb-6">
        Maharashtrian Dishes
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-3 gap-4 mb-6 bg-white p-6 rounded shadow"
      >

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Dish Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        {/* Category */}
        <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="border p-3 rounded"
        required
      >
        <option value="">
          Select Category
        </option>

        {categories
          .filter(
            (category) =>
              category.status === "Active"
          )
          .map((category) => (

            <option
              key={category.id}
              value={category.category_name}
            >
              {category.category_name}
            </option>

          ))}
      </select>

        {/* Tag */}
        <select
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        >
          <option value="">Select Tag</option>
          <option value="Popular">Popular</option>
          <option value="all">All</option>
          <option value="Best Seller">Best Seller</option>
          <option value="New Arrival">New Arrival</option>
          <option value="Chef Special">Chef Special</option>
        </select>

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImage}
          className="border p-2 rounded"
        />

        {/* Buttons */}
        <div className="md:col-span-3 flex gap-3">

          <button
            type="submit"
            className={`px-6 py-2 rounded text-white ${
              editId
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {editId
              ? "Update Dish"
              : "Add Dish"}
          </button>

          {editId && (

            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-6 py-2 rounded"
            >
              Cancel
            </button>

          )}
        </div>

      </form>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">ID</th>
              <th className="p-3">Dish Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Tag</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>

          </thead>

          <tbody>

            {dishes.map((dish) => (

              <tr
                key={dish.id}
                className="border-t"
              >

                {/* Image */}
                <td className="p-3">
                  <img
                    src={`http://localhost:5000/uploads/${dish.image}`}
                    alt={dish.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                </td>

                {/* ID */}
                <td className="p-3">
                  {dish.id}
                </td>

                {/* Name */}
                <td className="p-3">
                  {dish.name}
                </td>

                {/* Category */}
                <td className="p-3">
                  {dish.category}
                </td>

                {/* Tag */}
                <td className="p-3">
                  {dish.tag}
                </td>

                {/* Price */}
                <td className="p-3">
                  ₹{dish.price}
                </td>

                {/* Actions */}
                <td className="p-3 flex gap-2">

                  <button
                    onClick={() =>
                      handleEdit(dish)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(dish.id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

            {dishes.length === 0 && (

              <tr>
                <td
                  colSpan="7"
                  className="text-center p-4"
                >
                  No Dishes Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center mt-6 gap-2">

        {/* Prev */}
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev > 1 ? prev - 1 : prev
            )
          }

          disabled={currentPage === 1}

          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from(
          { length: totalPages },
          (_, i) => (

            <button
              key={i}

              onClick={() =>
                setCurrentPage(i + 1)
              }

              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>

          )
        )}

        {/* Next */}
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < totalPages
                ? prev + 1
                : prev
            )
          }

          disabled={
            currentPage === totalPages
          }

          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}