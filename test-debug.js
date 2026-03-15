require('dotenv').config();
const mongoose = require('mongoose');
const { purchaseModel, courseModel, userModel } = require('./db');

async function run() {
  await mongoose.connect('mongodb+srv://admin:nilay2007@cluster0.egeelg.mongodb.net/coursera-app?appName=Cluster0');
  const user = await userModel.findOne({ email: "test2@example.com" });
  if (user) {
      console.log("User id:", user._id);
      const purchases = await purchaseModel.find({ userId: user._id });
      console.log("Purchases with ObjectId:", purchases);
      const purchasesStr = await purchaseModel.find({ userId: user._id.toString() });
      console.log("Purchases with String:", purchasesStr);
  }
  process.exit(0);
}
run();
