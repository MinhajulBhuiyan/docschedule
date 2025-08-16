import News from "../models/News.js"
import cloudinary from "cloudinary"

// ➤ Add News
export const addNews = async (req, res) => {
  try {
    const { title, description, category, isFeatured } = req.body;

    if (!title || !description || !req.file) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    const news = new News({
      title,
      description,
      category,
      isFeatured,
      imageUrl: imageUpload.secure_url,
    });

    await news.save();

    res.json({ success: true, message: "News Added Successfully", news });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateNews = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, category, author, isFeatured } = req.body

    let news = await News.findById(id)
    if (!news) return res.json({ success: false, message: "News not found" })

    // If new image uploaded, update Cloudinary
    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      })
      news.imageUrl = uploaded.secure_url
    }

    news.title = title || news.title
    news.description = description || news.description
    news.category = category || news.category
    news.author = author || news.author
    news.isFeatured = isFeatured !== undefined ? isFeatured : news.isFeatured

    await news.save()
    res.json({ success: true, message: "News Updated", data: news })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

// ➤ Delete News
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params
    const news = await News.findByIdAndDelete(id)
    if (!news) return res.json({ success: false, message: "News not found" })

    res.json({ success: true, message: "News Deleted" })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

// ➤ List All News (Admin/Public)
export const listNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 })
    res.json({ success: true, data: news })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

// ➤ Get Featured News
export const getFeaturedNews = async (req, res) => {
  try {
    const news = await News.find({ isFeatured: true }).sort({ createdAt: -1 })
    res.json({ success: true, data: news })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

// ➤ Get Single News (Optional for Detail Page)
export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params
    const news = await News.findById(id)
    if (!news) return res.json({ success: false, message: "News not found" })

    res.json({ success: true, data: news })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}