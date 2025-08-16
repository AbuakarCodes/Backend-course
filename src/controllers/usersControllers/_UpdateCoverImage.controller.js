import { User } from "../../models/_User.model.js";
import { standardApi_Response } from "../../utils/_ApiResponseClass.js";
import { cloudinary_FileUplod } from "../../utils/_Cloudinary.js";
import { custom_Error } from "../../utils/_CustomErrorClass.js";
import { requestError_Handler } from "../../utils/_RequestWraper.js";

const UpdateCoverImage = requestError_Handler(async function (req, res, next) {
    const localPath = req.file?.path
    if (!localPath) throw new custom_Error(404, "Local file path not found");

    const cloudinaryLink = await cloudinary_FileUplod(localPath)
    if (!cloudinaryLink) throw new custom_Error(404, " Cloudinary file path not found");

    const user = await User.findByIdAndUpdate(
        req.LoggedInUser._id,
        { $set: { coverImage: cloudinaryLink.url } },
        { new: true }
    )
    if (!user) throw new custom_Error("Cover image doesn't update on DB");
    
    return res
        .status(200)
        .json(
            new standardApi_Response(200, "Avatar Updated Sucrssfully" , user.coverImage)
        )
})

export { UpdateCoverImage }