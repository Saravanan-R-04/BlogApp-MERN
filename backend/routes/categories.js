import express from "express";
import { CategoryModel } from "../CategoryModel.js";
export const router2=express.Router();

//Get All Category
router2.get('/',async(req,res)=>{
    try{
        const categories=await CategoryModel.find();
        return res.status(200).json({
            message:"All Categories",
            category:categories
        })
    }
    catch(error)
    {
        return res.status(400).json({
            message:error.message
        })
    }
})

//SingleCategory
router2.get('/:id',async(req,res)=>{
    try{
        const SingleCategoryId=req.params.id;
        const SingleCategory = await CategoryModel.findById(SingleCategoryId);
        if(!SingleCategory)
        {
            return res.status(400).json({message:"Post Not Found"})
        }
        res.status(200).json({
            message:"Single Post Fetched",
            post:SingleCategory
        }) 
    }
    catch(error)
    {
        res.status(400).send({
            message:error.message
        });
    }
})


//CreateCategory
router2.post('/',async(req,res)=>{
    
    const{name,slug,description}=req.body;
    const newCategory=new CategoryModel({
        name,
        slug,
        description
    })
    try{
        await newCategory.save();
        res.status(200).json({
            message:"CategoryCreated",
            category:newCategory
        })
    }   
    catch(error)
    {
        res.status(400).send({
            message:error.message
        });
    }
})

//Update Category
router2.put('/:id',async(req,res)=>{
    
    const categoryId=req.params.id
    if(!categoryId)
    {
        return res.status(404).json({
            message:"Category Not Found"
        })
    }
    
    try{
        const particularCategory=await CategoryModel.findById(categoryId);
        particularCategory.name=req.body.name || particularCategory.name;
        particularCategory.slug=req.body.slug || particularCategory.slug; 
        particularCategory.description=req.body.description || particularCategory.description;
    
        await particularCategory.save();

        res.status(200).json({
            message:"Post Updated Successully",
            category:particularCategory
        })
    }   
    catch(error)
    {
        res.status(400).send({
            message:error.message
        });
    }
})


//Delete Category
router2.delete('/:id',async(req,res)=>{
    
    const categoryId=req.params.id
    if(!categoryId)
    {
        return res.status(404).json({
            message:"Post Not Found"
        })
    }
    try{
        await CategoryModel.findByIdAndDelete(categoryId)
        res.status(200).json({
            message:"Post Deleted Successfully",
        })
    }   
    catch(error)
    {
        res.status(500).send({
            message:error.message
        });
    }
})