const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "https://course-app-gilt.vercel.app"],
    credentials: true
}));
app.use(express.json());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter)

async function main(){
    await mongoose.connect(process.env.MONGO_URL)
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

main()