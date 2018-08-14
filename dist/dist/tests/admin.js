'use strict';

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);

var userToken = void 0;
var adminUrl = '/api/v1/requests';
var userSignin = '/api/v1/auth/login';
var seededAdmin = {
  email: 'mena@gmail.com',
  password: 'mena1234'
};

describe('ADMIN CONTROLLER', function () {
  before(function (done) {
    _chai2.default.request(_app2.default).post('' + userSignin).send(seededAdmin).end(function (err, res) {
      userToken = res.body.data.token;
      done();
    });
  });
  describe('GET /api/v1/requests', function () {
    it('should allow authenticated admin to view all requests', function (done) {
      _chai2.default.request(_app2.default).get('' + adminUrl).set('token', userToken).end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('request');
        expect(res.body.message).to.equal('all request gotten successfully');
        expect(res.body.status).to.be.equal('success');
        done();
      });
    });
    it('should not allow users not authenticated to view all requests', function (done) {
      _chai2.default.request(_app2.default).get('' + adminUrl).end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('user authentication invalid');
        expect(res.body.status).to.be.equal('fail');
        done();
      });
    });
  });
  describe('GET /api/v1/users/requests/1', function () {
    it('should allow authenticated admin to view a single request', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/requests/1').set('token', userToken).end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal('user request gotten successfully');
        expect(res.body.status).to.be.equal('success');
        done();
      });
    });
    it('should not allow admin not authenticated to view a single request', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/users/requests/1').end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('user authentication invalid');
        expect(res.body.status).to.be.equal('fail');
        done();
      });
    });
  });
  describe('PUT /api/v1/requests/:id/approve', function () {
    it('should allow an authenticated admin to approve a request', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/requests/1/approve').set('token', userToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('request');
        expect(res.body.message).to.equal('request approved successfully');
        expect(res.body.status).to.be.equal('success');
        done();
      });
    });
    it('should not allow non admin to approve request', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/requests/1/approve').end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('user authentication invalid');
        expect(res.body.status).to.be.equal('fail');
        done();
      });
    });
    it('should not update a particular id that is not a number', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/requests/nki/approve').set('token', userToken).end(function (err, res) {
        expect(res).to.have.status(406);
        expect(res.body).to.be.an('object');
        expect(res.body.data.errors.id).to.include('The id must be an integer.');
        done();
      });
    });
    it('should not aprrove a request that is already resolved', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/requests/5/approve').set('token', userToken).end(function (err, res) {
        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('you cannot approve, request is already resolved.');
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('should not aprrove a request that is already approved', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/requests/3/approve').set('token', userToken).end(function (err, res) {
        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('you cannot approve, request is already approved.');
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('should aprrove a request that is pending', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/requests/2/approve').set('token', userToken).end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('request approved successfully');
        expect(res.body.status).to.equal('success');
        done();
      });
    });
    it('should aprrove a request that is disapproved', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/requests/4/approve').set('token', userToken).end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('request approved successfully');
        expect(res.body.status).to.equal('success');
        done();
      });
    });
  });
  describe('PUT /api/v1/requests/:id/disapprove', function () {
    it('should not allow non admin to disapprove request', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/requests/1/disapprove').end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('user authentication invalid');
        expect(res.body.status).to.be.equal('fail');
        done();
      });
    });
    it('should not disapprove a particular id that is not a number', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/requests/nki/approve').set('token', userToken).end(function (err, res) {
        expect(res).to.have.status(406);
        expect(res.body).to.be.an('object');
        expect(res.body.data.errors.id).to.include('The id must be an integer.');
        done();
      });
    });
    it('should allow an authenticated admin to disapprove a request', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/requests/2/disapprove').set('token', userToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('request');
        expect(res.body.message).to.equal('request disapproved successfully');
        expect(res.body.status).to.be.equal('success');
        done();
      });
    });
    it('should not disaprrove a request that is resolved', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/requests/5/disapprove').set('token', userToken).end(function (err, res) {
        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('you cannot disapprove, request is already resolved');
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('should disaprrove a request that is pending', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/requests/3/disapprove').set('token', userToken).end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('request disapproved successfully');
        expect(res.body.status).to.equal('success');
        done();
      });
    });
  });
  describe('PUT /api/v1/requests/:id/resolve', function () {
    it('should not allow non admin to resolve request', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/requests/1/resolve').end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('user authentication invalid');
        expect(res.body.status).to.be.equal('fail');
        done();
      });
    });
    it('should not reslove a particular id that is not a number', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/requests/nki/resolve').set('token', userToken).end(function (err, res) {
        expect(res).to.have.status(406);
        expect(res.body).to.be.an('object');
        expect(res.body.data.errors.id).to.include('The id must be an integer.');
        done();
      });
    });
    it('should allow an authenticated admin to resolve a request', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/requests/1/resolve').set('token', userToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('request');
        expect(res.body.message).to.equal('request resolved successfully');
        expect(res.body.status).to.be.equal('success');
        done();
      });
    });
  });
  it('should not resolve a request that is disapproved', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/requests/4/resolve').set('token', userToken).end(function (err, res) {
      expect(res).to.have.status(403);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('Unapproved request cannot be resolved');
      expect(res.body.status).to.equal('fail');
      done();
    });
  });
  it('should not resolve a request that is resolved', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/requests/5/resolve').set('token', userToken).end(function (err, res) {
      expect(res).to.have.status(403);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('Unapproved request cannot be resolved');
      expect(res.body.status).to.equal('fail');
      done();
    });
  });
});