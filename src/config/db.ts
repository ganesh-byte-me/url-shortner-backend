import mongoose from "mongoose"
import { env } from "./env.js"

export const connectDb= async()=>{
    try{
        await mongoose.connect(env.mongo_URI);
        console.log('Database connected successfully')
    }catch(error){
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};
