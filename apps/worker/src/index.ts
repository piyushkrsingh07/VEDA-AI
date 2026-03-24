import dotenv from "dotenv"
import {Assignment, redisConfig} from "@repo/db"

import {connect} from "@repo/db"
import { Worker,Job } from "bullmq"
import { llmResponse } from "./services/llmService.js"
dotenv.config()


const workerService=async()=>{
  try{
    await connect()

    const worker=new Worker("generate-assignment",
        async (job:Job)=>{
          console.log(job,'see what are the data received in job')
          const {assignmentId}=job.data as {assignmentId:string}
          console.log(assignmentId,'see assignment id')

          if(!assignmentId){
            throw new Error("Assignment not found ")
          }

          const assignment=await Assignment.findById(assignmentId)
          console.log("see assignment in worjer",assignment)

          if(!assignment){
            throw new Error("assignment not found")
          }
          
        const {title,sourceMaterial,dueDate,instructions,questionTypes}=assignment

        const llmRequiredData={
            title,
            sourceMaterial,
            dueDate,
            instructions:instructions ?? "",
            questionTypes,

        }
          const llm=await llmResponse(llmRequiredData)
        },{
         connection:redisConfig.redisOption
        }
    )

    


  }catch(error){
    console.log(error,'see error received')
  }
}

workerService()
