import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet,
    getTweetById
} from "../controllers/tweet.controller.js";

const router = Router();

router.use(verifyJwt);

// create tweet
router.post("/", createTweet);

// get all tweets of a user
router.get("/users/:id", getUserTweets);

// get tweet by id
router.get("/:id", getTweetById);

// update tweet
router.put("/:id", updateTweet);

// delete tweet
router.delete("/:id", deleteTweet);

export default router;
