import { useState, useRef, useEffect } from "react";
import axios from "axios";
import API_URL from "./api";
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
        `${API_URL}/dishes?page=${page}&limit=${itemsPerPage}`
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
          `${API_URL}/categories`
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
          `${API_URL}/dishes/${editId}`,
          data
        );

        alert("Dish Updated Successfully");

      } else {

        // ADD
        await axios.post(
          `${API_URL}/dishes`,
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
        `${API_URL}/dishes/${id}`
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
  <div className="p-3 sm:p-6 bg-gray-100 min-h-screen overflow-x-hidden">

    {/* Heading */}
    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
      Maharashtrian Dishes
    </h2>

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 bg-white p-4 sm:p-6 rounded shadow"
    >

      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Dish Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-3 rounded w-full"
        required
      />

      {/* Category */}
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="border p-3 rounded w-full"
        required
      >
        <option value="">Select Category</option>

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
        className="border p-3 rounded w-full"
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
        className="border p-3 rounded w-full"
        required
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border p-3 rounded w-full md:col-span-2 lg:col-span-1"
        required
      />

      {/* Image */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImage}
        className="border p-2 rounded w-full"
      />

      {/* Buttons */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-wrap gap-3">

        <button
          type="submit"
          className={`px-6 py-2 rounded text-white ${
            editId
              ? "bg-yellow-500"
              : "bg-orange-500"
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
    <div className="hidden md:block bg-white rounded shadow w-full overflow-x-auto">
    
      <table className="min-w-[700px] md:min-w-full text-left">

        <thead className="bg-[#1e293b] text-white">

          <tr>
            <th className="p-2 sm:p-3">Image</th>
            <th className="p-2 sm:p-3">ID</th>
            <th className="p-2 sm:p-3">Dish Name</th>
            <th className="p-2 sm:p-3">Category</th>
            <th className="p-2 sm:p-3">Tag</th>
            <th className="p-2 sm:p-3">Price</th>
            <th className="p-2 sm:p-3">Actions</th>
          </tr>

        </thead>

        <tbody>

          {dishes.map((dish) => (

            <tr
              key={dish.id}
              className="border-t"
            >

              {/* Image */}
              <td className="p-2 sm:p-3">
                <img
                  src={`${API_URL}/uploads/${dish.image}`}
                  alt={dish.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
                />
              </td>

              {/* ID */}
              <td className="p-2 sm:p-3 whitespace-nowrap">
                {dish.id}
              </td>

              {/* Name */}
              <td className="p-2 sm:p-3 whitespace-nowrap">
                {dish.name}
              </td>

              {/* Category */}
              <td className="p-2 sm:p-3 whitespace-nowrap">
                {dish.category}
              </td>

              {/* Tag */}
              <td className="p-2 sm:p-3 whitespace-nowrap">
                {dish.tag}
              </td>

              {/* Price */}
              <td className="p-2 sm:p-3 whitespace-nowrap">
                ₹{dish.price}
              </td>

              {/* Actions */}
              <td className="p-2 sm:p-3">

                <div className="flex flex-col sm:flex-row gap-2">

                  <button
                    onClick={() =>
                      handleEdit(dish)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(dish.id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>

                </div>

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
<div className="block md:hidden">
  {dishes.map((dish) => (
    <div
      key={dish.id}
      className="bg-white p-4 rounded shadow mb-3"
    >
      <img
        src={`${API_URL}/uploads/${dish.image}`}
        className="w-16 h-16 object-cover rounded mb-2"
      />

      <p><strong>{dish.name}</strong></p>
      <p>{dish.category}</p>
      <p>₹{dish.price}</p>

      <div className="flex gap-2 mt-3">
        <button className="bg-blue-500 text-white px-3 py-1 rounded">
          Edit
        </button>

        <button className="bg-red-500 text-white px-3 py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
    {/* PAGINATION */}
    <div className="flex flex-wrap justify-center items-center mt-6 gap-2">

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