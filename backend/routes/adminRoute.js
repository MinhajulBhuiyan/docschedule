import express from 'express';
import { loginAdmin, appointmentsAdmin, appointmentCancel, addDoctor, allDoctors, adminDashboard, updateDoctor } from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/doctorController.js';
import authAdmin from '../middlewares/authAdmin.js';
import upload from '../middlewares/multer.js';
import { addNews,updateNews,deleteNews,listNews } from '../controllers/NewsController.js';
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.get("/all-doctors", authAdmin, allDoctors)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.get("/dashboard", authAdmin, adminDashboard)
<<<<<<< HEAD
adminRouter.post("/news/add", authAdmin, upload.single("image"), addNews);
adminRouter.put("/news/update/:id", authAdmin, upload.single("image"), updateNews);
adminRouter.delete("/news/delete/:id", authAdmin, deleteNews);
adminRouter.get("/news", listNews);
=======
adminRouter.post("/update-doctor", authAdmin, updateDoctor)

>>>>>>> ae1b6ab (resolve the issue of doctor list and ui)
export default adminRouter;