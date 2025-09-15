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
router.post("/comments/:id/like", likeComment);

// tweet like/unlike
router.post("/tweets/:id/like", likeTweet);

// video like/unlike
router.post("/videos/:id/like", likeVideo);

// get all likes of a user
router.get("/users/:id/likes", likedByUser);

export default router;
