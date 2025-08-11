import { Router } from "express";
import { registerUser } from "../controllers/_User.controller.js";

const UserRouter = Router()
UserRouter.post("/register",registerUser)



export { UserRouter }