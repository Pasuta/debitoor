const app = require('../app');
const request = require('supertest').agent(app.listen());
const should = require('should');
const chai = require('chai');
const expect = chai.expect;

describe('Test suit country', function () {

  describe('GET /countries', function () {
    it('should return all countries', function (done) {
      request
        .get('/api/countries')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);

          const countries = res.body.data;

          expect(countries).should.not.be.empty();
          countries.should.have.property('301');

          const country = countries['301'];
          country.should.have.property('name');

          done(err);
        });
    });
  });

  describe('GET /countries/301', function () {
    it('should return current countries', function (done) {
      request
        .get('/api/countries/301')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);

          const country = res.body.data;

          expect(country).should.not.be.empty();
          country.should.have.property('name');
          country.name.should.be.eql('Poland');

          done(err);
        });
    });
  });

  describe('GET /countries/500', function () {
    it('should return current countries', function (done) {
      request
        .get('/api/countries/500')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end((err, res) => {
          should.not.exist(err);
          const body = res.body;
          body.should.have.property('error');
          body.error.should.be.eql('Country with this id is not found.');

          done(err);
        });
    });
  });

});
