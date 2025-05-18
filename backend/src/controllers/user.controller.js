import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from '../utils/ApiResponse.js';
import generateToken from "../utils/jwt.js"

import  asyncHandler  from "../utils/asyncHandler.js"


const register = asyncHandler(async (req, res) => {

  const { name, password, email, phoneNumber } = req.body

  let existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new ApiError(400, "user already exists")
  }

  let user = await User.create({
    name,
    email,
    password,
    phoneNumber
  })

  if (!user) {
    throw new ApiError(false, 500, "user not created")
  }

  let createdUser = await User.findOne({ email }).select("-password")


  return res.status(201).json(
    new ApiResponse(201, { createdUser }, "user register successfully")
  )
})

const login = asyncHandler( async( req, res) => {

  const {email, password} = req.body

  const user = await User.findOne({email})

  if(!user){
    throw new ApiError(404, "user not found with this email id")
  }

  let isPassMatch = await user.isPasswordCorrect(password)
  if(!isPassMatch){
    throw new ApiError(400, "Wrong Credentials!!")
  }

  const options={
    httpOnly:true,
    secure:true,
    maxAge: 1 * 60 * 1000
  }
  
  let token = await generateToken(user._id)

  

  return res.status(200)
  .cookie("myCookie", token, options)
  .json(
    new ApiResponse(200, {user}, "user logged in successfully")
  )

})

const logout = asyncHandler(async (req, res) => {
  const { id } = req.myUser;

  const userLogout = await User.findByIdAndUpdate(
    id,
    { $inc: { tokenVersion: 1 } },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("myCookie")
    .json(new ApiResponse(200, { userLogout }, "User logged out successfully"));
});



export { register, login, logout }