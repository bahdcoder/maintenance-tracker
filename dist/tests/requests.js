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

var userToken = void 0;
var requestUrl = '/api/v1/users/requests';
var userSignup = '/api/v1/auth/signup';

describe('REQUEST CONTROLLER', function () {
  before(function (done) {
    _chai2.default.request(_app2.default).post('' + userSignup).send(_seededData2.default[2]).end(function (err, res) {
      userToken = res.body.data.token;
      done();
    });
  });
  describe('POST /api/v1/users/requests', function () {
    it('should not add request with an empty title field', function (done) {
      _chai2.default.request(_app2.default).post('' + requestUrl).set('token', userToken).send({
        title: ' ',
        department: 'Technical',
        equipment: 'computer',
        serialnumber: 'MT000001',
        description: 'faulty battery',
        token: userToken
      }).end(function (err, res) {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.data.errors.title).to.include('The title field is required.');
        done();
      });
    });
    it('should not add request title with less than 5 characters', function (done) {
      _chai2.default.request(_app2.default).post('' + requestUrl).set('token', userToken).send({
        title: 'bad',
        department: 'Technical',
        equipment: 'computer',
        serialnumber: 'MT000001',
        description: 'faulty battery',
        token: userToken
      }).end(function (err, res) {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.data.errors.title).to.include('The title must not be less than 5 characters.');
        done();
      });
    });
    it('should not add request with an empty department', function (done) {
      _chai2.default.request(_app2.default).post('' + requestUrl).set('token', userToken).send({
        title: 'computer repair',
        department: ' ',
        equipment: 'computer',
        serialnumber: 'MT000001',
        description: 'faulty battery',
        token: userToken
      }).end(function (err, res) {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.data.errors.department).to.include('The department field is required.');
        done();
      });
    });
    it('should not add request with an empty equipment field', function (done) {
      _chai2.default.request(_app2.default).post('' + requestUrl).set('token', userToken).send({
        title: 'computer repair',
        department: 'Technical ',
        equipment: ' ',
        serialnumber: 'MT000001',
        description: 'faulty computer ',
        token: userToken
      }).end(function (err, res) {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.data.errors.equipment).to.include('The equipment field is required.');
        done();
      });
    });
    it('should not add request with an empty serialNumber field', function (done) {
      _chai2.default.request(_app2.default).post('' + requestUrl).set('token', userToken).send({
        title: 'computer repair',
        department: 'Technical ',
        equipment: 'computer ',
        serialnumber: ' ',
        description: 'faulty computer ',
        token: userToken
      }).end(function (err, res) {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.data.errors.serialnumber).to.include('The serialnumber field is required.');
        done();
      });
    });
    it('should not add request with an empty description field', function (done) {
      _chai2.default.request(_app2.default).post('' + requestUrl).set('token', userToken).send({
        title: 'computer repair',
        department: 'Technical ',
        equipment: 'computer ',
        serialnumber: 'MT000001',
        description: ' ',
        token: userToken
      }).end(function (err, res) {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.data.errors.description).to.include('The description field is required.');
        done();
      });
    });
    it('should not add serialNumber with less than 8 characters', function (done) {
      _chai2.default.request(_app2.default).post('' + requestUrl).set('token', userToken).send({
        title: 'computer repair',
        department: 'Technical ',
        equipment: 'computer ',
        serialnumber: 'MT000',
        description: 'faulty computer',
        token: userToken
      }).end(function (err, res) {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.data.errors.serialnumber).to.include('The serialnumber must be only 8 characters.');
        done();
      });
    });
    it('should not add desription with less than 3 characters', function (done) {
      _chai2.default.request(_app2.default).post('' + requestUrl).set('token', userToken).send({
        title: 'computer repair',
        department: 'Technical ',
        equipment: 'computer ',
        serialnumber: 'MT000001',
        description: 'ba',
        token: userToken
      }).end(function (err, res) {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.data.errors.description).to.include('The description must not be less than 3 characters.');
        done();
      });
    });
    it('should allow authenticated users to add requests', function (done) {
      _chai2.default.request(_app2.default).post('' + requestUrl).set('token', userToken).send({
        title: 'computer repair',
        department: 'Technical ',
        equipment: 'computer ',
        serialnumber: 'MT000001',
        description: 'bad battery',
        token: userToken
      }).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('request created successfully');
        expect(res.body.status).to.be.equal('success');
        done();
      });
    });

    it('should not allow  non auth users to add requests', function (done) {
      _chai2.default.request(_app2.default).post('' + requestUrl).send({
        title: 'computer repair',
        department: 'Technical ',
        equipment: 'computer ',
        serialnumber: 'MT000001',
        description: 'bad battery',
        token: userToken
      }).end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('user authentication invalid');
        expect(res.body.status).to.be.equal('fail');
        done();
      });
    });
  });
  describe('PUT /api/v1/users/requests/:id', function () {
    it('should not allow non authenticated user to update request', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/users/requests/6').send({
        title: 'computer repair',
        department: 'Technical ',
        equipment: 'computer ',
        serialnumber: 'MT000001',
        description: 'bad battery',
        token: userToken
      }).end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('user authentication invalid');
        done();
      });
    });
    it('should not update a particular id that is not a number', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/users/requests/abcdefgh').set('token', userToken).send({
        email: 'maureen@gmail.com',
        password: 'maureen123'
      }).end(function (err, res) {
        expect(res).to.have.status(406);
        expect(res.body).to.be.an('object');
        expect(res.body.data.errors.id).to.include('The id must be an integer.');
        done();
      });
    });
    it('should allow an authenticated user to update a request', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/users/requests/6').set('token', userToken).send({
        title: 'computer repair',
        department: 'Business ',
        equipment: 'computer ',
        serialnumber: 'MT000001',
        description: 'bad battery',
        token: userToken
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal('request updated successfully');
        expect(res.body.status).to.be.equal('success');
        done();
      });
    });
  });
  describe('GET /api/v1/users/requests', function () {
    it('should allow users authenticated to view all requests', function (done) {
      _chai2.default.request(_app2.default).get('' + requestUrl).set('token', userToken).end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal('request gotten successfully');
        expect(res.body.status).to.be.equal('success');
        done();
      });
    });
    it('should not allow users not authenticated to view all requests', function (done) {
      _chai2.default.request(_app2.default).get('' + requestUrl).end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('user authentication invalid');
        expect(res.body.status).to.be.equal('fail');
        done();
      });
    });
  });
  describe('GET /api/v1/users/requests/1', function () {
    it('should allow users authenticated to view a single request', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/users/requests/6').set('token', userToken).end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal('single request gotten successfully');
        expect(res.body.status).to.be.equal('success');
        done();
      });
    });
    it('should not allow users not authenticated to view a single request', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/users/requests/3').end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('user authentication invalid');
        expect(res.body.status).to.be.equal('fail');
        done();
      });
    });
  });
});