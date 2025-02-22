const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book=require("../models/book");
const { authenticateToken } = require("./userAuth");

//add book --admin
router.post("/add-book", authenticateToken,async(req,res)=>{
    try{
        const userId=req.user.id;
        const user=await User.findById(userId);
        if(!user || user.role!=="admin"){
            return res.status(400).json({message:"You are not having access to perform admin work"});
        }
        const book=new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({message:"book added successfully"});
    }
    catch(error){
        res.status(500).json({messages:"Internal server error"});
    }
});


// Update book
router.put("/update-book",authenticateToken,async(req, res) => {
    try {
        const userId=req.user.id;
        const user=await User.findById(userId);

        if(!user || user.role!=="admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const{bookid,url,title,author,price,desc,language}=req.body;

        if(!bookid){
            return res.status(400).json({ message: "Book ID is required" });
        }

        const book = await Book.findById(bookid);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        await Book.findByIdAndUpdate(bookid, { url, title, author, price, desc, language });

        return res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


//delete book
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const { bookid } = req.body;  // Get bookid from request body

        if (!bookid) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const book = await Book.findById(bookid);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        await Book.findByIdAndDelete(bookid);

        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

//get all books
router.get("/get-all-books",async(req,res)=>{
    try{
        const books=await Book.find().sort({createdAt:-1});
        return res.json({
            status:"success",data:books,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"an error occurred"});
    }
});

//get recent books
router.get("/get-recent-books",async(req,res)=>{
    try{
        const books=await Book.find().sort({createdAt:-1}).limit(4);
        return res.json({
            status:"success",data:books,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"an error occurred"});
    }
});

//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;  
        const book = await Book.findById(id);  
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.json({
            status: "success",
            data: book,  
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});



module.exports=router;