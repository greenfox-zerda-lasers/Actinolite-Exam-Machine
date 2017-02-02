'use strict'

var ver = require('./validators');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
// var mongoose = require('mongoose');
var mysql = require('mysql');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User = require('./app/models/user'); // get our mongoose model
var port = process.env.PORT || 8080;

//szuritol
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// mongoose.connect(config.database);
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

// app.get('/', function(req, res) {
//     res.send('Hello! The API is at http://localhost' + port + '/api');
// });


// var nick = ({
//     name: 'Ni',
//     password: 'p',
//     admin: true
// });
// app.post('/', function(req, res) {
//     connection.query('INSERT INTO user_datas(name, password, admin) VALUES (?, ?, ?)', [nick.name, nick.password, nick.admin], function(err, rows) {
//         if (err) {
//             throw (err);
//         };
//     })
//
//     res.send({
//         success: true
//     });
// })

var apiRoutes = express.Router();

app.post('/authenticate', function(req, res) {
            // console.log(req.body);
            connection.query('SELECT * FROM user_datas', function(err, rows) {
                if (err) {
                    throw (err);
                }; //hibat inkabb throw errorral.
                // console.log(rows);
                if (ver.verify(req.body, rows)) {
                  console.log('verified');
                    var token = jwt.sign(req.body, app.get('superSecret'), {
                        expiresIn: '1440'
                    });
                    var message = {
                        success: true,
                        text: 'mysql token connected',
                        token: token
                    };
                    ver.statusSuccess.token = token;
                    // console.log(ver.statusSuccess);
                    // console.log(rows);
                    res.json(ver.statusSuccess);
                    // res.json(ver.statusSuccess);
                } else {
                    console.log(ver.statusErr);
                    res.json(ver.statusErr);
                }

            })
})

app.post('/token', function(req, res) {
            console.log('token fut');
            console.log(req.body);
            var token = req.body.token;
            connection.query('SELECT * FROM user_datas', function(err, rows) {
                if (err) {
                    throw (err);
                // }; //hibat inkabb throw errorral.
                console.log(rows);
                }
                console.log(jwt.verify);
                    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                        if (err) {
                          throw (err);
                        } else{
                            req.decoded = decoded;
                            console.log(req.decoded);
                            res.send();
                        }
                    });
                  })
                })

            apiRoutes.use(function(req, res, next) {
                var token = req.body.token || req.query.token || req.headers['x-access-token']
                if (token) {
                    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                        if (err) {
                            req.decoded = decoded;
                            console.log(req.decoded);
                            next();
                        }
                    });
                } else {
                    return res.status(403).send({
                        success: false,
                        message: 'No token provided.'
                    });
                }

            });


            app.use('/api', apiRoutes);

            app.listen(port);
            console.log('Magic happens at http://localhost' + port);
