import { User } from "../../models/_User.model.js";
import { standardApi_Response } from "../../utils/_ApiResponseClass.js";
import { custom_Error } from "../../utils/_CustomErrorClass.js";
import { requestError_Handler } from "../../utils/_RequestWraper.js";

const UpdatePassword = requestError_Handler(async function (req, res, next) {
    const { oldPassword, newPassword } = req.body
    if (!(oldPassword || newPassword)) throw new custom_Error(401, "Pleas enter old and New passwoed")

    const user = await User.findById(req.LoggedInUser._id)

    const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if (!isOldPasswordCorrect) throw new custom_Error(401, "Please enter correct old password")

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new standardApi_Response(200, "Your password has updated" )
        )

})

export { UpdatePassword }