const app = require('../app');
const request = require('supertest').agent(app.listen());
const should = require('should');
const chai = require('chai');
const expect = chai.expect;

describe('Test suit resources', function () {

  describe('GET resources?users=api/users&customers=api/customers&countries=api/countries', function () {
    it('should return full data response', function (done) {
      request
        .get('/api/resources?users=api/users&customers=api/customers&countries=api/countries')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          const data = res.body;
          expect(data).should.not.be.empty();
          data.should.have.property('users');
          data.should.have.property('customers');
          data.should.have.property('countries');

          const users = data.users;
          users.should.have.property('data');
          users.should.not.have.property('error');

          const customers = data.customers;
          customers.should.have.property('data');
          customers.should.not.have.property('error');

          const countries = data.countries;
          countries.should.have.property('data');
          countries.should.not.have.property('error');

          done(err);
        });
    });
  });

  describe('GET resources?users=api/users/301&customers=api/x&countries=api/countries', function () {
    it('should return correct response', function (done) {
      request
        .get('/api/resources?users=api/users/301&customers=api/x&countries=api/countries/301')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          const data = res.body;
          expect(data).should.not.be.empty();

          const users = data.users;
          users.should.have.property('error');
          users.error.should.be.eql('User with this id is not found.');

          const customers = data.customers;
          customers.should.have.property('error');
          customers.error.should.be.eql('Not Found');
          customers.should.have.property('statusCode');
          customers.statusCode.should.be.eql(404);

          const countries = data.countries;
          countries.should.have.property('data');
          countries.should.not.have.property('error');

          done(err);
        });
    });
  });

});
