import bcrypt from 'bcrypt';
import DBConnection from '../../db/connection.js';

const cryptPassword = function(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
     if (err) 
       return callback(err);
 
     bcrypt.hash(password, salt, function(err, hash) {
       return callback(err, hash);
     });
   });
 };

export const RegisterController=(req,res)=>{
  cryptPassword(req.body.password,(err,hash)=>{
      if (err) { throw err; }
      DBConnection.query('INSERT INTO users (email,password,role) VALUES (?)', [[req.body.email, hash,req.body.role]], function (error, results, fields) {
        if (error) throw error
      res.status(200).send({
        "status":1,
        "data":{
            "message":results
        }
        })
        });
    });

}