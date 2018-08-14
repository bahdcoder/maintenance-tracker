'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _pg = require('pg');

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var config = void 0;
if (process.env.NODE_ENV === 'development') {
  config = _config2.default.development;
} else if (process.env.NODE_ENV === 'test') {
  config = _config2.default.test;
} else {
  config = process.env.DATABASE_URL;
}

var client = new _pg.Client(config);
client.connect();
client.query(_database2.default, function (error) {
  console.log(error);
  client.end();
});