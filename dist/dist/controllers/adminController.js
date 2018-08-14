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
 * @class adminController
 *
 * @export
 *
 */

var AdminController = function () {
  function AdminController() {
    _classCallCheck(this, AdminController);
  }

  _createClass(AdminController, null, [{
    key: 'adminGetAllRequests',

    /**
     * @description -  admin gets all requests
     * @static
     *
     * @param {object} request - HTTP Request
     * @param {object} response - HTTP Response
     *
     * @memberof requestController
     *
     */
    value: function adminGetAllRequests(req, res) {
      var allrequests = 'SELECT  users.id AS userId, users.name AS user, requests.id AS requestId, requests.title, requests.department,requests.equipment,requests.serialNumber,requests.description,requests.requestStatus FROM requests INNER JOIN users ON requests.user_id = users.id';
      client.query(allrequests).then(function (foundAllRequests) {
        res.status(200).json({
          data: {
            request: foundAllRequests.rows
          },
          message: 'all request gotten successfully',
          status: 'success'
        });
      }).catch(function (err) {
        res.status(500).send(err.message);
      });
    }
    /**
     * @description - get a single user request
     * @static
     *
     * @param {object} request - HTTP Request
     * @param {object} response - HTTP Response
     *
     * @memberof requestController
     *
     */

  }, {
    key: 'getUserRequestById',
    value: function getUserRequestById(req, res) {
      var id = req.token.id.id;

      var requestId = parseInt(req.params.id, 10);
      var findRequestById = 'SELECT * FROM requests WHERE id = ' + requestId;

      client.query(findRequestById).then(function (foundRequestById) {
        if (!foundRequestById.rows[0]) {
          return res.status(404).json({
            message: 'no request available with given id',
            status: 'fail'
          });
        }
        if (foundRequestById.rows[0]) {
          return res.status(200).json({
            data: {
              request: foundRequestById.rows[0]
            },
            message: 'user request gotten successfully',
            status: 'success'
          });
        }
        return res.status(403).json({
          message: 'request cannot be viewed by you',
          status: 'fail'
        });
      }).catch(function (err) {
        res.status(500).send(err.message);
      });
    }
    /**
     * @description -  admin approve requests
     * @static
     * @param {object} response - HTTP Response
     *
     * @memberof requestController
     *
     */

  }, {
    key: 'approveRequests',
    value: function approveRequests(req, res, done) {
      var requestId = parseInt(req.params.id, 10);
      var request = req.foundRequest;
      if (request.foundRequest.requeststatus === 'resolved') {
        res.status(403).json({
          message: 'you cannot approve, request is already resolved.',
          status: 'fail'
        });
        return done();
      } else if (request.foundRequest.requeststatus === 'approved') {
        res.status(403).json({
          message: 'you cannot approve, request is already approved.',
          status: 'fail'
        });
        return done();
      }
      var approveRequests = {
        text: 'UPDATE requests SET requeststatus=$1 WHERE id =$2 RETURNING *',
        values: ['approved', requestId]
      };

      return client.query(approveRequests).then(function (approvedRequest) {
        res.status(200).json({
          data: {
            request: approvedRequest.rows[0]
          },
          message: 'request approved successfully',
          status: 'success'
        });
      }).catch(function (err) {
        res.status(500).send(err.message);
      });
    }
    /**
     * @description -  admin disapprove requests
     * @static
     *
     * @param {object} request - HTTP Request
     * @param {object} response - HTTP Response
     *
     * @memberof requestController
     *
     */

  }, {
    key: 'disapproveRequests',
    value: function disapproveRequests(req, res, done) {
      var requestId = parseInt(req.params.id, 10);
      var request = req.foundRequest;
      if (request.foundRequest.requeststatus === 'disapproved') {
        res.status(403).json({
          message: 'you cannot disapprove, request is already disapproved',
          status: 'fail'
        });
        return done();
      } else if (request.foundRequest.requeststatus === 'resolved') {
        res.status(403).json({
          message: 'you cannot disapprove, request is already resolved',
          status: 'fail'
        });
        return done();
      }
      var disapproveRequest = {
        text: 'UPDATE requests SET requeststatus=$1 WHERE id =$2 RETURNING *',
        values: ['disapproved', requestId]
      };

      return client.query(disapproveRequest).then(function (disapprovedRequest) {
        res.status(200).json({
          data: {
            request: disapprovedRequest.rows[0]
          },
          message: 'request disapproved successfully',
          status: 'success'
        });
      }).catch(function (err) {
        res.status(500).send(err.message);
      });
    }
    /**
     * @description -  admin resolve requests
     * @static
     *
     * @param {object} request - HTTP Request
     * @param {object} response - HTTP Response
     *
     * @memberof requestController
     *
     */

  }, {
    key: 'resolveRequests',
    value: function resolveRequests(req, res, done) {
      var requestId = parseInt(req.params.id, 10);
      var request = req.foundRequest;
      if (request.foundRequest.requeststatus !== 'approved') {
        res.status(403).json({
          message: 'Unapproved request cannot be resolved',
          status: 'fail'
        });
        return done();
      }
      var resolvedRequest = {
        text: 'UPDATE requests SET requeststatus=$1 WHERE id =$2 RETURNING *',
        values: ['resolved', requestId]
      };

      return client.query(resolvedRequest).then(function (resolvedRequests) {
        res.status(200).json({
          data: {
            request: resolvedRequests.rows[0]
          },
          message: 'request resolved successfully',
          status: 'success'
        });
      }).catch(function (err) {
        res.status(500).send(err.message);
      });
    }
  }]);

  return AdminController;
}();

exports.default = AdminController;