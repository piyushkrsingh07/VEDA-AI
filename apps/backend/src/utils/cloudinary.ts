import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import { customErrorResponse } from './responseObject.js';
import { response } from 'express';
import ClientError from '../errors/clientError.js';
import { StatusCodes } from 'http-status-codes';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;


if (!cloudName || !apiKey || !apiSecret) {
  throw new Error("Missing Cloudinary Configuration");
}

cloudinary.config({ 
  cloud_name: cloudName, 
  api_key: apiKey, 
  api_secret: apiSecret
});

export const uploadToCloudinary=async(localFilePath:string[])=>{
    try{
 if(!localFilePath){
                      throw new ClientError ({
        explanation:'Invalid data sent from the client',
        message:'No registered user found for this email',
        statusCode:StatusCodes.NOT_FOUND
       })

   
    }



    const uploadedUrl=await Promise.all(localFilePath.map(async(path)=>{

      const response=await cloudinary.uploader.upload(path,{
        resource_type:"auto"
      })

      await  fs.unlinkSync(path)

      return response.url
    }))

    return uploadedUrl


 
    }catch(error){
     
      await Promise.all(localFilePath.map(async(path)=>{
        fs.unlinkSync(path)
      }))
      throw error
    }

    
   

   

}