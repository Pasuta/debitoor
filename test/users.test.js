const app = require('../app');
const request = require('supertest').agent(app.listen());
const should = require('should');
const chai = require('chai');
const expect = chai.expect;

describe('Test suit user', function () {

  describe('GET /users', function () {
    it('should return all users', function (done) {
      request
        .get('/api/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);

          const users = res.body.data;

          expect(users).should.not.be.empty();
          users.should.have.property('101');

          const user = users['101'];
          user.should.have.property('name');
          user.should.have.property('age');

          done(err);
        });
    });
  });

  describe('GET /users/101', function () {
    it('should return current users', function (done) {
      request
        .get('/api/users/101')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);

          const user = res.body.data;

          expect(user).should.not.be.empty();
          user.should.have.property('name');
          user.should.have.property('age');
          user.name.should.be.eql('John');
          user.age.should.be.eql('22');

          done(err);
        });
    });
  });

  describe('GET /users/500', function () {
    it('should return current users', function (done) {
      request
        .get('/api/users/500')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end((err, res) => {
          should.not.exist(err);
          const body = res.body;
          body.should.have.property('error');
          body.error.should.be.eql('User with this id is not found.');

          done(err);
        });
    });
  });

});
