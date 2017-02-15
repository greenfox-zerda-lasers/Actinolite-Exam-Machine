'use strict'

  var pg = require('pg');
  var pool = new pg.Pool(config);
  var express = require('express');
  var app = express();
  var ver = require('./validators')

  var jwt = require('jsonwebtoken');
  var config = require('./config');
  app.set('tokenKey', config.secret);


  function createToken(toToken, id) {

      var fullToken = {
        user_email: toToken.user_email,
        user_password: toToken.user_password,
        user_id: id.id,
        user_type: id.user_type
      }
      console.log(fullToken);
      var token = jwt.sign(fullToken, 'tokenKey', {
          expiresIn: '14400'
      });

      return token;
  }
  function decodeToken(token) {
    var p = new Promise(function(resolve, reject){
      jwt.verify(token, 'tokenKey', function(err, decoded) {
          if (err) {
              var rejectmessage = {status: "fail", message: "Something."}
              reject(rejectmessage);
          } else {
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
