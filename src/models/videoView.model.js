import mongoose, { Schema } from "mongoose";

const videoViewsSchema = new Schema(
    {
        videoId: {
            type: Schema.Types.ObjectId,
            ref: "Video",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true } 
);

videoViewsSchema.index({ videoId: 1, userId: 1 });

export const VideoViews = mongoose.model("VideoViews", videoViewsSchema);
