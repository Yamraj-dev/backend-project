import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Tweet } from "../models/tweet.model.js";

export const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const owner = req.user._id;

    if (!content) throw new ApiError(400, "Content is required");

    const tweet = await Tweet.create({
        content,
        owner
    });

    res.status(201).json(new ApiResponse(201, tweet, "Tweet created successfuly"));
});

export const getUserTweets = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const { id: userId } = req.params;

    const userTweets = await Tweet.find({ owner: userId }).populate("owner", "username avatar").skip((page - 1) * limit).limit(Number(limit)).sort({ createdAt: -1 });

    if (!userTweets.length) throw new ApiError(404, "Tweet not found");

    res.status(200).json(new ApiResponse(200, userTweets, "Tweets fetched successfully"))
});

export const updateTweet = asyncHandler(async (req, res) => {
    const { id: tweetId } = req.params;
    const { content } = req.body;

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) throw new ApiError(404, "tweet not found");

    if (tweet.owner.toString() !== req.user._id.toString()) throw new ApiError(400, "Your not the owner of this tweet")

    if (!content) throw new ApiError(400, "content required");

    tweet.content = content;

    await tweet.save();

    res.status(200).json(new ApiResponse(200, tweet, "Tweet updated successfully"))
});

export const deleteTweet = asyncHandler(async (req, res) => {
    const { id: tweetId } = req.params;

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) throw new ApiError(404, "tweet not found");

    if (tweet.owner.toString() !== req.user._id.toString()) throw new ApiError(400, "Your not the owner of this tweet")
    
    await tweet.deleteOne();

    res.status(204).json(new ApiResponse(204, null, "Tweet deleted successfully"))
});

export const getTweetById = asyncHandler(async (req, res) => {
    const { id: tweetId } = req.params;

    const tweet = await Tweet.findById(tweetId).populate("owner", "username avatar").lean();

    if (!tweet) throw new ApiError(404, "Tweet not found");

    res.status(200).json(new ApiResponse(200, tweet, "Tweet fetched successfully"));
});