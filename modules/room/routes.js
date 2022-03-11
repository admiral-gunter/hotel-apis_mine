import express from 'express';
import { createJenisKamar, createKamar, deleteJenisKamar, deletekamar, getJenisKamar, getKamar } from './kamar.js';


const roomRouter=express.Router();

const modulePath="/services"

roomRouter.get(modulePath+"/kamar", getKamar)
roomRouter.post(modulePath+"/kamar",createKamar)
roomRouter.delete(modulePath+"/kamar/:id",deletekamar)

roomRouter.get(modulePath+"jenis-kamar", getJenisKamar)
roomRouter.post(modulePath+"/jenis-kamar", createJenisKamar)
roomRouter.delete(modulePath+"jenis-kamar/:id", deleteJenisKamar)

export default roomRouter;
