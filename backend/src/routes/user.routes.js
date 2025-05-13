
import { Router } from "express"
import {login, logout, register} from "../controllers/user.controller.js"
import authenticate from "../middlewares/authenticate.middleware.js"

const router = Router()


router.post("/register", register)
router.post("/login", login)


router.get("/logout",authenticate, logout)


export default router