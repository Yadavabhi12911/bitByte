import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from '../utils/ApiResponse.js';

import { asyncHandler } from "../utils/asyncHandler.js"


const register = asyncHandler(async (req, res) => {

  const { name, password, email } = req.body

  if (!name || !password || !email) {
    throw new ApiError(400, "please provide all feilds")
  }

  let existingUser = await User.findOne({ email })




  if (existingUser) {
    throw new ApiError(400, "user already exists")
  }

  let user = await User.create({
    name,
    email,
    password
  })

  if (!user) {
    throw new ApiError(false, 500, "user not created")
  }

  let createdUser = await User.findOne({ email }).select("-password")


  return res.status(201).json(
    new ApiResponse(201, { createdUser }, "user register successfully")
  )
})


export { register }