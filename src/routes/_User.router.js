import { Router } from "express";
import { registerUser } from "../controllers/_User.controller.js";
import { upload } from "../middlewares/_MulterConfigue.middileware.js";

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



export { UserRouter }