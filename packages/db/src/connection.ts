import mongoose from 'mongoose'
import "dotenv/config";
import { error } from 'node:console';

let isConnected=false;

export const connect=async()=>{
    if(isConnected){
        return mongoose.connection
    }
    const mongoDbUrl=process.env.MONGODB_URL
    if(!mongoDbUrl){
        throw new Error("MONGODB_URL is not defined in environment variables");
    }
    try{
      await mongoose.connect(mongoDbUrl)
      isConnected = true;
  console.log("MongoDB connected successfully main m");
      const connection=mongoose.connection;

     connection.on('connected',()=>{
        console.log('Mongodb connected successfully yha s')
      })

      connection.on('error',(err)=>{
        console.error("Mongodb connection failed yha s",err)
        throw new Error("Unable to connect to mongodb")
      }) 

      return mongoose.connection
    }catch(error){
     console.error('Mongodb connection failed',error)
     throw new Error('Unable to connect to mongodb')
    }
}
export default connect;

