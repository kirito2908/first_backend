import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_NAME, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (locanFilePath) => {
    try {
        if (!locanFilePath) return null

        const response = await cloudinary.uploader.upload(locanFilePath,{
            resource_type: "auto"
        })

        console.log("File Has Been Uploaded");
        return response;
    } catch (error) {
        fs.unlinkSync(locanFilePath)
        return null
    }
}

export { uploadOnCloudinary }