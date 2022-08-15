import { Response } from 'express'

export const SuccessResponse = (res:Response,status:number,message?:string,data?:any) => {
    return res.status(status).json({
        data,
        status,
        message
    })
}

export const ErrorResponse = (res:Response,status:number,error?:string,extra?:string) => {
    const message = extra || new Error(error)
    //
    return res.status(status).json({
        error,
        status,
        message,
    })
}