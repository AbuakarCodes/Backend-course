import { User } from "../models/_User.model.js";
import { standardApi_Response } from "../utils/_ApiResponseClass.js";
import { custom_Error } from "../utils/_CustomErrorClass.js";
import { genratingRefreshAndAccessTokens } from "../utils/_GeneratingRefreshAndAccessTokens.js";
import { requestError_Handler } from "../utils/_RequestWraper.js";
import jwt from "jsonwebtoken"

const ifAccessTokenExpired = requestError_Handler(async function (req, res, next) {
    const incomingRefreshToken = req.cookies.RefreshToken
    if (!incomingRefreshToken) throw new custom_Error(401, "Refresh Token not found in request")

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    if (!decodedToken) throw new custom_Error(404, "Invalid refresh Token")

    const user = await User.findById(decodedToken._id)
    if (!user) throw new custom_Error(404, "User not found")

    if (incomingRefreshToken == !user.RefreshToken) throw new custom_Error(401, "users refresh Token didint match")
    const { AccessToken, RefreshToken } = await genratingRefreshAndAccessTokens(user._id)

    const Options = { httpOnly: true, secure: true }

    return res.status(200)
        .cookie("AccessToken", AccessToken, Options)
        .cookie("RefreshToken", RefreshToken, Options)
        .json(
            new standardApi_Response(200, "New Access and refresh token has assigined", { AccessToken, RefreshToken })
        )
})

export { ifAccessTokenExpired }