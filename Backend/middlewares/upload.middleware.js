import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req) => {
    let folder = "others";

    if (req.baseUrl.includes("hackathon")) folder = "hackathons";
    if (req.baseUrl.includes("auth")) folder = "users";
    if (req.baseUrl.includes("admin")) folder = "admins";

    return {
      folder,
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      transformation: [{ width: 800, height: 600, crop: "limit" }],
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
