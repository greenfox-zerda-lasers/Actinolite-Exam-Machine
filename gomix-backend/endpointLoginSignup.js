var ver      = require('./validators.js'); 
var database = require('./database.js');
var bcrypt   = require('bcrypt');
var auth     = require('./authenticate');

const saltRounds = 9;

module.exports = {
  
  login: function(req, res) {
   console.log('login request received');
   database.pool.connect(function(err, client, done) {
     client.query('SELECT * FROM users WHERE user_email = ($1)', [req.body.user_email], function(err, result) {
        var user = result.rows[0]
        if (err) {
          console.log(err);
        } 
        else if (result.rows.length > 0) {
          bcrypt.compare(req.body.user_password, result.rows[0].user_password, function(err, valid) {
            if (valid === true ) {
              var tokenName = "token";
              // console.log(user)
              var token = auth.createToken(req.body, user);
              // ver.statusSuccess.token = token;
              res.setHeader('token', token);
              // console.log(token);
              res.json(ver.setStatusSuccess(result.rows[0]));
            } else {
              res.json(ver.statusErr);
            }                           
          });
        } else {
          res.json({status: "fail", message: "Email does not exist."})
        }
      });
      done();
    });
  },
  
  signup: function(req, res) {
    database.pool.connect(function(err, client, done) {
      client.query('SELECT * FROM users', function(err, result) {  
      if (err) {
        console.log(err);
      }
      if (ver.emailValid(req.body.user_email) === true && ver.emailExist(req.body, result.rows) === false) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(req.body.user_password, salt, function(err, hash) {
            console.log('hash length:', hash.length)
            client.query('INSERT INTO users (user_email, user_name, user_password) VALUES ($1, $2, $3)', [req.body.user_email, req.body.user_name, hash], function(err) {
            if (err) {
              console.log(err)
            }
            else {
              client.query('SELECT user_id FROM users WHERE user_name=($1)', [req.body.user_name], function(err, result2) {
                if (err) {
                  console.log(err);
                }
                else {
                  client.query('INSERT INTO users_classes (user_id) VALUES ($1)', [result2.rows[0].user_id]);
                }
              })
              res.json({result: "success", token: "A-Z", "id": 431});             
              }
            });
          });
        });
      } else {
        res.json({"result": "Fail", "message": "Email address already exists."});
      }
      });
    done();
    });
  },
  
  userType: function(req, res) {
    database.pool.connect(function(err, client, done) {
      client.query('SELECT user_id, user_name FROM users WHERE user_admin=($1)', ['f'], function (err, result) {
        if (err) {
          console.log(err);
        }
        else {
          res.json({"users": result.rows});
        }                                       
      });    
      done();
    });
  }
  
}