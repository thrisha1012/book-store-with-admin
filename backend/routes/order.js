const router=require("express").Router();
const {authenticateToken}=require("./userAuth");
const Book=require("../models/book");
const Order=require("../models/order");
const User=require("../models/user");

//place order
router.post("/place-order",authenticateToken,async(req,res)=>{
    try{
        const userId=req.user.id;
        const {order}=req.body;
        for(const orderData of order){
            const newOrder=new Order({user:userId,book:orderData._id});
            const orderDataFromDb=await newOrder.save();

            //saving order in user model
            await User.findByIdAndUpdate(userId,{
                $push:{orders:orderDataFromDb._id},
            });

            //clearing cart
            await User.findByIdAndUpdate(id,{
                $pull:{cart:orderData._id},
            });
        }
        return res.json({
            status:"Success",
            message:"Order placed successfully",
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({status:"Error",message:"Internal server error"});
    }
});

//get order
router.get("/get-order-history",authenticateToken,async(req,res)=>{
    try{
        const userId=req.user.id;
        const userData=await User.findById(userId).populate({
            path:"orders",
            populate:{path:"book"},
        });

        const ordersData=userData.orders.reverse();
        return res.json({
            status:"Success",
            data:ordersData,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
});

//get all the orders -> admin side
router.get("/get-all-orders",authenticateToken,async(req,res)=>{
    try{
        if (!user || user.role !== "admin") {
            return res.status(403).json({ status: "Error", message: "Access denied" });
        }
        const userData=await Order.find()
        .populate({
            path:"book",
        })
        .populate({
            path:"user",
        })
        .sort({createdAt:-1});
        return res.json({
            status:"Success",
            data:userData,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occured"});
    }
});

//update order -> admin side
router.patch("/update-status/:id",authenticateToken,async(req,res)=>{
    try{
        const userId=req.user.id;
        const {id}=req.params;
        const{status}=req.body;
        const user = await User.findById(userId);
        if (!user || user.role !== "admin") {
            return res.status(403).json({ status: "Error", message: "Access denied" });
        }
        await Order.findByIdAndUpdate(id,{status:req.body.status});
        return res.json({
            status:"Success",
            message:"Status updated successfully",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
});
module.exports=router;