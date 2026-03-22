import type { Request,Response } from "express"
import { validate } from "../validators/zodValidator.js"
import { AssignmentSchema } from "../validators/assignmentSchema.js"
import { StatusCodes } from "http-status-codes"
import { customErrorResponse } from "../utils/responseObject.js"
import { AssignmentService } from "../services/assignmentService.js"

const postAssignment=async(req:Request,res:Response)=>{
    try{
      const body=req.body 

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