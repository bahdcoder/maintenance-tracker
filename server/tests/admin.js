import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

let userToken;
const adminUrl = '/api/v1/requests';
const userSignin = '/api/v1/auth/login';
const seededAdmin = {
  email: 'mena@gmail.com',
  password: 'mena1234',
};

describe('ADMIN CONTROLLER', () => {
  before((done) => {
    chai.request(app)
      .post(`${userSignin}`)
      .send(seededAdmin)
      .end((err, res) => {
        userToken = res.body.data.token;
        done();
      });
  });
  describe('GET /api/v1/requests', () => {
    it('should allow authenticated admin to view all requests', (done) => {
      chai.request(app)
        .get(`${adminUrl}`)
        .set('token', userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('request');
          expect(res.body.message).to.equal('all request gotten successfully');
          expect(res.body.status).to.be.equal('success');
          done();
        });
    });
    it('should not allow users not authenticated to view all requests', (done) => {
      chai.request(app)
        .get(`${adminUrl}`)
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
    it('should allow authenticated admin to view a single request', (done) => {
      chai.request(app)
        .get('/api/v1/requests/1')
        .set('token', userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.message).to.equal('user request gotten successfully');
          expect(res.body.status).to.be.equal('success');
          done();
        });
    });
    it('should not allow admin not authenticated to view a single request', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests/1')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('user authentication invalid');
          expect(res.body.status).to.be.equal('fail');
          done();
        });
    });
  });
  describe('PUT /api/v1/requests/:id/approve', () => {
    it('should allow an authenticated admin to approve a request', (done) => {
      chai.request(app)
        .put('/api/v1/requests/1/approve')
        .set('token', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('request');
          expect(res.body.message).to.equal('request approved successfully');
          expect(res.body.status).to.be.equal('success');
          done();
        });
    });
    it('should not allow non admin to approve request', (done) => {
      chai.request(app)
        .put('/api/v1/requests/1/approve')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('user authentication invalid');
          expect(res.body.status).to.be.equal('fail');
          done();
        });
    });
    it('should not update a particular id that is not a number', (done) => {
      chai.request(app)
        .put('/api/v1/requests/nki/approve')
        .set('token', userToken)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body).to.be.an('object');
          expect(res.body.data.errors.id)
            .to.include('The id must be an integer.');
          done();
        });
    });
    it('should not aprrove a request that is already resolved', (done) => {
      chai.request(app)
        .put('/api/v1/requests/5/approve')
        .set('token', userToken)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('you cannot approve, request is already resolved.');
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should not aprrove a request that is already approved', (done) => {
      chai.request(app)
        .put('/api/v1/requests/3/approve')
        .set('token', userToken)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('you cannot approve, request is already approved.');
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should aprrove a request that is pending', (done) => {
      chai.request(app)
        .put('/api/v1/requests/2/approve')
        .set('token', userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('request approved successfully');
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should aprrove a request that is disapproved', (done) => {
      chai.request(app)
        .put('/api/v1/requests/4/approve')
        .set('token', userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('request approved successfully');
          expect(res.body.status).to.equal('success');
          done();
        });
    });
  });
  describe('PUT /api/v1/requests/:id/disapprove', () => {
    it('should not allow non admin to disapprove request', (done) => {
      chai.request(app)
        .put('/api/v1/requests/1/disapprove')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('user authentication invalid');
          expect(res.body.status).to.be.equal('fail');
          done();
        });
    });
    it('should not disapprove a particular id that is not a number', (done) => {
      chai.request(app)
        .put('/api/v1/requests/nki/approve')
        .set('token', userToken)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body).to.be.an('object');
          expect(res.body.data.errors.id)
            .to.include('The id must be an integer.');
          done();
        });
    });
    it('should allow an authenticated admin to disapprove a request', (done) => {
      chai.request(app)
        .put('/api/v1/requests/2/disapprove')
        .set('token', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('request');
          expect(res.body.message).to.equal('request disapproved successfully');
          expect(res.body.status).to.be.equal('success');
          done();
        });
    });
    it('should not disaprrove a request that is resolved', (done) => {
      chai.request(app)
        .put('/api/v1/requests/5/disapprove')
        .set('token', userToken)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('you cannot disapprove, request is already resolved');
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should disaprrove a request that is pending', (done) => {
      chai.request(app)
        .put('/api/v1/requests/3/disapprove')
        .set('token', userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('request disapproved successfully');
          expect(res.body.status).to.equal('success');
          done();
        });
    });
  });
  describe('PUT /api/v1/requests/:id/resolve', () => {
    it('should not allow non admin to resolve request', (done) => {
      chai.request(app)
        .put('/api/v1/requests/1/resolve')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('user authentication invalid');
          expect(res.body.status).to.be.equal('fail');
          done();
        });
    });
    it('should not reslove a particular id that is not a number', (done) => {
      chai.request(app)
        .put('/api/v1/requests/nki/resolve')
        .set('token', userToken)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body).to.be.an('object');
          expect(res.body.data.errors.id)
            .to.include('The id must be an integer.');
          done();
        });
    });
    it('should allow an authenticated admin to resolve a request', (done) => {
      chai.request(app)
        .put('/api/v1/requests/1/resolve')
        .set('token', userToken)
        .end((err, res) => {
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
  it('should not resolve a request that is disapproved', (done) => {
    chai.request(app)
      .put('/api/v1/requests/4/resolve')
      .set('token', userToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Unapproved request cannot be resolved');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('should not resolve a request that is resolved', (done) => {
    chai.request(app)
      .put('/api/v1/requests/5/resolve')
      .set('token', userToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Unapproved request cannot be resolved');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});
