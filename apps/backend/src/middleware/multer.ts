import multer from 'multer'
import type { Request } from "express";


export const upload = multer({ 
  storage: multer.memoryStorage() ,
  limits:{
    fileSize:10*1024*1024,
  },
  fileFilter:(_req,file,cb)=>{
    if(file.mimetype === 'application/pdf' || file.mimetype === 'text/plain'){
      cb(null,true)
    }else{
      cb(new Error("Only pdf and text files are allowed"))
    }
  }
})