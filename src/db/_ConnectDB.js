import mongoose from "mongoose";
import { dB_name } from "../_Constants.js";

async function connect_DB() {
    try {
        const dBConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${dB_name}`)
        console.log("MongoDB connected !!", dBConnectionInstance.connection.host)
    } catch (error) {
        console.log("MongDB failed to connect !!", error)
        process.exit(1)
    }
}

export {connect_DB}