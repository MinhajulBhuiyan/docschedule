import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../../App";

const AdminNews = ({ aToken }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Hospital");
  const [isFeatured, setIsFeatured] = useState(false);
  const [newsImg, setNewsImg] = useState(null);

  const handleImageChange = (e) => {
    setNewsImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !newsImg) {
      return toast.error("Please fill all fields");
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("isFeatured", isFeatured);
      formData.append("image", newsImg);

      // Debugging log
      formData.forEach((v, k) => console.log(`${k}: ${v}`));

      const { data } = await axios.post(
        `${backendUrl}/api/admin/news/add`,
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setDescription("");
        setCategory("Hospital");
        setIsFeatured(false);
        setNewsImg(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📰 Add News</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter News Title"
          className="w-full border rounded-lg p-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter News Description"
          className="w-full border rounded-lg p-3 h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full border rounded-lg p-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Hospital">Hospital</option>
          <option value="Medical">Medical</option>
        </select>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          <label>Mark as Featured</label>
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add News
        </button>
      </form>
    </div>
  );
};

export default AdminNews;
