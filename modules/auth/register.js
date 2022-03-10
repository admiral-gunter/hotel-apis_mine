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
    DBConnection.beginTransaction(function(err) {
      if (err) { throw err; }
      DBConnection.query('INSERT INTO users (email,password,no_kontak,name) VALUES (?)', [[req.body.email, hash,req.body.no_kontak, req.body.name]], function (error, results, fields) {
        if (error) {
          return DBConnection.rollback(function() {
            throw error;
          });
        }
  
        DBConnection.query('INSERT INTO user_role (user_id,roles_id) VALUES (?)', [[results.insertId, req.body.roles_id]], function (error, results, fields) {
          if (error) {
            return DBConnection.rollback(function() {
              throw error;
            });
          }
          DBConnection.commit(function(err) {
            if (err) {
              return DBConnection.rollback(function() {
                throw err;
              });
            }
            res.status(200).send({
              "status":1,
              "data":{
                  "message":results
              }
          })
          });
        });
      });
    });
  })
    // const query="INSERT INTO user (email,password,employeeID,company_id,is_holding,full_name,role_id) VALUES (?)";
    // cryptPassword(req.body.password,(err,hash)=>{
    //     const values=[[req.body.email,hash,req.body.employeeID,req.body.company_id,req.body.is_holding,req.body.full_name,req.body.role_id]];
    //     DBConnection.query(query,values,(err,result)=>{
    //         if(err)throw err;
    //         res.status(201).send({
    //             "status":1,
    //             "message":"Created,Ok"
    //         })
    //     });
    // })
}