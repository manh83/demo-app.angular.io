import express from "express";
import multer from "multer";
import { deleteImage, updateImage, uploadImage } from "../controllers/upload";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";
const router = express.Router();


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "test",
    } 
});

const upload = multer(
    { 
        storage: storage,
        limits: { fileSize: 1024 * 1024 * 5 }
    }
);


router.post("/images/upload", upload.array("image", 10), uploadImage);
router.delete("/images/:publicId", deleteImage);
router.put("/images/:publicId", upload.array("image", 10), updateImage);

export default router;