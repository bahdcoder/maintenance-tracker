'use strict';

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _seededData = require('./seededData');

var _seededData2 = _interopRequireDefault(_seededData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);
var signupUrl = '/api/v1/auth/signup';
var signinUrl = '/api/v1/auth/login';

describe('Test default route', function () {
  it('Should return 200 for the default route', function (done) {
    _chai2.default.request(_app2.default).get('/').end(function (err, res) {
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('Should return 404 for routes not specified', function (done) {
    _chai2.default.request(_app2.default).get('/another/undefined/route').end(function (err, res) {
      expect(res.status).to.equal(404);
      done();
    });
  });
  it('Undefined Routes Should Return 404', function (done) {
    _chai2.default.request(_app2.default).post('/another/undefined/route').send({
      random: 'random'
    }).end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
});

describe('POST /api/v1/auth/signup', function () {
  it('It Should create users with right signup details', function (done) {
    _chai2.default.request(_app2.default).post('' + signupUrl).send(_seededData2.default[0]).end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('user created successfully');
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
      done();
    });
  });
  it('should not register a new user with an already existing email', function (done) {
    _chai2.default.request(_app2.default).post('' + signupUrl).send(_seededData2.default[0]).end(function (err, res) {
      expect(res).to.have.status(409);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('email already exists');
      expect(res.body.status).to.equal('fail');
      done();
    });
  });
  it('should not register user with a wrong email format', function (done) {
    _chai2.default.request(_app2.default).post('' + signupUrl).send({
      name: 'maureen',
      email: 'maureen.com',
      password: 'maureen123'
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      expect(res.body).to.be.an('object');
      expect(res.body.data.errors.email).to.include('The email format is invalid.');
      done();
    });
  });
  it('should take required character format error', function (done) {
    _chai2.default.request(_app2.default).post('' + signupUrl).send({
      name: 'hhhjjjjjjjjjjjjjjjjjjjjjjjjjjjjjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
      email: 'maureen@gmailcom',
      password: 'maureen123'
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      done();
    });
  });
  it('should not register user with an empty name field ', function (done) {
    _chai2.default.request(_app2.default).post('' + signupUrl).send({
      name: 'hhhjjjjjjjjjjjjjjjjjjjjjjjjjjjjjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
      email: 'maureen@gmailcom',
      password: 'maureen123'
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      done();
    });
  });
  it('should not register user with an name field that is not letters ', function (done) {
    _chai2.default.request(_app2.default).post('' + signupUrl).send({
      name: '123h99902%^*()',
      email: 'maureen@gmailcom',
      password: 'maureen123'
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      expect(res.body).to.be.an('object');
      expect(res.body.data.errors.name).to.include('The name format is invalid.');
      done();
    });
  });
  it('should not register user with an empty name field ', function (done) {
    _chai2.default.request(_app2.default).post('' + signupUrl).send({
      name: '',
      email: 'eloho@mymail.com',
      password: 'eloho123'
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      expect(res.body).to.be.an('object');
      expect(res.body.data.errors.name).to.include('The name field is required.');
      done();
    });
  });
  it('should not register name with less than 3 characters', function (done) {
    _chai2.default.request(_app2.default).post('' + signupUrl).send({
      name: 'ma',
      email: 'eloho@mymail.com',
      password: 'eloho123'
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      expect(res.body).to.be.an('object');
      expect(res.body.data.errors.name).to.include('The name must not be less than 3 characters.');
      done();
    });
  });
  it('should not register a name with more than 15 characters', function (done) {
    _chai2.default.request(_app2.default).post('' + signupUrl).send({
      name: 'maureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeen',
      email: 'eloho@mymail.com',
      password: 'eloho123'
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      expect(res.body).to.be.an('object');
      expect(res.body.data.errors.name).to.include('The name must not be greater than 15 characters.');
      done();
    });
  });
  it('should not register a name with wierd characters', function (done) {
    _chai2.default.request(_app2.default).post('' + signupUrl).send({
      name: '@$@%#!^!',
      email: 'eloho@mymail.com',
      password: 'eloho123'
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      expect(res.body).to.be.an('object');
      expect(res.body.data.errors.name).to.include('The name format is invalid.');
      done();
    });
  });
  it('should not register with less than 8 password characters', function (done) {
    _chai2.default.request(_app2.default).post('' + signupUrl).send({
      name: 'maureen',
      email: 'eloho@mymail.com',
      password: '123'
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      expect(res.body).to.be.an('object');
      expect(res.body.data.errors.password).to.include('The password must not be less than 8 characters.');
      done();
    });
  });
  it('should not register user with an empty email field ', function (done) {
    _chai2.default.request(_app2.default).post('' + signupUrl).send({
      username: 'maureen',
      email: '',
      password: 'maureen123'
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      expect(res.body).to.be.an('object');
      expect(res.body.data.errors.email).to.include('The email field is required.');
      done();
    });
  });
  it('should not register user with an empty password field ', function (done) {
    _chai2.default.request(_app2.default).post('' + signupUrl).send({
      username: 'maureen',
      email: 'maureen@email.com',
      password: ''
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      expect(res.body).to.be.an('object');
      expect(res.body.data.errors.password).to.include('The password field is required.');
      done();
    });
  });
  it('should not register user with an empty string field ', function (done) {
    _chai2.default.request(_app2.default).post('' + signupUrl).send({
      name: 'maureen',
      email: 'maureen@email.com',
      password: '   '
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      expect(res.body).to.be.an('object');
      expect(res.body.data.errors.password).to.include('The password field is required.');
      done();
    });
  });
});
describe('POST /api/v1/auth/login', function () {
  it('should login a user with the correct details', function (done) {
    _chai2.default.request(_app2.default).post('' + signinUrl).send(_seededData2.default[1]).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('data');
      expect(res.body.message).to.equal('user logged in successfully');
      expect(res.body.status).to.be.equal('success');
      done();
    });
  });
  it('should not login user without password', function (done) {
    _chai2.default.request(_app2.default).post('' + signinUrl).send({
      email: 'maureen@mymail.com',
      password: ''
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      expect(res.body).to.be.an('object');
      expect(res.body.data.errors.password).to.include('The password field is required.');
      done();
    });
  });
  it('should not login user with empty password string', function (done) {
    _chai2.default.request(_app2.default).post('' + signinUrl).send({
      email: 'maureen@mymail.com',
      password: '    '
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      expect(res.body).to.be.an('object');
      expect(res.body.data.errors.password).to.include('The password field is required.');
      done();
    });
  });
  it('should not login user without email address', function (done) {
    _chai2.default.request(_app2.default).post('' + signinUrl).send({
      email: '',
      password: 'maureen123'
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      expect(res.body).to.be.an('object');
      expect(res.body.data.errors.email).to.include('The email field is required.');
      done();
    });
  });
  it('should not login user with empty email address string', function (done) {
    _chai2.default.request(_app2.default).post('' + signinUrl).send({
      email: '    ',
      password: 'maureen123'
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      expect(res.body).to.be.an('object');
      expect(res.body.data.errors.email).to.include('The email field is required.');
      done();
    });
  });
  it('should not login user with invalid email address', function (done) {
    _chai2.default.request(_app2.default).post('' + signinUrl).send({
      email: 'me.com',
      password: 'maureen123'
    }).end(function (err, res) {
      expect(res).to.have.status(406);
      expect(res.body).to.be.an('object');
      expect(res.body.data.errors.email).to.include('The email format is invalid.');
      done();
    });
  });
  it('should not sign in a user with an incorrect password', function (done) {
    _chai2.default.request(_app2.default).post('' + signinUrl).send({
      email: 'mena@gmail.com',
      password: 'wrongpass'
    }).end(function (err, res) {
      expect(res).to.have.status(401);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('please try again, password or email is incorrect');
      done();
    });
  });
  it('should not login user with an incorrect email address', function (done) {
    _chai2.default.request(_app2.default).post('' + signinUrl).send({
      email: 'wrong@mymail.com',
      password: 'maureen123'
    }).end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('user does not exist');
      done();
    });
  });
});