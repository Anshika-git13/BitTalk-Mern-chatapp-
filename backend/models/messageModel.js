import mongoose from "mongoose";

const messageModel = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    sentiment: {
        type: Number,
        default: 0,   // default sentiment score is neutral (0)
    }
}, { timestamps: true });

export const Message = mongoose.model("Message", messageModel);
