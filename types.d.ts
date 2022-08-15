import { Request } from "express"
import IUser from "./src/Interfaces/User"

export type AuthInfoRequest =  Request & {
    userData: IUser /** Appedning user data */
}
export enum MaritalStatus { SINGLE, MARRIED, DIVORCED, WIDOWED }
export enum AccountStatus { UNVERIFIED, PENDING_VERIFICATION, VERIFIED }
