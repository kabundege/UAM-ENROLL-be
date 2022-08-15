import mongoose, { Schema } from "mongoose";
import IUser from "../Interfaces/User";

const UserSchema:Schema = new Schema(
    {
        profilePhoto: { type:String,required:true},
        name: { type:String, required:true},
        email: { type:String, required:true},
        password: { type:String, required:true},
        gender: { type:String, required:true },
        age: { type:String, required:true },
        national_id: { type:String, required:true },
        phoneNumber: { type:String, required:true },
        document: { type:String, required:true },
        status: { type: String, required:false },
        hasTwoFactorAuth: { type:Boolean,required:false },
        dateOfBirth: { type:String, required:true },
        maritalStatus: { type:String, required:true },
        nationality: { type:String, required:true }
    },{
        toJSON: {
            transform(doc, ret){
                delete ret.password;
                delete ret.__v;
            }
        },
        timestamps: true
    }
)

export default mongoose.model<IUser>('User',UserSchema)
