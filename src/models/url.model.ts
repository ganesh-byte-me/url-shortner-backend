import mongoose ,{Schema,Document} from "mongoose";


export interface IUrl extends Document{
        originalUrl: string;
        shortcode: string;
        clicks: number;
        createdAt: Date;
}

const urlSchema=new mongoose.Schema<IUrl>({
    
    originalUrl:{
        type:String,
        required:true
    },
    shortcode:{
        type:String,
        required:true,
        unique:true
    },
    clicks:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const Url=mongoose.model<IUrl>('Url',urlSchema)