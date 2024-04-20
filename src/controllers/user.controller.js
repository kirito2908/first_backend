import { asyncHandler } from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js"

const registerUser = asyncHandler( async (req, res) => {
    const { fullName, username, email, password } = req.body

    if (
        [fullName, username, email, password].some((fields)=>fields?.trim() === "")
    ){
        throw new apiError(401, "This Feild Cannot Be Empty");
    }

    const emailCheck = email.substring((email.length)-4, email.length)

    if (emailCheck !== ".com" || email.at(email.length-10) !== "@"){
        throw new apiError(400, "Your Email Is Invalid");
    }

} )

export { registerUser }