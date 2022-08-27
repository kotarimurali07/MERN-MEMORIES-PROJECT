import express from 'express'
import { createPost ,getPost,updatepost,deletepost, getAllPosts,getPostByname} from '../controllers/postcontroller.js'
const router=express.Router()
router.post("/createPost/:id",createPost)
router.get("/getPost/:id",getPost)
router.patch("/updatepost/:id",updatepost)
router.delete("/deletepost/:id",deletepost)
router.get("/getAllPosts",getAllPosts)
router.get("/getPostByname/:name",getPostByname)

export default router