import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AdminNews = () => {
  const { backendUrl } = useContext(AppContext);
  const { aToken } = useContext(AdminContext);

  const [newsImg, setNewsImg] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Hospital');
  const [isFeatured, setIsFeatured] = useState(false);

  const handleImageChange = (e) => {
    setNewsImg(e.target.files[0]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!title || !description || !newsImg) {
      return toast.error('Please fill all fields and upload an image');
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('isFeatured', isFeatured);
      formData.append('image', newsImg);

      // debug log
      formData.forEach((value, key) => console.log(`${key}: ${value}`));

      const { data } = await axios.post(
        backendUrl + '/api/admin/news/add',
        formData,
        { headers: { aToken } } // matches AddDoctor
      );

      if (data.success) {
        toast.success(data.message);
        setNewsImg(false);
        setTitle('');
        setDescription('');
        setCategory('Hospital');
        setIsFeatured(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add News</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="news-img">
            <img
              className="w-20 h-20 bg-gray-100 rounded-lg cursor-pointer object-cover"
              src={newsImg ? URL.createObjectURL(newsImg) : assets.upload_area}
              alt="Upload News"
            />
          </label>
          <input
            type="file"
            id="news-img"
            hidden
            onChange={handleImageChange}
          />
          <p>Upload news image</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p>Title</p>
            <input
              type="text"
              placeholder="Enter News Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Description</p>
            <textarea
              placeholder="Enter News Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-3 py-2 h-32"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="Hospital">Hospital</option>
              <option value="Medical">Medical</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            <label>Mark as Featured</label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-6 text-white rounded-full hover:bg-blue-700 transition"
        >
          Add News
        </button>
      </div>
    </form>
  );
};

export default AdminNews;
