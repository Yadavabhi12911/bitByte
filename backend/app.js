

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {error} from "./src/middlewares/error.middleware.js"


const app = express()

app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))


app.use(express.json({ limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static('public'))
app.use(cookieParser())



import  userRoutes  from "./src/routes/user.routes.js"
import foodRoutes from "./src/routes/food.routes.js"

app.use("/users/v1", userRoutes)
app.use("/foods/v1", foodRoutes)




app.use(error)
export {app}