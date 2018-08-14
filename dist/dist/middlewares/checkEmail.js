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
 * @class Validate User Email
 */

var ValidateUserEmail = function () {
  function ValidateUserEmail() {
    _classCallCheck(this, ValidateUserEmail);
  }

  _createClass(ValidateUserEmail, null, [{
    key: 'checkEmail',

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
    value: function checkEmail(req, res, done) {
      var email = req.body.email;

      var mailCheck = '\n      SELECT * FROM users WHERE email = \'' + email + '\'';
      client.query(mailCheck).then(function (foundEmail) {
        if (foundEmail.rows[0]) {
          return res.status(409).json({
            message: 'email already exists',
            status: 'fail'
          });
        }
        return done();
      }).catch(function (err) {
        res.status(500).send(err.message);
      });
    }
  }]);

  return ValidateUserEmail;
}();

exports.default = ValidateUserEmail;