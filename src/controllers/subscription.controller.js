import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";

export const toggleSubscription = asyncHandler(async (req, res) => {
    const { id: channelId } = req.params;

    const channel = await User.findById(channelId);

    if (!channel) throw new ApiError(404, "channel not found");
    
    if (req.user._id.toString() === channelId) throw new ApiError(400, "You cannot Subscribe to your self");

    const existingSub = await Subscription.findOne({
        subscriber: req.user._id,
        channel: channel._id,
    });

    if (existingSub) {
        await Subscription.deleteOne({
            subscriber: req.user._id,
            channel: channel._id,
        });

        res.status(200).json(new ApiResponse(200, `You unsubscribed from ${channel.username}`));
    } else {
        const subscription = await Subscription.create({
            subscriber: req.user._id,
            channel: channel._id
        });

        res.status(200).json(new ApiResponse(200, subscription, `You subscribed to ${channel.username}`));
    }
    
});

export const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { id: channelId } = req.params;

    const subscribers = await Subscription.find({ channel: channelId })
        .populate("subscriber", "username avatar");

    res.status(200)
        .json(
        new ApiResponse(
            200,
            subscribers.map(sub => sub.subscriber),
            "Fetched subscribers of this channel"
        )
    );

});

export const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { id: subscriberId } = req.params;

    const channels = await Subscription.find({ subscriber: subscriberId }).populate("channel", "username avatar");

    res.status(200).json(new ApiResponse(200,
        channels.map(cha => cha.channel),
        "Fetched subscribed channel of this channel"
    ))
})