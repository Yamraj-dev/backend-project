import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js"; 
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
    deleteVideo,
    getAllVideos,
    getUserVideos,
    getVideoById,
    updateVideo,      
    uploadVideo
} from "../controllers/video.controller.js";


const router = Router();

router.use(verifyJwt);

//secure routes

router.post(
    "/videos",
    upload.fields([{ name: "videoFile", maxCount: 1 }, { name: "thumbnailImg", maxCount: 1 }]),
    uploadVideo
);

router.get(
    "/videos",
    getAllVideos
);

router.get(
    "/videos/:id",
    getVideoById
);

router.get(
    "/videos/:Id",
    getUserVideos
);

router.patch(
    "/videos/:id",
    upload.fields([{ name: "videoFile", maxCount: 1 }, { name: "thumbnailImg", maxCount: 1 }]),
    updateVideo
);

router.delete(
    "/videos/:id",
    deleteVideo
);

export default router;
