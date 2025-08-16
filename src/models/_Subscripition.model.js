import mongoose, { Schema } from "mongoose";

const subscripitionAchema = new Schema({
    Subscriber: {
        // The user who subscribe the channel
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    channel: {
        // The user who's channel beinge subscribed
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true })


export const Subscripition = mongoose.model("Subscripition", subscripitionAchema)
