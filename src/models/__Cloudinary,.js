import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRATE
});

async function cloudinaryFileUplod(localPath) {
    try {
        if (!localPath) return null
        const cloudaniryResponse = await cloudinary.uploader.upload(localPath, { resource_type: 'auto' })
        console.log("File ahs Sucessfully Uploded on cloudinary");
        return cloudaniryResponse

    } catch (error) {
        // as fle is not uplode so delete it, we dont need some checky file on our server
        fs.unlink(localPath)
        return null
    }
}


export { cloudinaryFileUplod }