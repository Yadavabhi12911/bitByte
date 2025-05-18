import mongoose from "mongoose"
import bcrypt from "bcryptjs"

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
    phoneNumber:{
        type:Number,
        required:[true, "mobile number is required"],
        minlength:[10 , "minimun length should be 10"]
    },
    role:{
        type:String,
        enum: ["admin", "user"],
        default: "user"
    },
    tokenVersion:{
        type:Number,
        default:0
    }

}, {timestamps:true})


userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next()

        let salt = await bcrypt.genSalt(12)
        let hashPassword = await bcrypt.hash(this.password, salt)
        this.password = hashPassword
})

userSchema.methods.isPasswordCorrect = async function(enterPassword){

    return await bcrypt.compare(enterPassword, this.password)
}
export const User = mongoose.model("User", userSchema)