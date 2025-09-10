import { Video } from "../models/video.model.js"
import { VideoViews } from "../models/videoView.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import deleteFromCloudinary from "../utils/oldImageDelete.js";

export const uploadVideo = asyncHandler(async (req, res) => {

    const { title, description } = req.body;

    if (!title) {
        throw new ApiError(400, "Title is required !");
    }

    if (!description) {
        throw new ApiError(400, "description is required !");
    }
    const videoFileLocalPath = req.files.videoFile[0]?.path;
    const thumbnailLocalPath = req.files.thumbnailImg[0]?.path;

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
        duration: video.duration,
        owner: req.user._id,
    });

    const videoCreated = await Video.findById(newVideo._id).populate("owner", "username avatar");

    res.status(201).json(new ApiResponse(201, videoCreated, "Video uploaded successfully"))

})  

export const updateVideo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const videoFileLocalPath = req.files?.videoFile[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnailImg[0]?.path;

    const video = await Video.findById(id);

    if (!video) throw new ApiError(404, "Video not found");

    if (video.owner.toString() !== req.user._id.toString()) throw new ApiError(403, "Your are not allowed to update this video");

    if (videoFileLocalPath) {
        await deleteFromCloudinary(video.videoFile, "video");
        const uploadedVideo = await uploadOnCloudinary(videoFileLocalPath);
        video.videoFile = uploadedVideo.url;
    }
    if (thumbnailLocalPath) {
        await deleteFromCloudinary(video.thumbnailImg, "image")
        const updateImg = await uploadOnCloudinary(thumbnailLocalPath);
        video.thumbnailImg = updateImg.url;
    }
    if (title) video.title = title;
    if (description) video.description = description;

    await video.save();

    res.status(200).json(new ApiResponse(200, video, "Video updated successfully"))

})

export const deleteVideo = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) throw new ApiError(404, "Video not found");

    if (video.owner.toString() !== req.user._id.toString()) throw new ApiError(403, "Your are not allowed to delete this video");

    await deleteFromCloudinary(video.thumbnailImg, "image");
    await deleteFromCloudinary(video.videoFile, "video");

    await Video.deleteOne(video._id)

    res.status(200).json(new ApiResponse(200, video, "video has been deleted"));

})

export const getVideoById = asyncHandler(async (req, res) => {
    const { id: videoId } = req.params;
    const userId = req.user._id;

    const video = await Video.findById(videoId).populate("owner", "username avatar");

    if (!video) throw new ApiError(404, "Video not found");

    const view = await VideoViews.create({
        videoId,
        userId,
        viewedAt: new Date()
    })

    video.views = (video.views || 0) + 1;

    await video.save();

    res.status(200).json(new ApiResponse(200, video, "Video fetched successfully"));

})

export const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const videos = await Video
            .find({ isPublished: true })
            .populate("owner", "username avatar")
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });
    
    const Total = await Video.countDocuments({ isPublished: true });

    res.status(200)
        .json(new ApiResponse(
            200,
            {
                videos,
                pagination: {
                    Total,
                    page: Number(page),
                    pages: Math.ceil(Total / limit)
                }
            }
    ));
    
})

export const getUserVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const { id: channelId } = req.params;

    const channelVideos = await Video
        .find({ owner: channelId })
        .populate("owner", "username avatar")
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort({ createdAt: -1 });
    
    if (!channelVideos.length) throw new ApiError(404, "No videos found for this channel");

    const Total = await Video.countDocuments({ owner: channelId });

    res.status(200)
        .json(new ApiResponse(
            200,
            {
                channelVideos,
                pagination: {
                    Total,
                    page: Number(page),
                    pages: Math.ceil(Total / limit)
                }
            }
    ));
})

