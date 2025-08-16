import News from "../models/newsModel.js"
import cloudinary from "cloudinary"

// ➤ Add News
export const addNews = async (req, res) => {
  try {
    const { title, description, category, author, isFeatured } = req.body
    const imageFile = req.file

    if (!title || !description) {
      return res.json({ success: false, message: "Missing required fields" })
    }

    // Upload to Cloudinary
    const uploaded = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })

    const news = new News({
      title,
      description,
      category: category || "Hospital",
      author: author || "Admin",
      isFeatured: isFeatured || false,
      imageUrl: uploaded.secure_url,
    })

    await news.save()
    res.json({ success: true, message: "News Added", data: news })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

// ➤ Get All News
export const listNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 })
    res.json({ success: true, data: news })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// ➤ Get Featured News
export const getFeaturedNews = async (req, res) => {
  try {
    const news = await News.find({ isFeatured: true }).sort({ createdAt: -1 })
    res.json({ success: true, data: news })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
