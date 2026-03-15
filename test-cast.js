require('dotenv').config();
const mongoose = require('mongoose');
const { userModel, purchaseModel } = require('./db');

async function debug() {
  await mongoose.connect('mongodb+srv://admin:nilay2007@cluster0.egeelg.mongodb.net/coursera-app?appName=Cluster0');
  
  const user = await userModel.findOne({ email: "test2@example.com" });
  console.log("User ObjectId:", user._id, typeof user._id);
  console.log("User String ID:", user._id.toString());
  
  // Test 1: Using ObjectId
  const p1 = await purchaseModel.find({ userId: user._id });
  console.log("Find with ObjectId length:", p1.length);
  
  // Test 2: Using String
  const p2 = await purchaseModel.find({ userId: user._id.toString() });
  console.log("Find with String length:", p2.length);

  
  // Test 3: See what is actually in DB for this user
  const allPurchases = await purchaseModel.find();
  const userPurchases = allPurchases.filter(p => p.userId.toString() === user._id.toString());
  console.log("Actual purchases in DB for this user string ID:", userPurchases.length);
  
  process.exit(0);
}
debug();
