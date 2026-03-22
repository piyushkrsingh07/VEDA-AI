import { z, ZodType } from "zod";

export const validate = async <T>(
    schema: ZodType<T>,
    data: T
): Promise<T> => {
  try{
  const verify =   await schema.parseAsync(data);
   console.log(verify,'see verify')
  return verify
 
  }catch(error){
    console.log(error,'dekho error')
    throw error
  }

};
