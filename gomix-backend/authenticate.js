'use strict'

var express = require('express');
var app = express();

var jwt = require('jsonwebtoken');
var config = require('./config');
app.set('tokenKey', config.secret);

// var toToken = {
//     email: "blabla@kutya.com",
//     password: "pass",
//     admin: 1
// }
// //Sample token for test purposes

function createToken(toToken) {
    var innertoken = toToken;
    var token = jwt.sign(toToken, 'tokenKey', {
        expiresIn: '1440'
    });

    return token;
}


function decodeToken(token) {
    jwt.verify(token, 'tokenKey', function(err, decoded) {
        if (err) {
            thorw(err);
        } else {
            return decoded;
        }
    })
}


// decodeToken(createToken(toToken));
