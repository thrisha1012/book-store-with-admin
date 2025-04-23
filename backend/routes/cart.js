const router=require("express").Router();
const User=require("../models/user");
const {authenticateToken}=require("./userAuth");
const mongoose = require("mongoose");
const Book = require("../models/book")

//add to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
      const { bookid } = req.body;
      const userId = req.user.id;
  
      console.log("bookid:", bookid);
  
      if (!bookid) {
        return res.status(400).json({ message: "bookid is missing!" });
      }
  
      const bookExists = await Book.findById(bookid);
      if (!bookExists) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      const userData = await User.findById(userId);
      const alreadyInCart = userData.cart.includes(bookid);
  
      if (alreadyInCart) {
        return res.json({ status: "Success", message: "Book already in cart" });
      }
  
      await User.findByIdAndUpdate(userId, {
        $push: { cart: new mongoose.Types.ObjectId(bookid) },
      });
  
      const updatedUser = await User.findById(userId);
      console.log("Updated cart array:", updatedUser.cart);
  
      return res.json({ status: "Success", message: "Book added to cart" });
    } catch (error) {
      console.error("Error in /add-to-cart:", error);
      return res.status(500).json({ message: "An error occurred" });
    }
  });
  
  

//remove from cart
router.put("/remove-from-cart/:bookid",authenticateToken,async(req,res)=>{
    try{
        const{bookid}=req.params;
        const userId=req.user.id;
        await User.findByIdAndUpdate(userId,{
            $pull:{cart:bookid},
        });
        return res.json({
            status:"Success",
            message:"Book removed from cart",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occured"});
    }
});

//get user cart
router.get("/get-user-cart",authenticateToken,async(req,res)=>{
    try{
        const userId=req.user.id;
        const userData=await User.findById(userId).populate("cart");
        const cart=userData.cart.reverse();
        return res.json({
            status:"Success",
            data:cart,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"An error occured"
        });
    }
});
module.exports=router;