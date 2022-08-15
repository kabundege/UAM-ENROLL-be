import { Document } from "mongoose";
import { AccountStatus } from "../../types";

export default interface IUser extends Document {
  profilePhoto: string,
  name: string,
  email: string,
  password: string,
  gender: string,
  age: string,
  national_id: string,
  phoneNumber: string,
  document: string,
  status: AccountStatus,
  hasTwoFactorAuth?:boolean,
  dateOfBirth: Date | string,
  maritalStatus: string,
  nationality: string
}
