import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:false,

    }
},{
    timestamps:true
})

export const CategoryModel = mongoose.model("Category",categorySchema)