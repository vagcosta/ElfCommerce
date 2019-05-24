'user strict';

const util = require('util');

function Exception(msg) {
  this.message = msg || 'Exception';
}

Exception.prototype.getMessage = function() {
  return this.message;
};

function NoRecordFoundError(msg) {
  Exception.call(this, msg);
  this.statusCode = 404;
}

function UnauthorisedError(msg) {
  Exception.call(this, msg);
  this.statusCode = 401;
}

function BadRequestError(msg) {
  Exception.call(this, msg);
  this.statusCode = 400;
}

function InvalidModelArgumentsError(msg) {
  Exception.call(this, msg);
  this.statusCode = 400;
}

util.inherits(NoRecordFoundError, Exception);
util.inherits(UnauthorisedError, Exception);
util.inherits(BadRequestError, Exception);
util.inherits(InvalidModelArgumentsError, Exception);

module.exports = {
  NoRecordFoundError,
  UnauthorisedError,
  BadRequestError,
  InvalidModelArgumentsError,
};
