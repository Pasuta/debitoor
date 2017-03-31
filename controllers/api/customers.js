const _ = require('lodash');

function* getAll(next) {
  this.body =  {'data': require('../../db/customers')};
  yield next;
}

function* findById(next) {
  const customers = require('../../db/customers');
  if (_.has(customers, this.params.id)) {
    this.body = {data: customers[this.params.id]};
  } else {
    this.status = 500;
    this.type = 'json';
    this.body = {error: 'Customer with this id is not found.'};
    return;
  }
  yield next;
}

module.exports = {
  getAll,
  findById
};
