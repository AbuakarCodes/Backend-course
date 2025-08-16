import { User } from "../models/_User.model.js";
import { custom_Error } from "../utils/_CustomErrorClass.js";
import { requestError_Handler } from "../utils/_RequestWraper.js";
import { genratingRefreshAndAccessTokens } from "../utils/_GeneratingRefreshAndAccessTokens.js"
import { standardApi_Response } from "../utils/_ApiResponseClass.js";

const loginUser = requestError_Handler(async (req, res, next) => {
    const { email, password, username } = req.body
    if (!email || !password) throw new custom_Error(400, "Email or password is requied")

    const UserExisit = await User.findOne({ $or: [{ email }, { username }] })
    if (!UserExisit) throw new custom_Error(400, "User doesnot exist")

    const passwordCorrect = await UserExisit.isPasswordCorrect(password)

    if (!passwordCorrect) throw new custom_Error(401, "Password is not correct")

    const { AccessToken, RefreshToken } = await genratingRefreshAndAccessTokens(UserExisit._id)

    const LoggedInUser = await User.findById(UserExisit._id).select("-password -refreshToken")

    const Options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("AccessToken", AccessToken, Options)
        .cookie("RefreshToken", RefreshToken, Options)
        .json(
            new standardApi_Response(
                200, { LoggedInUser, AccessToken, RefreshToken }, "User Sucessfully LoggedIn"
            )
        )
})

export { loginUser }