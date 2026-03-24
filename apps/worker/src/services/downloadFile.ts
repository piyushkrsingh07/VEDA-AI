import axios from "axios"


export async function downloadPdfBuffer(url:string): Promise<string> {
   const response=await axios.get(url,{
    responseType:"arraybuffer"
})

   return Buffer.from(response.data).toString('base64')
}