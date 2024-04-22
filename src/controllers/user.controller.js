import { asyncHandler } from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import apiResponse from "../utils/apiResponse.js";

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

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    console.log(username, email);

    if (existedUser){
        throw new apiError(409, "The User With Similar Username Or Email Already Exists");
    }

    const avatarLocalpath = req.files?.avatar[0]?.path
    const coverImageLocalpath = req.files?.coverImage[0]?.path

    if (!avatarLocalpath){
        throw new apiError(400, "Uploading Avatar Is Required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalpath);
    const coverImage = await uploadOnCloudinary(coverImageLocalpath);

    if(!avatar){
        throw new apiError(400, "Please Upload Your Avatar");
    }

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    const userCreated = await User.findById(user._id)?.select(
        "-password -refreshToken"
    )

    if(!userCreated){
        throw new apiError(500, "Something Went Terribly Wrong Here");
    }

    return res.status(201).json(
        new apiResponse(200, userCreated, "User Created Sucessfully")
    )

} )

export { registerUser }