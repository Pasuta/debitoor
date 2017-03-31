const _ = require('lodash');

function* getAll(next) {
  this.body =  {'data': require('../../db/countries')};
  yield next;
}

function* findById(next) {
  const countries = require('../../db/countries');
  if (_.has(countries, this.params.id)) {
    this.body = {data: countries[this.params.id]};
  } else {
    this.status = 500;
    this.type = 'json';
    this.body = {error: 'Country with this id is not found.'};
    return;
  }
  yield next;
}

module.exports = {
  getAll,
  findById
};
