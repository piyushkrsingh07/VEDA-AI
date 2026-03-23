import mongoose from 'mongoose'

const JOB_TYPE=["GENERATE_ASSIGNMENT","GENERATE_PDF"] as const

const STATUS_TYPE=["QUEUED","ACTIVE","COMPLETED","FAILED"] as const

interface JobLogs {
    assignmentId:mongoose.Types.ObjectId;
    jobId:string;
    jobType:(typeof JOB_TYPE)[number];
    status:(typeof STATUS_TYPE)[number];
    attemptsMade:number;
    errorMessage?:mongoose.Types.ObjectId
}

const jobLogsSchema=new mongoose.Schema<JobLogs>({
    assignmentId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Assignment",
        required:true
    },
    jobId:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
             enum:{
            values:JOB_TYPE,
            message:`{VALUE} is not a valid status type`
     },
     required:true

},
status:{
    type:String,
                 enum:{
            values:STATUS_TYPE,
            message:`{VALUE} is not a valid status type`
     },

        required:true

},
attemptsMade:{
              type:Number,
              required:true,
},
errorMessage:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"GeneratedPaper"
}
})

const jobLogsModel=mongoose.models?.JobLog || mongoose.model<JobLogs>("JobLog",jobLogsSchema)

export default jobLogsModel