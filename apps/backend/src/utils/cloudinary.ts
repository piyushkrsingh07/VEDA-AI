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

export const uploadToCloudinary=async(localFilePath:string)=>{
    try{
 if(!localFilePath){
                      throw new ClientError ({
        explanation:'Invalid data sent from the client',
        message:'No registered user found for this email',
        statusCode:StatusCodes.NOT_FOUND
       })

   
    }

     const response =await   cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto"
      })

         console.log("file is uploaded on cloudinary",response?.url)
         return response?.url
    }catch(error){
      fs.unlinkSync(localFilePath)
      throw error
    }

    
   

   

}