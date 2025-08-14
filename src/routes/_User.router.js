import { Router } from "express";
import { registerUser } from "../controllers/_RegisterUser.controller.js";
import { upload } from "../middlewares/_MulterConfigue.middileware.js";
import {loginUser} from "../controllers/_LoginUser.controller.js"

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


export { UserRouter }