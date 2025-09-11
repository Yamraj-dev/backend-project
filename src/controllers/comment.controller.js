import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";

export const addComment = asyncHandler(async (req, res) => { 
    const { id: videoId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const video = await Video.findById(videoId);

    if (!video) throw new ApiError(404, "Video not found");
    if (!content) throw new ApiError(400, "Content is required");

    const comment = await Comment.create({
        content: content,
        video: videoId,
        owner: userId
    });

    res.status(200).json(new ApiResponse(200, comment, "Comment added successfully"));

});

export const updateComment = asyncHandler(async (req, res) => { 
    const { id: commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(commentId).populate("owner", "username avatar");

    if (!content) throw new ApiError(400, "Content required");
    if (comment.owner._id.toString() !== req.user._id.toString()) throw new ApiError(400, "Your no the comment owner");

    comment.content = content;

    await comment.save();

    res.status(201).json(new ApiResponse(201, comment, "Comment updated successfully"));

});

export const deleteComment = asyncHandler(async (req, res) => { 
    const { id: commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (comment.owner.toString() !== req.user._id.toString()) throw new ApiError(400, "Your no the comment owner");

    await comment.deleteOne();

    res.status(200).json(new ApiResponse(200, null, "Comment deleted successfully"));
});

export const getVideoComments = asyncHandler(async (req, res) => { 
    const { page = 1, limit = 10 } = req.query;
    const { id: videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) throw new ApiError(404, "Video not found");

    const comments = await Comment.find({ video: videoId }).populate("owner", "username avatar").limit(Number(limit)).skip((page - 1) * limit).sort({ createdAt: -1 });
    const total = await Comment.countDocuments({ video: videoId });

    if (!comments.length) throw new ApiError(404, "comments not found");

    res.status(200).json(new ApiResponse(200, {
        comments,
        pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
        }
    },
        "Comments feteched successfully"));
});