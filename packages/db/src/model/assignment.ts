import mongoose from 'mongoose'

const assignmentSchema=new mongoose.Schema({
   title:{
    type:String,
    required:true,
    index:true
   },
   sourceMaterial:[{
    fileUrl:{type:String,required:true},
    fileName:{type:String},
    filetype:{
        type:String,
        enum:{
            values:["pdf","txt","none"],
            message:`{VALUE} is not a valid file type`,

        },
        validate(value:string){
            if(!["pdf","txt","none"].includes(value)){
                throw new Error("Not a valid file type")
            }
        }
    },
    extractedText:{type:String}
   }

   ],
   dueDate:{
    type:mongoose.SchemaTypes.Date,
    required:true
   },
   instructions:{
    type:String,
    
   },
   questionTypes:[{
    
       type:{ 
        type:String,
        enum:{
            values:["MCQ","SHORT","DIAGRAM","NUMERICAL","LONG"],
            message:`{VALUE} is not a valid question type`
        },
       validate(value:string){
            if(!["MCQ","SHORT","DIAGRAM","NUMERICAL","LONG"].includes(value)){
                throw new Error("Not a valid question type")
            }
        }
       },
       count:{ 
          type:mongoose.SchemaTypes.Int32,
          required:true,

       },
       marksPerQuestion:{
         type:mongoose.SchemaTypes.Int32,
          required:true,
       }
}
   ],
   totalQuestions:{
           type:mongoose.SchemaTypes.Int32,
          required:true,
   },
   totalMarks:{
           type:mongoose.SchemaTypes.Int32,
          required:true,
   },
   generationStatus:{
     type:String,
     enum:{
            values:["DRAFT","QUEUED","PROCESSING","COMPLETED","FAILED"],
            message:`{VALUE} is not a valid status type`
     },
            validate(value:string){
            if(!["DRAFT","QUEUED","PROCESSING","COMPLETED","FAILED"].includes(value)){
                throw new Error("Not a valid status type")
            }
        }
    
   },
   currentJobId:{
     type:String,
     required:true

   },
   generatedPaperId:{
    type:mongoose.SchemaTypes.ObjectId,
    required:true,
    ref:"GeneratedPaper"
   },


   
},{
    timestamps:true
})

const assignmentModel=mongoose.models?.Assignment || mongoose.model("Assignment",assignmentSchema)

export default assignmentModel