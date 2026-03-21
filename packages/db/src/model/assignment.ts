import mongoose from 'mongoose'
import { model } from 'mongoose'

const SOURCE_FILE_TYPES=["pdf","txt","none"] as const 

const QUESTION_TYPES=["MCQ","SHORT","DIAGRAM","NUMERICAL","LONG"] as const

const GENERATION_STATUS=["DRAFT","QUEUED","PROCESSING","COMPLETED","FAILED"] as const

interface Question {
    type:(typeof QUESTION_TYPES)[number];
    count:number;
    marksPerQuestion:number;

}

interface Material {
    fileUrl:string;
    fileName?:string;
    fileType:(typeof SOURCE_FILE_TYPES)[number];
    extractedText?:string
}

interface AssignmentType {
    title:string;
    sourceMaterial:Material[];
    dueDate:Date;

    questionTypes:Question[];
    totalQuestions:number;
    instructions?:string
    totalMarks:number;
    generationStatus:(typeof GENERATION_STATUS)[number];
    currentJobId:string;
    generatedPaperId:mongoose.Types.ObjectId


}

const questionSchema=new mongoose.Schema<Question>({
        type:{ 
        type:String,
        enum:{
            values:QUESTION_TYPES,
            message:`{VALUE} is not a valid question type`
        },
        required:true

       },
       count:{ 
          type:Number,
          required:true,
          min:1
       },
       marksPerQuestion:{
         type:Number,
          required:true,
          min:1
       },
   
}, {_id:false})

const assignmentSchema=new mongoose.Schema<AssignmentType>({
   title:{
    type:String,
    required:true,
    index:true,
    trim:true
   },
   sourceMaterial:{
   type:[{
    fileUrl:{type:String,required:true},
    fileName:{type:String},
    fileType:{
        type:String,
        enum:{
            values:SOURCE_FILE_TYPES,
            message:`{VALUE} is not a valid file type`,
      
        },
        default:"none"

    },
    extractedText:{type:String}
   }

   ]},
   dueDate:{
    type:mongoose.SchemaTypes.Date,
    required:true
   },
   instructions:{
    type:String,
    
   },
   questionTypes:{
    type:[questionSchema],
    required:true,
    validate:{
        validator: function (value: Question[]){
            return Array.isArray(value) && value?.length >0
        },
        message:"At least one question type is required"
    }

}
   ,
   totalQuestions:{
           type:Number,
          required:true,
          min:1
   },
   totalMarks:{
           type:Number,
          required:true,
          min:1
   },
   generationStatus:{
     type:String,
     enum:{
            values:GENERATION_STATUS,
            message:`{VALUE} is not a valid status type`
     },
     required:true,
     default:"DRAFT"

    
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

const assignmentModel=mongoose.models?.Assignment || mongoose.model<AssignmentType>("Assignment",assignmentSchema)

export default assignmentModel

