import { Router } from "express";
import { registerUser } from "../controllers/_RegisterUser.controller.js";
import { upload } from "../middlewares/_MulterConfigue.middileware.js";
import { loginUser } from "../controllers/_LoginUser.controller.js"
import { logoutUser } from "../controllers/_LogoutUser.controller.js";
import { AuthUser } from "../middlewares/_Auth.middleware.js";
import { ifAccessTokenExpired } from "../controllers/_IfAccessTokenExpired.controller.js";
import { UpdatePassword } from "../controllers/usersControllers/_UpdatePassword.controller.js";
import { getCurrentUser } from "../controllers/usersControllers/_GetCurrentUser.controller.js";
import { UpdateAvatar } from "../controllers/usersControllers/_UpdateAvatar.controller.js";
import { UpdateCoverImage } from "../controllers/usersControllers/_UpdateCoverImage.controller.js";

const UserRouter = Router()
UserRouter.post("/register", upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]), registerUser)

UserRouter.post("/login", loginUser)
UserRouter.post("/logout", AuthUser, logoutUser)
UserRouter.post("/getNewAccessToken", ifAccessTokenExpired)
UserRouter.post("/updatePassword", AuthUser, UpdatePassword)
UserRouter.post("/updateAvatar", AuthUser, upload.single("avatar"), UpdateAvatar)
UserRouter.post("/updateCoverImage", AuthUser, upload.single("avatar"), UpdateCoverImage)
UserRouter.get("/currentUser", AuthUser, getCurrentUser)


export { UserRouter }