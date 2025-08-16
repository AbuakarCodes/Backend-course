import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();

import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRATE
});

async function cloudinary_FileUplod(localPath) {
    try {
        if (!localPath) return null
        const cloudinaryResponse = await cloudinary.uploader.upload(localPath, { resource_type: 'auto' })
        console.log("File has Sucessfully Uploded on cloudinary");
        // as fle is  uploded so delete it, we dont need some checky file on our server
        fs.unlinkSync(localPath)
        return cloudinaryResponse

    } catch (error) {
        console.log("file deleting error", error)
        return null
    }
}


export { cloudinary_FileUplod }