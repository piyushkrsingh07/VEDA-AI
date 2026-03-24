import {Redis} from "ioredis";
import "dotenv/config";

const pub=new Redis({
    host:process.env.REDIS_HOST,
    port:Number(process.env.REDIS_PORT),
    username:process.env.REDIS_USERNAME,
    password:process.env.REDIS_PASSWORD
})

const sub = new Redis({
    host:process.env.REDIS_HOST,
    port:Number(process.env.REDIS_PORT),
    username:process.env.REDIS_USERNAME,
    password:process.env.REDIS_PASSWORD
})

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

const redisOption={
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null as null,
}

export const redisConfig={
    pub,
    sub,
    redis,
    redisOption

}