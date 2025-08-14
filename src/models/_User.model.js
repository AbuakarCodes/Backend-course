import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    avatar: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
    },
    watchHEstory: {
        type: Schema.Types.ObjectId,
        ref: "Vedio"
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true });

// Hash password before save
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password
UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate Access Token
UserSchema.methods.generateAccessToken = function () {
    return JWT.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRETE,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

// Generate Refresh Token
UserSchema.methods.generateRefreshToken = function () {
    return JWT.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const User = mongoose.model("User", UserSchema);
