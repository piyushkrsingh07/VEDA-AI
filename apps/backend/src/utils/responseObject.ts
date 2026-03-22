interface ErrorResponse {
    message?:string;
    explanation?:string;
}

export const internalErrorResponse=(error:ErrorResponse)=>{
    return {
        success:false,
        err:error,
        data:{},
        message:'Internal Server Error'
    }
}

export const customErrorResponse=(error:ErrorResponse)=>{
   if(!error.message || !error.explanation){
     return internalErrorResponse(error)
   }
   return {
    success:false,
    err:error.explanation,
    data:{},
    message:error.message
   }
}