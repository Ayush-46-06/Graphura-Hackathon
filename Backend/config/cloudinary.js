import { v2 as cloudinary } from "cloudinary";
import { config } from "./env.js";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: config.CLOUDINARY_API_KEY?.trim(),
  api_secret: config.CLOUDINARY_API_SECRET?.trim(),
});
console.log("CLOUD NAME =", config.CLOUDINARY_CLOUD_NAME);
console.log("API KEY =", config.CLOUDINARY_API_KEY);


export default cloudinary;
