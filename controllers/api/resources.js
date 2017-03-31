const _ = require('lodash');
const Promise = require('bluebird');
const request = require('request');

module.exports = function*(next) {
  const query = this.query;
  const host = this.req.headers.host;
  const queries = [];
  const result = {};

  _.forEach(query, (url, resource) => queries.push(requestStream(`http://${host}/${url}`, resource, result)));

  yield Promise.all(queries);
  this.type = 'json';
  this.body = result;
  yield next;
};

function requestStream(url, resource, result) {
  return new Promise(function (resolve, reject) {
    request.get({url})
      .on('response', function (res) {
        if (res.statusCode !== 200) {
          result[resource] = {
            error: res.statusMessage,
            statusCode: res.statusCode
          };
        }
      })
      .on('error', reject)
      .on('data', data => {
        try {
          result[resource] = JSON.parse(data);
        } catch (e) {
          resolve(e);
        }
      })
      .on('end', resolve);
  });
}

