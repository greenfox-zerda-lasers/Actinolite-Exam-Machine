'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var pg = require('pg');
var cors = require('cors');
// var mysql = require('mysql');
//var pgp = require('pg-promise')();
var ver = require('./validators')
var auth = require('./authenticate')
app.use(bodyParser.json());
app.use(cors());

// postgres experimental

// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*' );
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     next();
// }

// app.use(allowCrossDomain);

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

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
   console.log('login request received');
   pool.connect(function(err, client, done) {
    client.query('SELECT * FROM users', function(err, result) {
    //console.log(result.rows);
    if (err) {

    }
      var resul = ver.verify(req.body, result.rows);
    if (resul.result){
      // console.log(req.body);
      // console.log(auth.createToken(req.body)); //Hozzaadott sor
      // res.json(auth.createToken(req.body));
       var tokenName = "token";
       var token = auth.createToken(req.body,resul);
       ver.statusSuccess.token = token;
      console.log("ver.statusSuccess.token: ",typeof(ver.statusSuccess.token));
       res.setHeader(tokenName, token);
       // res.json(auth.createToken(req.body));
       res.json(ver.statusSuccess);
    } else {
      res.json(ver.statusErr);
      }
      done();
   });
  });
});

app.post('/token', function(req, res) {
  console.log("req.body.headers: ",req.body.headers);
    auth.decodeToken(req.body.headers).then(function(decoded){console.log("decoded token in server.js: ",decoded)});
    console.log("decoded token in server.js: ")
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // pool.query('SELECT * FROM users WHERE user_email= ?', [decoded.user_email], function(err, rows) {
//         if (err) {
//             throw (err);
//             console.log(rows);
//         }
//               console.log("Here it fails...", rows);

        // jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        //     if (err) {
        //         return console.log('Token expired');
        //         // thorw (err);
        //     } else {
        //         req.decoded = decoded;
        //         console.log(req.decoded);
        //         res.send();
        //     }
        // });
    })
// })

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

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

 // var con = mysql.createConnection({
 // host: 'sql11.freesqldatabase.com',
 // database: 'sql11155674',
 // user: "'sql11155674'",
 // password: 'EGts2DcSSA'
 // });

// app.post('/user/login', function(req, res) {
//   var users = con.query('SELECT * FROM users;', function(err, rows) {
//     if (err) {
//       console.log(err);
//     }
//     if (ver.verify(req.body, rows)) {
//       console.log(ver.statusSuccess);
//       res.json(ver.statusSuccess);
//     } else{
//       console.log(ver.statusErr);
//       res.json(ver.statusErr);
//       }
//   });
// });

// app.post('/user/signup', function(req, res) {
//   var users = con.query('SELECT * FROM users;', function(err, rows) {
//     if (err) {
//       console.log(err);
//     }
//     if (ver.valami(req.body.email) === true && ver.emailExist(req.body, rows) === false) {
//         con.query('INSERT INTO users (email, name, password) VALUES ("' + req.body.email + '","' + req.body.name + '","' + req.body.password + '");');
//         res.json({result: "success", token: "A-Z", "id": 431});
//     } else {
//       res.json({"result": "Fail", "message": "Email address already exists."});
//     }
//   });
// });

// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
module.exports = app;
app.listen(5000);
