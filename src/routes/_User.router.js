import { Router } from "express";
import { registerUser } from "../controllers/_RegisterUser.controller.js";
import { upload } from "../middlewares/_MulterConfigue.middileware.js";
import { loginUser } from "../controllers/_LoginUser.controller.js"
import { logoutUser } from "../controllers/_LogoutUser.controller.js";
import { AuthUser } from "../middlewares/_Auth.middleware.js";
import { ifAccessTokenExpired } from "../controllers/_IfAccessTokenExpired.controller.js";

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
UserRouter.post("/getNewAccessToken",  ifAccessTokenExpired)


export { UserRouter }