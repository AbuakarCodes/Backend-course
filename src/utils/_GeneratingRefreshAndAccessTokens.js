import { User } from "../models/_User.model.js"
import { custom_Error } from "./_CustomErrorClass.js"

let  AccessToken
const genratingRefreshAndAccessTokens = async (UserId) => {
    try {
        const userDB = await User.findById(UserId)
        AccessToken = await userDB.generateAccessToken()
        const RefreshToken = await userDB.generateRefreshToken()
        userDB.refreshToken = RefreshToken
        await userDB.save({ validateDeforeSave: false })
        return { AccessToken, RefreshToken }

    } catch (error) {
        throw new custom_Error(400, "Something went wrong while genarating Access or Refresh Token", error)
    }

}
export { genratingRefreshAndAccessTokens, AccessToken }  