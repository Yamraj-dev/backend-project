import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { deleteVideo, getAllVideos, getUserVideos, getVideoById, updateVideo, uploadVideo } from "../controllers/video.controller.js";

const router = Router();
router.use(verifyJwt);

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
]), uploadVideo);
router.post("/getById/:id", getVideoById);
router.post("/getUser/:id", getUserVideos);

router.get("/getAll", getAllVideos);

router.put("/update/:id", upload.fields([
    {
        name: "videoFile",
        maxCount: 1
    },
    {
        name: "thumbnailImg",
        maxCount: 1
    }
]), updateVideo);

router.delete("/delete/:id", deleteVideo);


export default router;