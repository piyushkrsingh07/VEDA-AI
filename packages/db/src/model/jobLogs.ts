import mongoose from 'mongoose'

const jobLogsSchema=new mongoose.Schema({
    assignmentId:{
        type:String,
        ref:"Assignment"
    },
    jobId:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
             enum:{
            values:["GENERATE_ASSIGNMENT","GENERATE_PDF"],
            message:`{VALUE} is not a valid status type`
     },
            validate(value:string){
            if(!["GENERATE_ASSIGNMENT","GENERATE_PDF"].includes(value)){
                throw new Error("Not a valid status type")
            }
        }
    
},
status:{
    type:String,
                 enum:{
            values:["QUEUED","ACTIVE","COMPLETED","FAILED"],
            message:`{VALUE} is not a valid status type`
     },
            validate(value:string){
            if(!["QUEUED","ACTIVE","COMPLETED","FAILED"].includes(value)){
                throw new Error("Not a valid status type")
            }
        },
        required:true

},
attemptsMade:{
              type:mongoose.SchemaTypes.Int32,
              required:true,
},
errorMessage:{
    type:String,
    ref:"GeneratedPaper"
}
})

const jobLogsModel=mongoose.models?.Logs || mongoose.model("Logs",jobLogsSchema)

export default jobLogsModel