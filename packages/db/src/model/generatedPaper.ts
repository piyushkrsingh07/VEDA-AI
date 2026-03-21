import mongoose from 'mongoose'

const generatedPaperSchema=new mongoose.Schema({
    assignmentId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:"true",
        ref:"Assignment"
    },
    prompt:{
      type:String,
      required:true
    },
    sections:[{
        title:{
            type:String,
            required:true
        },
        instructions:{
            type:String,
            required:true,
             questions:[{
        questionNo:{
            type:mongoose.SchemaTypes.Int32,
            required:true
        },
        text:{
            type:String,
            required:"true"
        },
        type:{
            type:String,
            required:'true',

        },
        difficulty:{
                  type:String,
        enum:{
            values:["easy","medium","hard"],
            message:`{VALUE} is not a valid question difficulty type`
        },
       validate(value:string){
            if(!["easy","medium","hard"].includes(value)){
                throw new Error("Not a valid question type")
            }
        }  
        },
        marks:{
            type:mongoose.SchemaTypes.Int32,
            required:true
        },
        
        

    }

    ],
        }

    }
        
    ],
    metadata:{
     totalQuestions:{
        type:mongoose.SchemaTypes.Int32,
        required:true
     },
    totalMarks:{
        type:mongoose.SchemaTypes.Int32,
        required:true
     },
     generationInMs:{
        type:mongoose.SchemaTypes.Int32,
        required:true
     },
     errorMessage:{
        type:String,
        
     }
    }
   

},{
    timestamps:true
})

const generatedPaperModel=mongoose.models?.GeneratedPaper || mongoose.model("GeneratedPaper",generatedPaperSchema)

export default generatedPaperModel