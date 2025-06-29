import express from "express";
import { connectDB } from "./db.js";
import { router } from "./routes/posts.js";
import { router2 } from "./routes/categories.js";
import bodyParser from "body-parser";
import cors from 'cors'
const PORT=5500;
const app=express();

app.use(bodyParser.json())
app.use(cors())
app.use('/api/posts',router)
app.use('/api/categories',router2)
await connectDB();


app.listen(PORT,()=>{
    console.log("Server Running On PORT:5500")
})


