'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validatorjs = require('validatorjs');

var _validatorjs2 = _interopRequireDefault(_validatorjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Validate User SIgn In and Sign Up input
 */
var ValidateUser = function () {
  function ValidateUser() {
    _classCallCheck(this, ValidateUser);
  }

  _createClass(ValidateUser, null, [{
    key: 'validateSigninInput',

    /**
     * validate user sign in input string
     *
     * @param {Object} request
     * @param {Object} response
     *
     * @param {Function} next
     *
     * @return {Object}
     */
    value: function validateSigninInput(req, res, next) {
      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;

      var data = {
        email: email,
        password: password

      };

      var rules = {
        email: 'required|email|string',
        password: 'required|min:8|max:10|string'
      };

      var validations = new _validatorjs2.default(data, rules, {
        'min.passowrd': 'The :attribute must not be less than 8 characters.',
        'max.password': 'The :attribute must not be greater than 30 characters.'
      });

      if (validations.passes()) {
        return next();
      }

      return res.status(406).json({
        status: 'fail',
        data: {
          errors: validations.errors.all()
        }
      });
    }

    /**
     * validate user sign up input string
     *
     * @param {Object} request
     * @param {Object} response
     * @param {Function} next
     *
     * @return {Object}
     */

  }, {
    key: 'validateSignupInput',
    value: function validateSignupInput(req, res, next) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password,
          name = _req$body2.name;

      var data = {
        email: email,
        password: password,
        name: name
      };

      var rules = {
        name: ['required', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i', 'min:3', 'max:15', 'string'],
        email: 'required|email|string',
        password: 'required|min:8|max:30|string'
      };

      var validations = new _validatorjs2.default(data, rules, {
        'min.password': 'The :attribute must not be less than 8 characters.',
        'max.password': 'The :attribute must not be greater than 30 characters.',
        'min.name': 'The :attribute must not be less than 3 characters.',
        'max.name': 'The :attribute must not be greater than 15 characters.'
      });

      if (validations.passes()) {
        return next();
      }

      return res.status(406).json({
        status: 'fail',
        data: {
          errors: validations.errors.all()
        }
      });
    }
  }]);

  return ValidateUser;
}();

exports.default = ValidateUser;