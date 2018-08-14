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

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

_dotenv2.default.config();
var secretKey = process.env.JWT_SECRET;

/**
 * @class Authenticate User
 */

var AuthenticateUserLogin = function () {
  function AuthenticateUserLogin() {
    _classCallCheck(this, AuthenticateUserLogin);
  }

  _createClass(AuthenticateUserLogin, null, [{
    key: 'authenticateUser',

    /**
       * Authenticate Get All Requests
       *
       * @param {Object} request
       * @param {Object} response
       *
       * @param {Function} next
       *
       * @return {Object}
       */
    value: function authenticateUser(req, res, next) {
      try {
        var token = req.headers['x-access'] || req.headers.token || req.query.token;
        var verifiedToken = _jsonwebtoken2.default.verify(token, secretKey);
        req.token = verifiedToken;
        return next();
      } catch (error) {
        return res.status(401).json({
          status: 'fail',
          message: 'user authentication invalid'
        });
      }
    }
    /**
       * check Admin role
       *
       * @param {Object} request
       * @param {Object} response
       *
       * @param {Function} next
       *
       * @return {Object}
       */

  }, {
    key: 'authenticateAdmin',
    value: function authenticateAdmin(req, res, next) {
      try {
        var token = req.headers['x-access'] || req.headers.token || req.query.token;
        var verifiedToken = _jsonwebtoken2.default.verify(token, secretKey);
        req.token = verifiedToken;
        if (req.token.id.role !== 'admin') {
          return res.status(403).json({
            message: 'user not authenticated to view this resource ',
            status: 'fail'
          });
        }return next();
      } catch (error) {
        return res.status(401).json({
          status: 'fail',
          message: 'user authentication invalid'
        });
      }
    }
  }]);

  return AuthenticateUserLogin;
}();

exports.default = AuthenticateUserLogin;