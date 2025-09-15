import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Playlist } from "../models/playlist.model.js";

export const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description, videos } = req.body;

    if (!name || !videos) {
        throw new ApiError(400, "Name and videos are required!");
    }

    const playlist = await Playlist.create({
        name,
        description,
        videos,
        owner: req.user._id,
    });

    res.status(201).json(new ApiResponse(201, playlist, "Playlist created successfully"));
});

export const PlaylistById = asyncHandler(async (req, res) => {
    const { id: playlistId } = req.params;

    const playlist = await Playlist.findById(playlistId)
        .populate("owner", "username avatar")
        .populate("videos");

    if (!playlist) throw new ApiError(404, "Playlist not found!");

    res.status(200).json(new ApiResponse(200, playlist, "Playlist fetched successfully"));
});

export const editPlaylist = asyncHandler(async (req, res) => {
    const { id: playlistId } = req.params;
    const { name, description, videos } = req.body;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) throw new ApiError(404, "Playlist not found!");

    if (playlist.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not allowed to edit this playlist");
    }

    if (name) playlist.name = name;
    if (description) playlist.description = description;
    if (videos) playlist.videos = videos;

    await playlist.save();

    res.status(200).json(new ApiResponse(200, playlist, "Playlist updated successfully"));
});

export const deletePlaylist = asyncHandler(async (req, res) => {
    const { id: playlistId } = req.params;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) throw new ApiError(404, "Playlist not found!");

    if (playlist.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not allowed to delete this playlist");
    }

    await Playlist.findByIdAndDelete(playlistId);

    res.status(200).json(new ApiResponse(200, null, "Playlist deleted successfully"));
});
