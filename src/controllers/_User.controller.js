import { requestError_Handler } from "../utils/_RequestWraper.js"
import { custom_Error } from "../utils/_CustomErrorClass.js"
import { User } from "../models/_User.model.js"
import { cloudinary_FileUplod } from "../utils/_Cloudinary,.js"

const registerUser = requestError_Handler(async (req, res, next) => {

    const { email, fullname, password, userName } = req.body
    const existedUser = await User.findOne({ $or: [{ email }, { userName }] })
    let avatarLocalPath
    let coverImageLocalPath

    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.lenngth > 0) {
        avatarLocalPath = req.files?.avatar[0]?.path
    }

    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        req.files?.coverImage[0]?.path
    }

    const avatarCloud = await cloudinary_FileUplod(avatarLocalPath)
    const coverImageCloud = await cloudinary_FileUplod(coverImageLocalPath)


    if ([email, fullname, password].some(field => field == ""))
        throw new custom_Error(404, "All fields are requied")

    if (existedUser) throw new custom_Error(409, "Already existed")

    if (!avatarLocalPath || !coverImageLocalPath) throw new custom_Error(400, "Avatar or Cover Image is requied")
    if (!avatarCloud || !coverImageCloud) throw new custom_Error(400, "Avatar or Cover Image is not Uploded")

    const UserDatabase = await User.create({
        fullname,
        email,
        password,
        userName: userName.toLowerCase(),
        avatar: avatarCloud?.url || "",
        coverImage: coverImageCloud?.url || ""
    })

    const UserHasCreated = await UserDatabase.findById(UserDatabase._id).select(
        "-password -refreshToken"
    )

    if (!UserHasCreated) throw new custom_Error(500, "User not created")


    return res.status(201).json(
        new standardApi_Response(200, "done", UserHasCreated)
    )

})



export { registerUser }
