const SOURCE_FILE_TYPES=["pdf","txt","none"] as const 

const QUESTION_TYPES=["MCQ","SHORT","VERY_SHORT","DIAGRAM","NUMERICAL","LONG","CASE_STUDY"] as const

const GENERATION_STATUS=["DRAFT","QUEUED","PROCESSING","COMPLETED","FAILED"] as const


export interface Question {
    type:(typeof QUESTION_TYPES)[number];
    count:number;
    marksPerQuestion:number;

}

export interface Material {
    fileUrl:string;
    fileName?:string;
    fileType?:(typeof SOURCE_FILE_TYPES)[number];
    extractedText?:string
}

export interface AssignmentType {
    title:string;
    sourceMaterial:Material[];
    dueDate:Date;

    questionTypes:Question[];
  
    instructions?:string
   
 


}
