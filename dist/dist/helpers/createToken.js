'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_dotenv2.default.config();
var secret = process.env.JWT_SECRET;
var oneDay = 60 * 60 * 24;

var createToken = function createToken(id) {
  return _jsonwebtoken2.default.sign({ id: id }, secret, { expiresIn: oneDay });
};

exports.default = createToken;