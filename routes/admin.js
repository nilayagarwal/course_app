const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db")
const {JWT_ADMIN_PASSWORD} =    require("../config");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup",async function(req,res){
    const { email,password, firstname, lastname} =req.body;

    await adminModel.create({
        email: email,
        password:password,
        firstname: firstname,
        lastname: lastname
    })
    res.json({
        message: "signup successfull"
    })
})

adminRouter.post("/signin", async function(req,res){
    const {email,password} = req.body;

    const admin  = await adminModel.findOne({
        email: email,
        password: password
    });
    if(admin){
        const token = jwt.sign({
            id: admin._id
        },JWT_ADMIN_PASSWORD);
        res.json({
            token: token
        })
    }else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
})

adminRouter.post("/course",adminMiddleware ,async function(req,res){
    const adminId = req.userId;

    const {title,description,imageUrl,price} = req.body;
    
    const course  = await courseModel.create({
        title:title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })
    res.json({
        message: "Course Created",
        courseId: course._id
    })
})

adminRouter.put("/course",adminMiddleware,async function(req,res){
    const adminId = req.userId;

    const {title,description,imageUrl,price,courseId} = req.body;
    
    const course  = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },{
        title:title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        
    })
    res.json({
        message: "Course Updated",
        courseId: course._id
    })
})

adminRouter.get("/course/bulk",adminMiddleware,async function(req,res){
    const adminId = req.userId;
    const courses  = await courseModel.find({
        creatorId: adminId
    })
    res.json({
        courses
    })
})

adminRouter.delete("/course", adminMiddleware, async function(req, res){
    const adminId = req.userId;
    const { courseId } = req.body;

    const course = await courseModel.findOneAndDelete({
        _id: courseId,
        creatorId: adminId
    });

    if (course) {
        res.json({
            message: "Course Deleted",
            courseId: course._id
        });
    } else {
        res.status(404).json({
            message: "Course not found or you don't have permission to delete it"
        });
    }
})

module.exports = {
    adminRouter: adminRouter
}