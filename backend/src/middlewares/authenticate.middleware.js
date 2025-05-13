import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"


const auntenticate = async (req, res, next) => {

    let token = req?.cookies?.myCookie

    if (!token) {
        throw new ApiError(401, "invalid token, please login first")
    }


    let decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)

    let user = await User.findById(decodedToken._id)

    if (!user) {
        throw new ApiError(401, "invalid signature , please login again!!!")
    }

    // if(user.tokenVersion !== decodedToken.tokenVersion){
    //     throw new ApiError(401, "invalid signature , please login again...")
    // }

    req.myUser = user
    next()


}


export default auntenticate