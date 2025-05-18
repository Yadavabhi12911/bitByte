
import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { addFood } from "../controllers/food.controller.js";

const router = Router()



router.post("/add-food",upload.single("image"), addFood)


export default router