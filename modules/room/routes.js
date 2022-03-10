import express from 'express';
import { createKamar, getKamar } from './kamar.js';


const roomRouter=express.Router();

const modulePath="/services"

roomRouter.get(modulePath+"/kamar", getKamar)
roomRouter.post(modulePath+"/kamar",createKamar);


export default roomRouter;
