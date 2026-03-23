import type { Request,Response } from "express"
import { validate } from "../validators/zodValidator.js"
import { AssignmentSchema } from "../validators/assignmentSchema.js"
import { StatusCodes } from "http-status-codes"
import { customErrorResponse } from "../utils/responseObject.js"
import { AssignmentService } from "../services/assignmentService.js"
import ClientError from "../errors/clientError.js"
import { uploadToCloudinary } from "../utils/cloudinary.js"

const postAssignment=async(req:Request,res:Response)=>{
    try{
      const body=req.body 

      const files=req.files as Express.Multer.File[]

      console.log(files,'see files')

      if(!files){
        throw new ClientError({
          explanation:'No files provided',
         message:'No files provided ',
        statusCode:StatusCodes.NOT_FOUND
        })
      }

      const localFilePath=files?.map((file)=>file?.path) ?? []

      const cloudinaryUpload=await uploadToCloudinary(localFilePath)

      console.log(cloudinaryUpload,'see uploaded files')


      const validateBody=await validate(AssignmentSchema,body)

      const assignment=await AssignmentService(validateBody)


    }catch(error){
  return res.status(StatusCodes.UNAUTHORIZED).json({
    message: customErrorResponse({
      explanation: "Invalid assignment data",
      message: "Invalid data sent from the client",
    }),
  });
    }
}

const all_exports={
    postAssignment
}

export default all_exports