

import { Food } from "../models/food.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadImageOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";


const addFood = asyncHandler(async (req, res) => {

    const { name, price, description, category } = req.body
    const localFilePath = req?.file.path

    const uploadedResponse = await uploadImageOnCloudinary(localFilePath)

    if (!uploadedResponse.url) throw new ApiError(500, "unable to upload image, Please try agin !!")

    const foodItem = await Food.create({
        name,
        price,
        description,
        category,
        image: [
            {
                secure_url: uploadedResponse.secure_url,
                asset_id: uploadedResponse.asset_id,
                public_id: uploadedResponse.public_id
            }

        ]
    })

    return res.status(201).json({
        success: true,
        message: "food item is added",
        data: foodItem
    })
})


export { addFood }