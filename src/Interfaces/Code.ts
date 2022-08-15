import { Document } from "mongoose";

export default interface ICode extends Document {
    userId: string,
    code: string,
}
