require('dotenv').config(); // Load the .env file

const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
require("./conn/conn");  // Connecting to MongoDB

const PORT = process.env.PORT || 3000;  // Use the port from the .env file or default to 3000

// routes
const userRoutes = require("./routes/user"); 
const Books=require("./routes/book");
const Favourite=require("./routes/favourite");
const Cart=require("./routes/cart");
const Order=require("./routes/order");

app.use("/api/v1",userRoutes);  // Register routes
app.use("/api/v1",Books); //book routes
app.use("/api/v1",Favourite); //fav routes
app.use("/api/v1",Cart); //cart
app.use("/api/v1",Order); //order

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
