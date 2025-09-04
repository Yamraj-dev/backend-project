import { Video } from "../models/video.model.js"
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const uploadVideo = asyncHandler(async (req, res) => {

    const { title, description } = req.body;

    if (!title) {
        throw new ApiError(400, "Title is required !");
    }

    if (!description) {
        throw new ApiError(400, "description is required !");
    }
    const videoFileLocalPath = req.files.videoFile[0]?.path;
    const thumbnailLocalPath = req.files.thumbnail[0]?.path;

    if (!videoFileLocalPath) {
        throw new ApiError(400, "Video file is required !");
    }

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail img file is required !");
    }
    
    const video = await uploadOnCloudinary(videoFileLocalPath);
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    const newVideo = await Video.create({
        videoFile: video.url,
        thumbnailImg: thumbnail.url,
        title,
        description,
        owner: req.user._id,
    });

    const videoCreated = await Video.findById(newVideo._id).populate("owner", "username avatar");

    res.status(201).json(new ApiResponse(201, videoCreated, "Video uploaded successfully"))

})  