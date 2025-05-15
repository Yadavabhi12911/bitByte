

import mongoose from "mongoose";


const foodSchema = new mongoose.Schema({

name:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true,
    minlength:[10, "decription length should be minimun 10"]
},
price:{
    type:Number,
    required: true
},
category:{
      type:String,
    required:true
},
image:[
{
   secure_url:{
    type:String
   },

   asset_id:{
    type: String
   },

   public_id:{
    type:String
   }
}
]


}, {timestamps: true})


export const Food = mongoose.model("Food", foodSchema)