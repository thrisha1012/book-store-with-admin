const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");
const mongoose = require("mongoose");

// Add book to favorites
router.put("/add-book-to-fav", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.body;
        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(bookid)) {
            return res.status(400).json({ message: "Invalid book ID" });
        }

        const bookExists = await Book.findById(bookid);
        if (!bookExists) {
            return res.status(404).json({ message: "Book not found" });
        }

        const userData = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { favourites: bookid } },  
            { new: true }
        );

        if (!userData) {
            return res.status(400).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Book added to favourites" });
    } catch (error) {
        console.error("Error adding book to favourites:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete book from favorites
router.delete("/delete-book-from-fav", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.body;
        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(bookid)) {
            return res.status(400).json({ message: "Invalid book ID" });
        }

        const userData = await User.findByIdAndUpdate(
            userId,
            { $pull: { favourites: bookid } },
            { new: true }
        );

        if (!userData) {
            return res.status(400).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Book removed from favourites" });
    } catch (error) {
        console.error("Error removing book from favourites:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get favorite books
router.get("/get-book-from-fav", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = await User.findById(userId).populate("favourites");

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            status: "Success",
            data: userData.favourites,
        });

    } catch (error) {
        console.error("Error fetching favorite books:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
