import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config(); // This MUST be before cloudinary.config()


// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const uploadFileOnCloudinary = async (localFilePath) => {
  
  try {
    if (!localFilePath){
      console.log("local path not found ");
      
     return null;

    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    console.log("file uploaded sucessfully ", response.url);
    return response;
  } catch (error) {
    console.log("error on uploading ", error);
    
    fs.unlinkSync(localFilePath);
    return null;
  }
};
export { uploadFileOnCloudinary };
