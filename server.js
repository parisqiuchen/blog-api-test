const express = require("express");
const globalErrHandler = require("./middlewares/globalErrHandler");
const categoryRouter = require("./routes/categories/categoryRoutes");
const commentRouter = require("./routes/comments/commentRoutes");
const postRouter = require("./routes/posts/postRoutes");
const userRouter = require("./routes/users/userRoutes");
const Post = require("./model/Post/Post");


require("dotenv").config();
require("./config/dbConnect");

const app = express();


//middlewares
app.use(express.json()); //pass incoming payload

app.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    res.json(error);
  }
});

//routes
//----
//users route
app.use("/api/v1/users/", userRouter);
//posts route
app.use("/api/v1/posts", postRouter);
//comments route
app.use("/api/v1/comments", commentRouter);
//categories route
app.use("/api/v1/categories", categoryRouter);


//Error handlers middleware
app.use(globalErrHandler);

app.all("/api/v1/users/",(req, res) => {
    console.log(req.originalUrl);
    res.status(404).json({
      message: `${req.originalUrl} - Route Not Found`,
    });
  });
//Listen to server
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is up and running on ${PORT}`));

