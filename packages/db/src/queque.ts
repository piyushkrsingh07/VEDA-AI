import { Queue, Worker } from 'bullmq';


export const assignmentQueue = new Queue('generate-assignment', {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password:process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME
  },
});

