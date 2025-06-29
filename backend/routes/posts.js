import express from "express";
import { CategoryModel } from "../CategoryModel.js";
import { PostModel } from "../PostModel.js";
export const router=express.Router();

//All Posts
router.get('/',async (req,res)=>{
    try{
        const allPosts=await PostModel.find();
        res.status(200).json({
            message:"Data Fetched Successfully",
            post:allPosts
            
        })
    }
    catch(error){
        res.status(400).json({
            message:error.message,
            post:allPosts
        });
    }
   
})

//SinglePost
router.get('/:id',async(req,res)=>{
    try{
        const SinglePostId=req.params.id;
        const SinglePost = await PostModel.findById(SinglePostId);
        if(!SinglePost)
        {
            return res.status(400).json({message:"Post Not Found"})
        }
        res.status(200).json({
            message:"Single Post Fetched",
            post:SinglePost
        }) 
    }
    catch(error)
    {
        res.status(400).send({
            message:error.message
        });
    }
})

//CreatePost
router.post('/',async(req,res)=>{
    
    const{title,content,category,author,image}=req.body;
    const newPost=new PostModel({
        title,
        content,
        category,
        author,
        image
    })
    try{
        await newPost.save();
        res.status(200).json({
            message:"Post Created",
            post:newPost
        })
    }   
    catch(error)
    {
        res.status(400).send({
            message:error.message
        });
    }
})

//Update Post
router.put('/:id',async(req,res)=>{
    
    const postId=req.params.id
    if(!postId)
    {
        return res.status(404).json({
            message:"Post Not Found"
        })
    }
    
    try{
        const particularPost=await PostModel.findById(postId);
        particularPost.title=req.body.title || particularPost.title;
        particularPost.content=req.body.content || particularPost.content;
        particularPost.category=req.body.category || particularPost.category;
        particularPost.author=req.body.author || particularPost.author;
        particularPost.image=req.body.image || req.body.image;
        particularPost.updatedAt=Date.now();
        
        await particularPost.save();

        res.status(200).json({
            message:"Post Updated Successully",
            post:particularPost
        })
    }   
    catch(error)
    {
        res.status(400).send({
            message:error.message
        });
    }
})


//Delete Post
router.delete('/:id',async(req,res)=>{
    
    const postId=req.params.id
    if(!postId)
    {
        return res.status(404).json({
            message:"Post Not Found"
        })
    }
    try{
        await PostModel.findByIdAndDelete(postId)
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

/// Fetch posts by Category Id
router.get('/category/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.categoryId; 

       
        const categoryExists = await CategoryModel.findById(categoryId);
        if (!categoryExists) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

     
        const posts = await PostModel.find({ category: categoryId });

        return res.status(200).json({
            message: "Posts fetched successfully",
            posts: posts
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
});
