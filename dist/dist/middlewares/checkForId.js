'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../helpers/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var client = (0, _connection2.default)();
client.connect();

var findRequestById = function findRequestById(req, res, next) {
  var requestId = parseInt(req.params.id, 10);
  var findRequest = 'SELECT * FROM requests WHERE id = \'' + requestId + '\'';
  client.query(findRequest).then(function (foundRequest) {
    if (!foundRequest.rows[0]) {
      return res.status(404).json({
        message: 'request with id not available',
        status: 'fail'
      });
    }req.foundRequest = { foundRequest: foundRequest.rows[0] };
    return next();
  }).catch(function (err) {
    res.status(500).send(err.message);
  });
};
exports.default = findRequestById;