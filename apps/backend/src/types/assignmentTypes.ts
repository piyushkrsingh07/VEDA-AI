const SOURCE_FILE_TYPES=["pdf","txt","none"] as const 

const QUESTION_TYPES=["MCQ","SHORT","DIAGRAM","NUMERICAL","LONG"] as const

const GENERATION_STATUS=["DRAFT","QUEUED","PROCESSING","COMPLETED","FAILED"] as const


export interface Question {
    type:(typeof QUESTION_TYPES)[number];
    count:number;
    marksPerQuestion:number;

}

export interface Material {
    fileUrl:string;
    fileName?:string;
    fileType:(typeof SOURCE_FILE_TYPES)[number];
    extractedText?:string
}

export interface AssignmentType {
    title:string;
    sourceMaterial:Material[];
    dueDate:Date;

    questionTypes:Question[];
    totalQuestions:number;
    instructions?:string
    totalMarks:number;
    generationStatus:(typeof GENERATION_STATUS)[number];
    currentJobId?:string;



}
