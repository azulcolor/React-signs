import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Post from "./models/post.js";

const app = express();
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));
app.use(cors());

app.use("/post", async (req, res, next) => {
  const body = req.body;
  try {
    const newImage = await Post.create(body);
    newImage.save();
    res.status(201).json({message: "new image uploaded", createdPost: newImage});
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
}
);

app.get("/get", async (req, res, next) => {
  try {
    const allImages = await Post.find();
    res.status(200).json(allImages);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

 mongoose.connect('mongodb://localhost/imageUpload', { useUnifiedTopology: true ,  useNewUrlParser: true})
.then(console.log('database connected'))
.catch(err => err)

const PORT = 5000;
app.listen(PORT, () => {
  console.log("listening at port " + PORT);
});