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
 * @class Validate Request
 */
var ValidateRequest = function () {
  function ValidateRequest() {
    _classCallCheck(this, ValidateRequest);
  }

  _createClass(ValidateRequest, null, [{
    key: 'vallidateRequest',

    /**
     * validate Request input length
     * @param {Object} request
     * @param {Object} response
     *
     *  @param {Function} next
     *
     *  @return {Object}
     */
    value: function vallidateRequest(req, res, next) {
      var _req$body = req.body,
          title = _req$body.title,
          department = _req$body.department,
          equipment = _req$body.equipment,
          serialnumber = _req$body.serialnumber,
          description = _req$body.description;


      var data = {
        title: title,
        department: department,
        equipment: equipment,
        serialnumber: serialnumber,
        description: description
      };

      var rules = {
        title: ['required', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i', 'min:5', 'max:20'],
        department: ['required', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i'],
        equipment: ['required', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i'],
        serialnumber: ['required', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i', 'min:8', 'max:8'],
        description: ['required', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i', 'min:3', 'max:50']
      };

      var validations = new _validatorjs2.default(data, rules, {
        'min.title': 'The :attribute must not be less than 5 characters.',
        'max.title': 'The :attribute must not be greater than 20 characters.',
        'min.serialnumber': 'The :attribute must be only 8 characters.',
        'max.serialnumber': 'The :attribute must be only 8 characters.',
        'min.description': 'The :attribute must not be less than 3 characters.',
        'max.description': 'The :attribute must not be greater than 50 characters.'
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
       * validate Request input length
       * @param {Object} request
       * @param {Object} response
       *
       *  @param {Function} next
       *
       *  @return {Object}
       */

  }, {
    key: 'vallidateUpdateRequest',
    value: function vallidateUpdateRequest(request, response, next) {
      var _request$body = request.body,
          title = _request$body.title,
          department = _request$body.department,
          equipment = _request$body.equipment,
          serialnumber = _request$body.serialnumber,
          description = _request$body.description;


      if (!title && !department && !equipment && !serialnumber && !description) {
        response.status(406).json({
          status: 'fail',
          message: 'field to be updated required'
        });
      }

      var data = {
        title: title,
        department: department,
        equipment: equipment,
        serialnumber: serialnumber,
        description: description
      };

      var rules = {
        title: ['required_with:title', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i'],
        department: ['required_with:department', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i'],
        equipment: ['required_with:equipment', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i'],
        serialnumber: ['required_with:serialnumber', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i', 'min:8', 'max:8'],
        description: ['required_with:description', 'required_with:description', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i', 'min:3', 'max:50']
      };

      var validations = new _validatorjs2.default(data, rules);

      if (validations.passes()) {
        return next();
      }

      return response.status(406).json({
        status: 'fail',
        data: {
          errors: validations.errors.all()
        }
      });
    }
    /**
     * validate Request id parameter
     * @param {Object} req
     * @param {Object} res
     *
     * @param {Function} next
     *
     * @return {Object} json
     */

  }, {
    key: 'idIsNumber',
    value: function idIsNumber(req, res, next) {
      var id = req.params.id;


      var data = {
        id: id
      };
      var rules = {
        id: ['required', 'integer']
      };
      var validations = new _validatorjs2.default(data, rules);

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

  return ValidateRequest;
}();

exports.default = ValidateRequest;