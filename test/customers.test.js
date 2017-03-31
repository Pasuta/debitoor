const app = require('../app');
const request = require('supertest').agent(app.listen());
const should = require('should');
const chai = require('chai');
const expect = chai.expect;

describe('Test suit customer', function () {

  describe('GET /customers', function () {
    it('should return all customers', function (done) {
      request
        .get('/api/customers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);

          const customers = res.body.data;

          expect(customers).should.not.be.empty();
          customers.should.have.property('201');

          const customer = customers['201'];
          customer.should.have.property('name');
          customer.should.have.property('age');

          done(err);
        });
    });
  });

  describe('GET /customers/201', function () {
    it('should return current customers', function (done) {
      request
        .get('/api/customers/201')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);

          const customer = res.body.data;

          expect(customer).should.not.be.empty();
          customer.should.have.property('name');
          customer.should.have.property('age');
          customer.name.should.be.eql('Alan');
          customer.age.should.be.eql('32');

          done(err);
        });
    });
  });

  describe('GET /customers/500', function () {
    it('should return current customers', function (done) {
      request
        .get('/api/customers/500')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end((err, res) => {
          should.not.exist(err);
          const body = res.body;
          body.should.have.property('error');
          body.error.should.be.eql('Customer with this id is not found.');

          done(err);
        });
    });
  });

});
