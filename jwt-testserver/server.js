'use strict'

var ver = require('./validators');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mysql = require('mysql');

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');
var port = process.env.PORT || 8080;

//szuritol
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if( req.method == "OPTIONS" ) {
      res.send(200)
    } else {
      next();
    }
});

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var mysqlsecond = require('mysql');
var connection = mysqlsecond.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6025',
    database: 'login_test'
});

connection.connect(function(err) {
    if (err) {
        console.log('server not working');
        return;
    }
    console.log('Ccoonevcnfted to serrbed');
});

app.use(morgan('dev'));


var apiRoutes = express.Router();

app.post('/authenticate', function(req, res) {
    connection.query('SELECT * FROM user_datas', function(err, rows) {
        if (err) {
            throw (err);
        };
        if (ver.verify(req.body, rows)) {
            console.log('verified');
            connection.query('SELECT admin FROM user_datas WHERE password= ?', [req.body.password], function(err, adminrows){
                if (err) { ///Good errormesseges has to be added.
                    throw (err);
                };
            console.log("adminvariable printed: ",adminrows[0].admin, adminrows);
            var toToken = {
              email: req.body.email,
              password: req.body.password,
              admin: adminrows[0].admin
            }
            var token = jwt.sign(toToken, app.get('superSecret'), {
                expiresIn: '1440'
            });
            var message = {
                success: true,
                text: 'mysql token connected',
                token: token
            };
            var tokenName = "token";
            ver.statusSuccess.token = token;
            res.setHeader(tokenName, token);
            // console.log(res, "headers kiirva");
            res.json(ver.statusSuccess);
          })
        } else {
            console.log(ver.statusErr);
            res.json(ver.statusErr);
        }

    })
})

app.post('/token', function(req, res) {
    console.log(req.body);
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    connection.query('SELECT * FROM user_datas', function(err, rows) {
        if (err) {
            throw (err);
            console.log(rows);
        }
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return console.log('Token expired');
                // thorw (err);
            } else {
                req.decoded = decoded;
                console.log(req.decoded);
                res.send();
            }
        });
    })
})


app.use('/api', apiRoutes);

app.listen(port);
console.log('Magic happens at http://localhost' + port);
