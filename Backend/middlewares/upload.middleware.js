import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = "others";
    let resource_type = "image";

    if (req.baseUrl.includes("hackathon")) folder = "hackathons";
    if (req.baseUrl.includes("auth")) folder = "users";
    if (req.baseUrl.includes("admin")) folder = "admins";

    // 🔥 PDF ko RAW resource banana
    if (file.mimetype === "application/pdf") {
      resource_type = "raw";
    }

    return {
      folder,
      resource_type,
      allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"],

      // ❗ Image ke liye hi transform
      ...(resource_type === "image" && {
        transformation: [{ width: 800, height: 600, crop: "limit" }]
      })
    };
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

export default upload;