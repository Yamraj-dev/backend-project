import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        required: true,
        type: String,
        trim: true,
        index: true,
    },
    avatar: {
        required: true,
        type: String,  //cloudinary url
    },
    coverImage: {
        type: String,  //cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    password: {
        required: [true, "Password is required"],
        type: String,
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function  (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.genrateAccessToken = function  () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.genrateRefreshToken = function  () {
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const User = mongoose.model("User", userSchema);