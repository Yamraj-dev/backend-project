import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
    likeComment,
    likeTweet,
    likeVideo,
    likedByUser
} from "../controllers/like.controller.js";

const router = Router();

router.use(verifyJwt); 

// comment like/unlike
router.post("/comment/:id/like", likeComment);

// tweet like/unlike
router.post("/tweet/:id/like", likeTweet);

// video like/unlike
router.post("/video/:id/like", likeVideo);

// get all likes of a user
router.get("/user/:id/likes", likedByUser);

export default router;
