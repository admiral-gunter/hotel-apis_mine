import express from 'express';

import { authenticationCheck } from '../../middleware/auth.js';
import { LoginController } from './login.js';
import {  RegisterController } from './register.js';
const authRouter=express.Router();

const modulePath="/auth"

authRouter.get("/",(req,res)=>{
    res.send({'status':1})
});

authRouter.post(modulePath+"/register",RegisterController);
authRouter.post(modulePath+"/login",LoginController);


export default authRouter;
