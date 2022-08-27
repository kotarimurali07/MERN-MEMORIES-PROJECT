import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import DDConnection from "./utils/config.js";
import auth from "./routes/AuthenticationRoutes.js"
import dotenv from "dotenv"
import post from "./routes/PostsRoutes.js"
const app=express()
dotenv.config()
DDConnection()
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth",auth)

app.use("/post",post)

const PORT=process.env.PORT  || 5000
app.listen(PORT,()=>{
    console.log('APP IS RUNNING ON THE PORT HTTPS://LOCALHOSE/5000')
})