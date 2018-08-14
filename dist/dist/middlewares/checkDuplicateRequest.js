'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _connection = require('../helpers/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var client = (0, _connection2.default)();
client.connect();

/**
 * @class Validate User request
 */

var checkDuplicate = function () {
  function checkDuplicate() {
    _classCallCheck(this, checkDuplicate);
  }

  _createClass(checkDuplicate, null, [{
    key: 'checkDuplicate',

    /**
       * validate Request input string
       *
       * @param {Object} request
       * @param {Object} response
       *
       * @param {Function} done
       *
       * @return {Object}
       */

    value: function checkDuplicate(req, res, done) {
      var userId = req.token.id.id;

      var _req$body = req.body,
          title = _req$body.title,
          department = _req$body.department,
          equipment = _req$body.equipment,
          serialnumber = _req$body.serialnumber,
          description = _req$body.description;

      var checkRequestDuplicate = {
        text: 'SELECT * FROM requests WHERE title = $1 AND department =$2  AND equipment =$3 AND serialnumber = $4 AND description = $5 AND user_id = $6',
        values: [title, department, equipment, serialnumber, description, userId]
      };
      client.query(checkRequestDuplicate).then(function (checkRequestDuplicates) {
        if (checkRequestDuplicates.rows[0]) {
          return res.status(409).json({
            message: 'request already exists',
            status: 'fail'
          });
        }return done();
      }).catch(function (err) {
        res.status(500).send(err.message);
      });
    }
  }]);

  return checkDuplicate;
}();

exports.default = checkDuplicate;