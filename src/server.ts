import app from './app.js'
import {env} from './config/env.js'
import { connectDb } from './config/db.js'
import { connectRedis } from './config/redis.js';


const startserver=async()=>{
   
        await connectDb();
        await connectRedis();
        app.listen(env.port,()=>{
            console.log(`Server is running on port ${env.port}`)
        })
}
startserver()