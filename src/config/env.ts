import dotenv from 'dotenv';

dotenv.config();
export const env = {
    port : Number(process.env.PORT )|| 3000,
    mongo_URI : process.env.mongo_URI || 'mongodb://localhost:27017/mydatabase',
    REDIS_URL: process.env.REDIS_URL || 'redis://redis:6379',
} 