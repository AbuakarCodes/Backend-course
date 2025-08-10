import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

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
    passWord: {
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

export const User = mongoose.model("user", UserSchema);
