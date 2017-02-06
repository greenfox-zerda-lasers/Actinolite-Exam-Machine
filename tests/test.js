'use strict';

var test = require('tape');
var ver = require('./../gomix-backend/gomix_validators.js');
var request = require('supertest');
var app = require('./../gomix-backend/gomix_server.js');

/*--------------------------EMAILVALIDATOR TESETS-----------------------------*/

test('emailValidator with a basic email', function (t) {
    var actual = ver.emailValid('basic@basic.com');
    var expected = true;
    t.equal(actual, expected);
    t.end();
});

test('emailValidator withhout @ sign', function (t) {
  var actual = ver.emailValid('basicbasic.com');
  var expected = false;
  t.equal(actual, expected);
  t.end();
});

test('emailValidator withhout  nothin beofore @', function (t) {
  var actual = ver.emailValid('@basic.com');
  var expected = false;
  t.equal(actual, expected);
  t.end();
});

test('emailValidator withhout  nothin between @ and .', function (t) {
  var actual = ver.emailValid('basic@.com');
  var expected = false;
  t.equal(actual, expected);
  t.end();
});

test('emailValidator without .', function (t) {
  var actual = ver.emailValid('basic@basiccom');
  var expected = false;
  t.equal(actual, expected);
  t.end();
});

test('emailValidator with nothing after . ', function (t) {
  var actual = ver.emailValid('basic@basic.');
  var expected = false;
  t.equal(actual, expected);
  t.end();
});

test('emailValidator with invalid character', function (t) {
  var actual = ver.emailValid('basic;@basic.com');
  var expected = false;
  t.equal(actual, expected);
  t.end();
});

test('eamilValidator with uppercase letter' , function (t) {
  var actual = ver.emailValid('Basic@basic.com');
  var expected = true;
  t.equal(actual, expected);
  t.end();
});

/*-------------------------EMAILEXIST TEST------------------------------------*/

test('emailExist with an email not in DB', function (t) {
  var req = {emil: 'basic@basic.com'}
  var obj = [
    {
      user_email: 'basic@basic.com',
      user_password: 'basic',
      user_id: 1,
      user_type: 'student'
    },
    {
      user_email: 'basic1@basic1.com',
      user_password: 'basic1',
      user_id: 2,
      user_type: 'mentor'
    }
  ];
  var actual = ver.emailExist(req, obj);
  var expected = false;
  t.equal(actual, expected);
  t.end();
});

test('emailExist with an email already in DB', function (t) {
  var req = {email: 'basic@basic.com'}
  var obj = [
    {
      user_email: 'basic@basic.com',
      user_password: 'basic',
      user_id: 1,
      user_type: 'student'
    },
    {
      user_email: 'basic1@basic1.com',
      user_password: 'basic1',
      user_id: 2,
      user_type: 'mentor'
    }
  ];
  var actual = ver.emailExist(req, obj);
  var expected = true;
  t.equal(actual, expected);
  t.end();
});

/*-------------------------VERIFICATION TESETS--------------------------------*/

test('verification with valid email', function (t) {
  var req = {email: 'basic@basic.com', password: 'basic'};
  var obj = [
    {
      user_email: 'basic@basic.com',
      user_password: 'basic',
      user_id: 1,
      user_type: 'student'
    },
    {
      user_email: 'basic1@basic1.com',
      user_password: 'basic1',
      user_id: 2,
      user_type: 'mentor'
    }
  ];
  var actual = ver.verify(req, obj);
  var expected = true;
  t.equal(actual, expected);
  t.end();
});

test('Correct response returned after valid login', function (t) {
  var req = {email: 'admin@admin.com', password: 'admin'};
  var response = {result: "success", token: "", user_id: 1, user_type: 'mentor'};
  request(app)
    .post('/user/login')
    .send(req)
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(response)
    .end(function (err, res) {
      t.error(err, 'No error');
      t.end();
    });
});

test('Correct response returned after invalid login', function (t) {
  var req = {email: 'admin@admin.com', password: 'user'};
  var response = {result: "fail", message: "Invalid username or password"};
  request(app)
    .post('/user/login')
    .send(req)
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(response)
    .end(function (err, res) {
      t.error(err, 'No error');
      t.end();
    });
});

test('Correct response after signup with email already exist in DB', function (t) {
  var req = {email: 'admin@admin.com', name: 'admin', password: 'user'};
  var response = {"result": "Fail", "message": "Email address already exists."};
  request(app)
    .post('/user/signup')
    .send(req)
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(response)
    .end(function (err, res) {
      t.error(err, 'No error');
      t.end();
  });
});

test('Correct response after successfull signup', function (t) {
  var req = {email: 'bela@admin.com', name: 'bela', password: 'bela'};
  var response = {result: "success", token: "A-Z", "id": 431};
  request(app)
    .post('/user/signup')
    .send(req)
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(response)
    .end(function (err, res) {
      t.error(err, 'No error');
      t.end();
  });
});
