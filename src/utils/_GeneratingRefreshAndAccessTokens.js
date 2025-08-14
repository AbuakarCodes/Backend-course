import { User } from "../models/_User.model.js"
import { custom_Error } from "./_CustomErrorClass.js"
const genratingRefreshAndAccessTokens = async (UserId) => {
    try {
        const userDB = await User.findById(UserId)
        const AccessToken = await userDB.generateRefreshToken()
        const RefreshToken = await userDB.generateAccessToken()
        userDB.refreshToken = RefreshToken
        await userDB.save({ validateDeforeSave: false })
        return { AccessToken, RefreshToken }

    } catch (error) {
        throw new custom_Error(400, "Something went wrong while genarating Access or Refresh Token", error)
    }

}
export { genratingRefreshAndAccessTokens }