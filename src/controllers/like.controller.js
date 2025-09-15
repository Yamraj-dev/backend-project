import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Like } from "../models/like.model.js";

export const likeTweet = asyncHandler(async (req, res) => {
    const { id: tweetId } = req.params;

    const existingLike = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user._id
    });

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id);
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Unliked the tweet"));
    }

    const like = await Like.create({
        tweet: tweetId,
        likedBy: req.user._id
    });

    res
        .status(200)
        .json(new ApiResponse(200, like, "Liked the tweet"));
});

export const likeComment = asyncHandler(async (req, res) => {
    const { id: commentId } = req.params;

    const existingLike = await Like.findOne({
        comment: commentId,
        likedBy: req.user._id
    });

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id);
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Unliked the comment"));
    }

    const like = await Like.create({
        comment: commentId,
        likedBy: req.user._id
    });

    res
        .status(200)
        .json(new ApiResponse(200, like, "Liked the comment"));
});

export const likeVideo = asyncHandler(async (req, res) => {
    const { id: videoId } = req.params;

    const existingLike = await Like.findOne({
        video: videoId,
        likedBy: req.user._id
    });

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id);
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Unliked the video"));
    }

    const like = await Like.create({
        video: videoId,
        likedBy: req.user._id
    });

    res
        .status(200)
        .json(new ApiResponse(200, like, "Liked the video"));
});

export const likedByUser = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;

    const likes = await Like.find({ likedBy: userId })
        .populate("comment")
        .populate("tweet")
        .populate("video");

    res
        .status(200)
        .json(new ApiResponse(200, likes, "All likes by user fetched"));
});
