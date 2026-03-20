import dotenv from "dotenv"

import express from 'express'
import type { Request, Response } from "express";
import cookieparser from 'cookie-parser'
import cors from "cors"
dotenv.config();

const app = express() 

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieparser())

app.get('/ping',(req:Request,res:Response):Response=>{
    return res.send("Server is Live!")
})

const port:number = Number(process.env.PORT) || 5000

app.listen(port,()=>{
    console.log(`server is running at http://localhost:4000`)

})


