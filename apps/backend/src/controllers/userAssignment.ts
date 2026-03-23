import type { Request,Response } from "express"
import { validate } from "../validators/zodValidator.js"
import { AssignmentSchema } from "../validators/assignmentSchema.js"
import { StatusCodes } from "http-status-codes"
import { customErrorResponse } from "../utils/responseObject.js"
import { AssignmentService } from "../services/assignmentService.js"
import ClientError from "../errors/clientError.js"
import { uploadToCloudinary } from "../utils/cloudinary.js"
import type { Question } from "../types/assignmentTypes.js"

const postAssignment=async(req:Request,res:Response)=>{
    try{
     

      const files=req.files as Express.Multer.File[]

      console.log(files,'see files')

      if(!files || files.length === 0){
        throw new ClientError({
          explanation:'No files provided',
         message:'No files provided ',
        statusCode:StatusCodes.NOT_FOUND
        })
      }

      const localFilePath=files?.map((file)=>file?.path) ?? []

      const cloudinaryUpload=await uploadToCloudinary(localFilePath)

      console.log(cloudinaryUpload,'see uploaded files')

      const questionTypes=JSON.parse(req.body.questionTypes)

      const totalQuestions=questionTypes.reduce((total: number, question: Question)=>{
        return total+= question.count
      },0)

      const totalMarks=questionTypes.reduce((total:number,question:Question)=>{
        return total+=question.count+question.marksPerQuestion
      },0)

      const finalBody={
        ...req.body,
        questionTypes,
        sourceMaterial:cloudinaryUpload,
        totalQuestions,
        totalMarks
      }

      console.log(finalBody,'see final body ')


      const validateBody=await validate(AssignmentSchema,finalBody)

        console.log(validateBody,'see validated body')

      const assignment=await AssignmentService(validateBody)
       console.log(assignment,'see assingment')

             return res.status(StatusCodes.OK).json({message:`Assignment creating in progress `,data:{assignmentResponse:assignment}})
   


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