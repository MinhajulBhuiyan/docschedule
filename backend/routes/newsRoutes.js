import express from "express"
import { addNews, listNews, getFeaturedNews } from "../controllers/NewsController.js"
import authAdmin from "../middlewares/authAdmin.js"

const newsrouter = express.Router()

// admin only
newsrouter.post("/add", authAdmin, addNews)

// public
newsrouter.get("/all", listNews)
newsrouter.get("/featured", getFeaturedNews)

export default newsrouter
