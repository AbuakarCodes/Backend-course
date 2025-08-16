import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken"
import { requestError_Handler } from "../utils/_RequestWraper.js"
import { custom_Error } from "../utils/_CustomErrorClass.js"
import { User } from "../models/_User.model.js"

const AuthUser = requestError_Handler(async (req, res, next) => {
    try {
        const token = req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) throw new custom_Error(401, "Unauthorized request");

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE);
        if (!decodedToken) throw new custom_Error(401, "Invalid access token");

        const LoggedInUser = await User.findById(decodedToken._id);
        if (!LoggedInUser) throw new custom_Error(404, "User not found");

        req.LoggedInUser = LoggedInUser;
        next();
    } catch (error) {
        console.log("Error in Auth middleware:", error);
        next(error);
    }
});

export { AuthUser } 
