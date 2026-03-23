import z from "zod"

const SOURCE_FILE_TYPES=["pdf","txt","none"] as const 
const QUESTION_TYPES=["MCQ","SHORT","DIAGRAM","NUMERICAL","LONG"] as const
const GENERATION_STATUS=["DRAFT","QUEUED","PROCESSING","COMPLETED","FAILED"] as const

export const AssignmentSchema=z.object({
 title:z.string().trim().min(2,{message:"Invalid Title"}).max(15,{message:"Invalid Title"}),
 sourceMaterial:z.array(
    z.object({
        fileUrl:z.string().url(),
        fileName:z.string().trim().min(2,{message:"Invalid File Name"}).max(15,{message:"Invalid File Name"}),
        fileType:z.enum(SOURCE_FILE_TYPES),
        extractedText:z.string()
    })
 ),
 dueDate:z.coerce.date(),
 instructions:z.string(),
 questionTypes:z.array(
    z.object({
       type:z.enum(QUESTION_TYPES),
         count: z.number().min(1, "Count must be at least 1"),
  marksPerQuestion: z.number().min(1, "Marks per question must be at least 1"),

    })
 ).min(1,"Atleast one question type is required"),
   totalQuestions: z.number().min(1, "Total questions must be at least 1"),

  totalMarks: z.number().min(1, "Total marks must be at least 1"),
  generationStatus:z.enum(GENERATION_STATUS),
  currentJobId: z.string().min(1, "Current job id is required"),

//   generatedPaperId: z.string().min(1, "Generated paper id is required"),

})

export type AssignmentData=z.infer<typeof AssignmentSchema>