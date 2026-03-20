import mongoose from 'mongoose'
import "dotenv/config";
import { error } from 'node:console';

let isConnected=false;

export async function connect(){
    if(isConnected){
        return mongoose.connection
    }
    const mongoDbUrl=process.env.MONGODB_URL
    if(!mongoDbUrl){
        throw new Error("MONGODB_URL is not defined in environment variables");
    }
    try{
      await mongoose.connect(mongoDbUrl)

      const connection=mongoose.connection;

      connection.on('connected',()=>{
        console.log('Mongodb connected successfully')
      })

      connection.on('error',()=>{
        console.error("Mongodb connection failed",error)
        throw new Error("Unable to connect to mongodb")
      })
    }catch(error){
     console.error('Mongodb connection failed',error)
     throw new Error('Unable to connect to mongodb')
    }
}