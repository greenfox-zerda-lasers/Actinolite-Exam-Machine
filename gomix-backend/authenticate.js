'use strict'
// var toToken = {
//   email: "blabla@kutya.com",
//   password: "pass",
//   admin: 1
// }
// //Sample token for test purposes

  var express = require('express');
  var app = express();

  var jwt = require('jsonwebtoken');
  var config = require('./config');
  app.set('tokenKey', config.secret);


  function createToken(toToken) {
    console.log('tokenrequest is running')

      var token = jwt.sign(toToken, 'tokenKey', {
          expiresIn: '1440'
      });

      return token;
  }
  function decodeToken(token) {
    var p = new Promise(function(resolve, reject){

      jwt.verify(token, 'tokenKey', function(err, decoded) {

          if (err) {
              reject(err);
          } else {
          console.log('decoded token in authenticate.js: ', decoded); //has to be removed later
              resolve(decoded);
          }
      })
    })
    return p;
  }

  module.exports ={
    createToken: createToken,
    decodeToken: decodeToken
  };
