const mongoose = require("mongoose");

const URI = process.env.URI;

const conn = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to db");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};

conn();
