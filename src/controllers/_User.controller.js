import { requestError_Handler } from "../utils/_RequestWraper.js"


const registerUser = requestError_Handler(async (req, res, next) => {
    res.status(200).json({
        message: "Abubakar"
    })
})



export { registerUser }
