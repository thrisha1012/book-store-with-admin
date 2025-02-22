const router=require("express").Router();
const User=require("../models/user");
const {authenticateToken}=require("./userAuth");

//add to cart
router.put("/add-to-cart",authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.body;
        const userId=req.user.id;
        const userData=await User.findById(userId);
        const isbookcart=userData.cart.includes(bookid);
        if(isbookcart){
            return res.json({
                status:"Success",
                message:"Book is already in cart",
            });
        }
        await User.findByIdAndUpdate(userId,{
            $push:{cart:bookid},
        });
        return res.json({
            status:"Success",
            message:"Book added to cart",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
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
        const userData=await User.findById(userId).popular("cart");
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