import { GoogleGenAI , createUserContent,
  createPartFromUri, } from "@google/genai";
import type { AssignmentType } from "../types/assignment.js";
import { downloadPdfBuffer } from "./downloadFile.js";



export const llmResponse=async(assignment:AssignmentType)=>{
   try{
          const {title,sourceMaterial,dueDate,questionTypes,instructions}=assignment
      console.log(assignment,'dekho jo assingment aaya hai')

      const helpingMaterial=await Promise.all(sourceMaterial.map((file)=>{
           

        return downloadPdfBuffer(file.fileUrl)
      }))
   
      const pdfParts = helpingMaterial.map((buffer) => ({
  inlineData: {
    mimeType: "application/pdf",
    data: buffer,
  },
}));

       
        if(!process.env.GEMINI_API_KEY){
        throw new Error("Gemini Api is not configured")
      }
        const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

 

     console.log(pdfParts,'seeing pdf parts')


  const prompt = `
Generate a structured school question paper.

Assignment Title:
${title}

Teacher Instructions:
${instructions ?? "None"}

Question configuration:
${JSON.stringify(questionTypes, null, 2)}

Rules:

1. Create one section per question type.
2. Preserve exact number of questions.
3. Preserve marks per question.
4. Use uploaded reference PDFs as style guidance.
5. Return valid JSON only.
6. Include answerKey.
`;


    const result = await ai.models.generateContent({
      model: "gemini-2.5-pro",
    contents: [
    {
      parts: [
        { text: prompt },
        ...pdfParts,
      ],
    },
  ],
    });
    

    const responseText = result.text;

    console.log("Gemini response:", responseText);

    
   }catch(error){
     console.log(error,'see eror in llm response')
   }
}