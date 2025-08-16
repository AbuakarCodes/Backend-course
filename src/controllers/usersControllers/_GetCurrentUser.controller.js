import { standardApi_Response } from "../../utils/_ApiResponseClass.js";
import { requestError_Handler } from "../../utils/_RequestWraper.js";

const getCurrentUser = requestError_Handler(async function (req, res, next) {
    return res
        .status(200)
        .json(
            new standardApi_Response(200, "Current User", req.LoggedInUser)
        )
})


export { getCurrentUser }