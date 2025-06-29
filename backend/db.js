import mongoose from "mongoose";

export const connectDB=async ()=>{
    const MONGOD_URI="mongodb://localhost:27017/BlogApp"
    await mongoose.connect(MONGOD_URI).then(()=>{
        console.log("DB CONNECTED")
    })

}