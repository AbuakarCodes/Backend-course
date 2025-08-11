import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
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


UserSchema.pre("save", async function (next) {
    if (!this.isModified("passWord")) return next()
    this.passWord = await bcrypt(this.passWord, 10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function (passWord) {
    return await bcrypt.compare(this.passWord, passWord)
}

UserSchema.methods.genrateAccessTokens = function () {
    return JWT.sign({
        _id: this._id,
        email:this.email,
        userName:this.userName,
        fullname: this.fullname
    },
        process.env.ACCESS_TOKEN_SECRETE,
        {
            expiresIn: ACCESS_TOKEN_EXPAIRY
        }
    )
}

UserSchema.methods.genrateRefreshTokens = function () {
    return JWT.sign({
        _id: this._id
    },
        process.env.REFRESH_TOKEN_SECRETE,
        {
            expiresIn: REFRESH_TOKEN_EXPAIR
        }
    )
}

export const User = mongoose.model("user", UserSchema);
