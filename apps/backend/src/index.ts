import dotenv from "dotenv"

import express from 'express'
import type { Request, Response } from "express";
import cookieparser from 'cookie-parser'
import {connect} from "@repo/db"
import AssignmentRoutes from './router/assignment.js'
import cors from "cors"
dotenv.config();

const app = express() 


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieparser())

app.get('/ping',(req:Request,res:Response):Response=>{
    return res.send("Server is Live hello pk 2!")
})

app.use('/assignment',AssignmentRoutes)
const port:number = Number(process.env.PORT) || 4000

const startServer = async () => {
  try {
   const connection= await connect();
  //  console.log(connection,'see connection')

    app.listen(port, () => {
        // console.log(connection,'connection')
      console.log(`server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();


