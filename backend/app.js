

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
app.use(cookieParser())
app.use(error)


import  userRoutes  from "./src/routes/user.routes.js"

app.use("/users/v1", userRoutes)





export {app}