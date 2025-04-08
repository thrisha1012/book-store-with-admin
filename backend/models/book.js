const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        imageUrl: {  // Only keeping the image URL
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["available", "sold", "unavailable"],
            default: "available",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
