import Blob from 'node-blob'
import fs from 'fs'
import path from 'path';
var a = 'assets/uploads/thumbnail-1648908224441-966322178.jpg'

let buff = new Blob([fs.readFileSync(path.join('../assets/uploads/thumbnail-1648908224441-966322178.jpg'))], {type:"image/jpg"})
console.log(buff);