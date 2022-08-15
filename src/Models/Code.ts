import mongoose, { Schema } from "mongoose";
import ICode from "../Interfaces/Code";

const CodeSchema:Schema = new Schema(
    {
        userId: { type:String,required:true},
        code: { type:String, required:true},
    },{
        toJSON: {
            transform(doc, ret){
                delete ret.__v;
            }
        },
        timestamps: true
    }
)

export default mongoose.model<ICode>('Code',CodeSchema)
