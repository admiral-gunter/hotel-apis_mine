import express, { application } from 'express';
import path from 'path'
import multer from 'multer'
import { authenticationCheck } from '../../middleware/auth.js';
import { createJenisKamar, createKamar, deleteJenisKamar, deletekamar, getJenisKamar, getKamar, getKamarGeneral, getKamarKosong } from './kamar.js';


const roomRouter=express.Router();

const modulePath="/services"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage, fileFilter: (req,file, cb)=>{
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true)
    } else {
        cb(null,false)
        const err = new Error('only .png, .jpg, and .jpeg format allowed')
        err.name = 'Extension Error'
        return cb(err)
    }
} })

const cpUpload = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
roomRouter.use(authenticationCheck)
roomRouter.get(modulePath+"/kamar",getKamar)
roomRouter.get(modulePath+"/kamars",getKamarGeneral)
roomRouter.get(modulePath+"/kamar-kosong",getKamarKosong)
roomRouter.post(modulePath+"/kamar",cpUpload,createKamar)
roomRouter.delete(modulePath+"/kamar/:id",deletekamar)

roomRouter.get(modulePath+"jenis-kamar",getJenisKamar)
roomRouter.post(modulePath+"/jenis-kamar",createJenisKamar)
roomRouter.delete(modulePath+"jenis-kamar/:id",deleteJenisKamar)

export default roomRouter;
