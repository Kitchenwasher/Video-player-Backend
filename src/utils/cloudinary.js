import { v2 as cloudinary } from "cloudinary";
import { error } from "console";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            console.error("filePath is not correct");
            return null;
        }
        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
        });
        console.log("file uploaded successfully on cloudinary", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(filePath); //remove the file from local server to prevent storage pileup
        return null;
    }
};
