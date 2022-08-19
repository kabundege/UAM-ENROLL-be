import { Router } from "express";
import Controller from '../controller';
import { AuthCheck } from "../middlewares/authenticate";
import Validators from "../middlewares/validate";

const route:Router = Router()

const { 
    SignUpValidation,CodeValidation
} = Validators

/** User APIs */
route.get('/', Controller.WelcomeApi)
route.post('/signup', SignUpValidation, Controller.Signup)
route.post('/verify-account', AuthCheck, CodeValidation, Controller.Verification)


export default route
