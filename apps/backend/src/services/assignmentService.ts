import { Assignment, assignmentQueue, JobLog } from "@repo/db"
import type { AssignmentType } from "../types/assignmentTypes.js"



export const AssignmentService=async(assignment:AssignmentType)=>{
   try{

   //assignment body validate ho chuki hai
    const assignmentData=await Assignment.create({
      ...assignment,
      generationStatus:"QUEUED"
    })

    console.log(assignmentData,'see assignment data ')

   const queue= await assignmentQueue.add('generate-assignment', { assignmentId: assignmentData?._id.toString() },
   {
     attempts:3,
     backoff:{
        type:'exponential',
        delay:2000
     },
     removeOnComplete:100,
     removeOnFail:100
   });

   console.log(queue,'see queue dtaa')

   if(!assignmentData){
    throw new Error("assignment not created")
   }

   if(!queue.id) return 
   

   assignmentData.currentJobId=queue.id?.toString()
   
   await assignmentData.save()

   await JobLog.create({
    assignmentId:assignmentData._id,
    jobId:queue?.id,
    jobType:"GENERATE_ASSIGNMENT",
    status:"QUEUED",
    attemptsMade:queue.attemptsMade, 
   })
   
return {
    assignmentId:assignmentData._id,
    jobId:queue?.id,
    status:'QUEUED'
}

   }catch(error){
    console.log(error,'see error ')
    throw error
   }
}