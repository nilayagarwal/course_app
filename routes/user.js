const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { userModel , purchaseModel , courseModel } = require("../db")
const userRouter = Router();
const {JWT_USER_PASSWORD} = require("../config")

userRouter.post("/signup",async function(req,res){
    const { email,password, firstname, lastname} =req.body;

    await userModel.create({
        email: email,
        password:password,
        firstname: firstname,
        lastname: lastname
    })
    res.json({
        message: "signup successfull"
    })
})

userRouter.post("/signin", async function(req,res){
    const {email,password} = req.body;

    const user  = await userModel.findOne({
        email: email,
        password: password
    });
    if(user){
        const token = jwt.sign({
            id: user._id
        },JWT_USER_PASSWORD);
        res.json({
            token: token
        })
    }else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
    
})

const { userMiddleware } = require("../middleware/user");

userRouter.get("/purchases", userMiddleware, async function(req,res){
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter: userRouter
}