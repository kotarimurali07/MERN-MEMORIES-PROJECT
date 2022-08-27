import post from "../models/postSchema.js";
import user from "../models/userSchema.js";
export const createPost = async (req, res) => {
  const post_ = req.body;
  const {userId}=req.params
  console.log(userId);
  const newPostMessage = new post({
    ...post_,
    creator: userId,
    createdAt: new Date().toISOString(),
    isExist: true,
  });
  try {
    await newPostMessage.save();

    return res.status(201).json(newPostMessage);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
export const getPost = async (req, res) => {
  const { id } = req.params;
  const _id = id;
  try {
    const post_ = await post.findOne({ _id });
    if (post_.isExist) {
      return res.status(200).json({ post_ });
    }
    return res.status(404).json({ message: "Post not found" });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
export const updatepost = async (req, res) => {
  const { id } = req.params;
  const { title, message,name, creator, selectedFile, tags } = req.body;
  const _id = id;
  try {
    const post_ = await post.findOne({ _id });
    if (post_) {
      const updatedPost = { creator, title, message, tags,name, selectedFile, _id: id };
      const newUpdatedPost = await post.findByIdAndUpdate(id, updatedPost, {
        new: true,
      });
      return res.status(200).json({ newUpdatedPost });
    }
    return res.status(404).json({ message: "Post not found" });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
export const deletepost=async(req,res)=>{
  const { id } = req.params;
  const _id = id;
  try {
    const post_ = await post.findOne({ _id });
   if(post_){
    const deletedPost = {  _id: id,isExist:false };
    const newdeletedPost = await post.findByIdAndUpdate(id, deletedPost,{new:true});
    return res.status(200).json({ newdeletedPost });

   }

       return res.status(404).json({ message: "Post not found" });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
}
export const getAllPosts= async (req, res) => { 
  
  try{
    let posts = await post.find({isExist:true})
    return res.status(200).json({ posts: posts})

  }catch (error){
    return res.status(404).json({ message: "Post not found" });
  }
}
export const getPostByname = async (req, res) => {
  const { name } = req.query;
  try {
    const post_ = await post.findOne({ name});
    if (post_.isExist) {
      return res.status(200).json({ post_ });
    }
    return res.status(404).json({ message: "Post not found" });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};