import express from 'express';
import { authenticationCheck } from '../../middleware/auth.js';
import { createJenisKamar, createKamar, deleteJenisKamar, deletekamar, getJenisKamar, getKamar } from './kamar.js';


const roomRouter=express.Router();

const modulePath="/services"

roomRouter.get(modulePath+"/kamar", authenticationCheck,getKamar)
roomRouter.post(modulePath+"/kamar", authenticationCheck,createKamar)
roomRouter.delete(modulePath+"/kamar/:id", authenticationCheck,deletekamar)

roomRouter.get(modulePath+"jenis-kamar", authenticationCheck,getJenisKamar)
roomRouter.post(modulePath+"/jenis-kamar", authenticationCheck,createJenisKamar)
roomRouter.delete(modulePath+"jenis-kamar/:id", authenticationCheck,deleteJenisKamar)

export default roomRouter;
