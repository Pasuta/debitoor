const _ = require('lodash');

function* getAll(next) {
  this.body = {'data': require('../../db/users')};
  yield next;
}

function* findById(next) {
  const users = require('../../db/users');
  if (_.has(users, this.params.id)) {
    this.body =  {'data': users[this.params.id]};
  } else {
    this.status = 500;
    this.type = 'json';
    this.body = {error: 'User with this id is not found.'};
    return;
  }
  yield next;
}

module.exports = {
  getAll,
  findById
};
