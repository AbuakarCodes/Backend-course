import { requestError_Handler } from "../utils/_RequestWraper.js"
import { custom_Error } from "../utils/_CustomErrorClass.js"
import { User } from "../models/_User.model.js"


const registerUser = requestError_Handler(async (req, res, next) => {

    const { email, fullname, password, userName } = req.body
    const existedUser = User.findOne({ $or: [{ email }, { userName }] })

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    
    const avatarCloud = await cloudinary_FileUplod(avatarLocalPath)
    const coverImageCloud = await cloudinary_FileUplod(coverImageLocalPath)


    if ([email, fullname, password].some(field => field == ""))
        throw new custom_Error(404, "All fields are requied")

    if (existedUser) throw new custom_Error(409, "Already existed")

    if (!avatarLocalPath || !coverImageLocalPath) throw new custom_Error(400, "Avatar or Cover Image is requied")
    if (!avatarCloud || !coverImageCloud) throw new custom_Error(400, "Avatar or Cover Image is not Uploded")

    const UserDatabase = await User.create({
        fullname,
        avatar: avatarCloud?.url || "",
        coverImage: coverImageCloud?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
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
