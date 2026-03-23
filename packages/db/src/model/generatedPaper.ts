import mongoose from 'mongoose'

const DIFFICULTY_TYPES=["easy","medium","hard"] as const
const QUESTION_TYPES = ["MCQ", "SHORT", "DIAGRAM", "NUMERICAL", "LONG"] as const;

interface Question {
    questionNo:number;
    text:string;
    type:(typeof QUESTION_TYPES)[number];
    difficulty:(typeof DIFFICULTY_TYPES)[number];
    marks:number;

}

interface Section {
    title:string;
    instructions:string;
    questions:Question[]
}

interface Metadata {
  totalQuestions: number;
  totalMarks: number;
  generationInMs: number;
  errorMessage?: string;
}

interface PaperType {
    assignmentId:mongoose.Types.ObjectId;
    prompt:string;
    sections:Section[];
    metadata:Metadata

}

const generatedPaperSchema=new mongoose.Schema<PaperType>({
    assignmentId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"Assignment"
    },
    prompt:{
      type:String,
      required:true
    },
    sections:{
    type:[{
        _id:false,
        title:{
            type:String,
            required:true
        },
        instructions:{
            type:String,
            required:true,
        },
        questions: {
        type: [{
          _id: false,
          questionNo: {
            type: Number,
            required: true
          },
          text: {
            type: String,
            required: true
          },
          type: {
            type: String,
            enum: {
              values: QUESTION_TYPES,
              message: `{VALUE} is not a valid question type`
            },
            required: true,
          },
          difficulty: {
            type: String,
            enum: {
              values: DIFFICULTY_TYPES,
              message: `{VALUE} is not a valid question difficulty type`
            },
            required: true,
            default: "easy"
          },
          marks: {
            type: Number,
            required: true
          },
        }],
        default: []
      }
    }],
    default: []
  },
    
    metadata:{
     totalQuestions:{
        type:Number,
        required:true
     },
    totalMarks:{
        type:Number,
        required:true
     },
     generationInMs:{
        type:Number,
        required:true
     },
     errorMessage:{
        type:String,
        
     }
    }
   

},{
    timestamps:true
})

const generatedPaperModel=mongoose.models?.GeneratedPaper || mongoose.model<PaperType>("GeneratedPaper",generatedPaperSchema)

export default generatedPaperModel