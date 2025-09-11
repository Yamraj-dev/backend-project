import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { deleteVideo, getAllVideos, getUserVideos, getVideoById, updateVideo, uploadVideo } from "../controllers/video.controller.js";

const router = Router();

//secured routes
router.post("/upload", upload.fields([
    {
        name: "videoFile",
        maxCount: 1
    },
    {
        name: "thumbnailImg",
        maxCount: 1
    }
]), verifyJwt, uploadVideo);
router.post("/getById/:id", verifyJwt, getVideoById);
router.post("/getUser/:id", verifyJwt, getUserVideos);

router.get("/getAll", verifyJwt, getAllVideos);

router.put("/update/:id", upload.fields([
    {
        name: "videoFile",
        maxCount: 1
    },
    {
        name: "thumbnailImg",
        maxCount: 1
    }
]), verifyJwt, updateVideo);

router.delete("/delete/:id", verifyJwt, deleteVideo);


export default router;