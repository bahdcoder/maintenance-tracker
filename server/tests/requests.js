import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import users from './seededData';

const { expect } = chai;
chai.use(chaiHttp);

let userToken;
const requestUrl = '/api/v1/users/requests';
const userSignup = '/api/v1/auth/signup';

describe('REQUEST CONTROLLER', () => {
  before((done) => {
    chai.request(app)
      .post(`${userSignup}`)
      .send(users[2])
      .end((err, res) => {
        userToken = res.body.data.token;
        done();
      });
  });
  describe('POST /api/v1/users/requests', () => {
    it('should not add request with an empty title field', (done) => {
      chai.request(app)
        .post(`${requestUrl}`)
        .set('token', userToken)
        .send({
          title: ' ',
          department: 'Technical',
          equipment: 'computer',
          serialnumber: 'MT000001',
          description: 'faulty battery',
          token: userToken,
        })
        .end((err, res) => {
          expect(res.status).to.equal(406);
          expect(res.body).to.be.an('object');
          expect(res.body.data.errors.title)
            .to.include('The title field is required.');
          done();
        });
    });
    it('should not add request title with less than 5 characters', (done) => {
      chai.request(app)
        .post(`${requestUrl}`)
        .set('token', userToken)
        .send({
          title: 'bad',
          department: 'Technical',
          equipment: 'computer',
          serialnumber: 'MT000001',
          description: 'faulty battery',
          token: userToken,
        })
        .end((err, res) => {
          expect(res.status).to.equal(406);
          expect(res.body).to.be.an('object');
          expect(res.body.data.errors.title)
            .to.include('The title must not be less than 5 characters.');
          done();
        });
    });
    it('should not add request with an empty department', (done) => {
      chai.request(app)
        .post(`${requestUrl}`)
        .set('token', userToken)
        .send({
          title: 'computer repair',
          department: ' ',
          equipment: 'computer',
          serialnumber: 'MT000001',
          description: 'faulty battery',
          token: userToken,
        })
        .end((err, res) => {
          expect(res.status).to.equal(406);
          expect(res.body).to.be.an('object');
          expect(res.body.data.errors.department)
            .to.include('The department field is required.');
          done();
        });
    });
    it('should not add request with an empty equipment field', (done) => {
      chai.request(app)
        .post(`${requestUrl}`)
        .set('token', userToken)
        .send({
          title: 'computer repair',
          department: 'Technical ',
          equipment: ' ',
          serialnumber: 'MT000001',
          description: 'faulty computer ',
          token: userToken,
        })
        .end((err, res) => {
          expect(res.status).to.equal(406);
          expect(res.body).to.be.an('object');
          expect(res.body.data.errors.equipment)
            .to.include('The equipment field is required.');
          done();
        });
    });
    it('should not add request with an empty serialNumber field', (done) => {
      chai.request(app)
        .post(`${requestUrl}`)
        .set('token', userToken)
        .send({
          title: 'computer repair',
          department: 'Technical ',
          equipment: 'computer ',
          serialnumber: ' ',
          description: 'faulty computer ',
          token: userToken,
        })
        .end((err, res) => {
          expect(res.status).to.equal(406);
          expect(res.body).to.be.an('object');
          expect(res.body.data.errors.serialnumber)
            .to.include('The serialnumber field is required.');
          done();
        });
    });
    it('should not add request with an empty description field', (done) => {
      chai.request(app)
        .post(`${requestUrl}`)
        .set('token', userToken)
        .send({
          title: 'computer repair',
          department: 'Technical ',
          equipment: 'computer ',
          serialnumber: 'MT000001',
          description: ' ',
          token: userToken,
        })
        .end((err, res) => {
          expect(res.status).to.equal(406);
          expect(res.body).to.be.an('object');
          expect(res.body.data.errors.description)
            .to.include('The description field is required.');
          done();
        });
    });
    it('should not add serialNumber with less than 8 characters', (done) => {
      chai.request(app)
        .post(`${requestUrl}`)
        .set('token', userToken)
        .send({
          title: 'computer repair',
          department: 'Technical ',
          equipment: 'computer ',
          serialnumber: 'MT000',
          description: 'faulty computer',
          token: userToken,
        })
        .end((err, res) => {
          expect(res.status).to.equal(406);
          expect(res.body).to.be.an('object');
          expect(res.body.data.errors.serialnumber)
            .to.include('The serialnumber must be only 8 characters.');
        done();
      });
    });
    it('should not add desription with less than 3 characters', (done) => {
      chai.request(app)
        .post(`${requestUrl}`)
        .set('token', userToken)
        .send({
          title: 'computer repair',
          department: 'Technical ',
          equipment: 'computer ',
          serialnumber: 'MT000001',
          description: 'ba',
          token: userToken,
        })
        .end((err, res) => {
          expect(res.status).to.equal(406);
          expect(res.body).to.be.an('object');
          expect(res.body.data.errors.description)
            .to.include('The description must not be less than 3 characters.');
          done();
        });
    });
    it('should allow authenticated users to add requests', (done) => {
      chai.request(app)
        .post(`${requestUrl}`)
        .set('token', userToken)
        .send({
          title: 'computer repair',
          department: 'Technical ',
          equipment: 'computer ',
          serialnumber: 'MT000001',
          description: 'bad battery',
          token: userToken,
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('request created successfully');
          expect(res.body.status).to.be.equal('success');
          done();
        });
    });

    it('should not allow  non auth users to add requests', (done) => {
      chai.request(app)
        .post(`${requestUrl}`)
        .send({
          title: 'computer repair',
          department: 'Technical ',
          equipment: 'computer ',
          serialnumber: 'MT000001',
          description: 'bad battery',
          token: userToken,
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('user authentication invalid');
          expect(res.body.status).to.be.equal('fail');
          done();
        });
    });
  });
  describe('PUT /api/v1/users/requests/:id', () => {
    it('should not allow non authenticated user to update request', (done) => {
      chai.request(app)
        .put('/api/v1/users/requests/6')
        .send({
          title: 'computer repair',
          department: 'Technical ',
          equipment: 'computer ',
          serialnumber: 'MT000001',
          description: 'bad battery',
          token: userToken,
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('user authentication invalid');
          done();
        });
    });
    it('should not update a particular id that is not a number', (done) => {
      chai.request(app)
        .put('/api/v1/users/requests/abcdefgh')
        .set('token', userToken)
        .send({
          email: 'maureen@gmail.com',
          password: 'maureen123',
        })
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body).to.be.an('object');
          expect(res.body.data.errors.id)
            .to.include('The id must be an integer.');
          done();
        });
    });
    it('should allow an authenticated user to update a request', (done) => {
      chai.request(app)
        .put('/api/v1/users/requests/6')
        .set('token', userToken)
        .send({
          title: 'computer repair',
          department: 'Business ',
          equipment: 'computer ',
          serialnumber: 'MT000001',
          description: 'bad battery',
          token: userToken,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.message).to.equal('request updated successfully');
          expect(res.body.status).to.be.equal('success');
          done();
        });
    });
  });
  describe('GET /api/v1/users/requests', () => {
    it('should allow users authenticated to view all requests', (done) => {
      chai.request(app)
        .get(`${requestUrl}`)
        .set('token', userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.message).to.equal('request gotten successfully');
          expect(res.body.status).to.be.equal('success');
          done();
        });
    });
    it('should not allow users not authenticated to view all requests', (done) => {
      chai.request(app)
        .get(`${requestUrl}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('user authentication invalid');
          expect(res.body.status).to.be.equal('fail');
          done();
        });
    });
  });
  describe('GET /api/v1/users/requests/1', () => {
    it('should allow users authenticated to view a single request', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests/6')
        .set('token', userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.message).to.equal('single request gotten successfully');
          expect(res.body.status).to.be.equal('success');
          done();
        });
    });
    it('should not allow users not authenticated to view a single request', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests/3')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('user authentication invalid');
          expect(res.body.status).to.be.equal('fail');
          done();
        });
    });
  });
});
