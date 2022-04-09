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
      DBConnection.beginTransaction()
      DBConnection.query('SELECT * FROM users WHERE email IN (?)',[req.body.email], function (error, results, fields) {
        if(err) throw err;

        if(results.length > 0){
          DBConnection.rollback()
          return res.status(400).send({
            status:0,
            message:"Email tersebut sudah terdaftar",
            data:[]
          })
        }
     
      DBConnection.query('INSERT INTO users (full_name,email,password,role) VALUES (?)', [[req.body.name,req.body.email, hash,req.body.role]], function (error, results, fields) {
      if (error) throw error
      DBConnection.commit()
      res.status(201).send({
        "status":1,
        "data":{
            "message":results
        }
      })
    });
  });

  });

}