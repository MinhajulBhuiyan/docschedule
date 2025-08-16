import express from "express"
import { addNews, listNews, getFeaturedNews } from "../controllers/NewsController.js"
import authAdmin from "../middlewares/authAdmin.js"

const newsrouter = express.Router()

// admin only
router.post("/add", authAdmin, addNews)

// public
router.get("/all", listNews)
router.get("/featured", getFeaturedNews)

export default newsrouter
