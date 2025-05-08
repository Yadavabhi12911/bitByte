import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, "name is required"]
    },
    email:{
        type:String,
        required:[true, "email is required and should be unique"],
        unique: true,
        index:1
    },
    password:{
        type:String,
        required:[true, "password is required and length should is minimum 7"],
        minlength:7
    },
    role:{
        type:String,
        enum: ["admin", "user"],
        default: "user"
    }

}, {timestamps:true})


export const User = mongoose.model("User", userSchema)