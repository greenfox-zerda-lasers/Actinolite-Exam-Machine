'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var pg = require('pg');
var cors = require('cors');
var ver = require('./validators')
var auth = require('./authenticate')
app.use(bodyParser.json());
app.use(cors());



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Expose-Headers", "token");
    next();
});

var config = {
  host: 'ec2-54-221-217-158.compute-1.amazonaws.com',
  port: 5432,
  database: 'd5tp8i95rn4dog',
  user: 'mkletnrqqxwlih',
  password: 'b8ab3c1c66e2bf5c01ec0822a94622c8660344999fde163b68e8e8aebec21e7f',
  ssl: true,
};

var pool = new pg.Pool(config);


app.post('/user/login', function(req, res) {
   // console.log('login request received');
   pool.connect(function(err, client, done) {
    client.query('SELECT * FROM users', function(err, result) {
    if (err) {
        throw err
    }
      var resul = ver.verify(req.body, result.rows);
    if (resul.result){
       var tokenName = "token";
       var token = auth.createToken(req.body,resul);
       ver.statusSuccess.token = token;
            res.body = resul;
        console.log('resul:',res.body);
            res.setHeader('token',token )
        // console.log("response from server setHe; ",res.socket._httpMessage._headers.token);

        res.json(ver.statusSuccess);

    } else {
      res.json(ver.statusErr);
      }
      done();
   });
  });
});

app.post('/token', function(req, res) {
  // console.log("req.headers: ",req.headers);
    auth.decodeToken(req.headers.token).then(function(decoded){});
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    })


app.post('/user/signup', function(req, res) {
 pool.connect(function(err, client, done) {
 client.query('SELECT * FROM users', function(err, result) {
  if (err) {
    console.log(err);
  }
  if (ver.emailValid(req.body.email) === true && ver.emailExist(req.body, result.rows) === false) {
      //client.query('INSERT INTO users (user_email, user_name, user_password) VALUES ($1, $2, $3)', [req.body.email, req.body.name, req.body.password]);
      res.json({result: "success", token: "A-Z", "id": 431});
  } else {
    res.json({"result": "Fail", "message": "Email address already exists."});
  }
   done();
    });
  });
});

module.exports = app;
app.listen(5000);
