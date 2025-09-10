import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";

export const subscribeToChannel = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    const user = await User.findById(channelId);

    if (!user) throw new ApiError(404, "User not found");
    
    if (req.user._id.toString() === channelId) throw new ApiError(400, "You cannot Subscribe to your self");

    const existingSub = await Subscription.findOne({
        subscriber: req.user._id,
        channel: user._id,
    });

    if (existingSub) throw new ApiError(400, "Yor already subscribed to this channel");

    const subscription = await Subscription.create({
        subscriber: req.user._id,
        channel: user._id
    });

    res.status(200).json(new ApiResponse(200, subscription, `You subscribe to ${user.username}`));
    
});

