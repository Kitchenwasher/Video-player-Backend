import mongoose, { schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userModel = new schema(
    {
        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
        username: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, //cloudinary url
            required: true,
        },
        coverImage: {
            type: String,
        },
        password: {
            type: String,
            trim: true,
            required: true,
            minlength: [6, "password must have Minimum of 6 characters"],
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true },
);

userModel.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userModel.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userModel.methods.accessTokenGenerator = async function () {
    return await jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        },
    );
};
userModel.methods.refreshTokenGenerator = async function () {
    return await jwt.sign(
        { _id: this._id }, 
        process.env.REFRESH_TOKEN_SECRET, 
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY,}
    );
};

export const User = mongoose.model("User", userModel);
