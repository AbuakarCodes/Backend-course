import { User } from "../models/_User.model.js";
import { requestError_Handler } from "../utils/_RequestWraper.js";
import { standardApi_Response } from "../utils/_ApiResponseClass.js";

const logoutUser = requestError_Handler(async (req, res, next) => {
    await User.findByIdAndUpdate(
        req.LoggedInUser._id,
        { $set: { refreshToken: undefined } },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true, 
        sameSite: "strict"
    };

    return res
        .status(200)
        .clearCookie("AccessToken", options)
        .json(new standardApi_Response(200, {}, "User successfully logged out"));
});

export { logoutUser };
