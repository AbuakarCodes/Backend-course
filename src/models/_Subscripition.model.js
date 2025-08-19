import mongoose, { Schema } from "mongoose";

const subscripitionAchema = new Schema({
    subscriber: {
        // The user who subscribe the channel
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    subscribeTo: {
        // The user who's channel beinge subscribed
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true })


export const Subscripition = mongoose.model("Subscripition", subscripitionAchema)
