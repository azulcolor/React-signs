import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  myFile: String,
});

const Post = mongoose.model("Post", postSchema);


export default Post;