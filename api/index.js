import express from "express";
import mongoose from "mongoose";
import  dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import cookieParser from 'cookie-parser';
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import cropRoutes from "./routes/crop.route.js"
import axios from "axios"
dotenv.config();



mongoose.connect(process.env.MONGO).then(()=>{
    console.log("MongoDB connection succesful");
})
.catch((err)=>{
    console.log(err);
})


const app=express()

app.use(express.json())
app.use(cookieParser())



app.listen(3000,()=>{
    console.log("Server is running on port 3000?");
})


const News = {
    defaultProps: {
      country: 'in', 
      pageSize: 12,   
      query: 'agriculture OR farming OR crops AND india',
    },
  };
  
  // News API handler
  app.get('/api/newsfetched/all-news', async (req, res) => {
    try {
      const { page = 1, pageSize = News.defaultProps.pageSize, country = News.defaultProps.country, query = News.defaultProps.query } = req.query;
  
      const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}&page=${page}&pageSize=${pageSize}`;
  
      const response = await axios.get(url);
      const articles = response.data.articles;
      const totalResults = response.data.totalResults;
  
      res.status(200).json({
        success: true,
        data: {
          articles,
          totalResults,
        },
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).json({
        success: false,
        message: error.response?.data.message || 'Failed to fetch news',
      });
    }
  });


app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use("/api/post",postRoutes)
app.use('/api/comment',commentRoutes)
app.use('/api/crop',cropRoutes)

//middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });