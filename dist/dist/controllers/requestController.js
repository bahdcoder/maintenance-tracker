'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

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
 * @class requestController
 *
 * @export
 *
 */

var RequestController = function () {
  function RequestController() {
    _classCallCheck(this, RequestController);
  }

  _createClass(RequestController, null, [{
    key: 'getAllRequests',

    /**
     * @description - gets all requests
     * @static
     *
     * @param {object} request - HTTP Request
     * @param {object} response - HTTP Response
     *
     * @memberof requestController
     *
     */
    value: function getAllRequests(req, res) {
      var id = req.token.id.id;

      var findRequest = 'SELECT * FROM requests WHERE user_id=' + id;
      client.query(findRequest).then(function (foundRequest) {
        if (!foundRequest.rows[0]) {
          return res.status(404).json({
            message: 'no request available',
            status: 'fail'
          });
        }
        return res.status(200).json({
          data: {
            request: foundRequest.rows
          },
          message: 'request gotten successfully',
          status: 'success'
        });
      }).catch(function (err) {
        res.status(500).send(err.message);
      });
    }
    /**
     * @description - get a single request
     * @static
     *
     * @param {object} request - HTTP Request
     * @param {object} response - HTTP Response
     *
     * @memberof requestController
     *
     */

  }, {
    key: 'getRequestById',
    value: function getRequestById(req, res) {
      var id = req.token.id.id;

      var requestId = parseInt(req.params.id, 10);
      var findRequestById = 'SELECT * FROM requests WHERE id = ' + requestId + ' AND user_id =' + id;

      client.query(findRequestById).then(function (foundRequestById) {
        if (!foundRequestById.rows[0]) {
          return res.status(404).json({
            message: 'no request available with given id',
            status: 'fail'
          });
        }
        if (foundRequestById.rows[0].user_id === id) {
          return res.status(200).json({
            data: {
              request: foundRequestById.rows[0]
            },
            message: 'single request gotten successfully',
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
     * @description - create a  request
     * @static
     *
     * @param {object} req - HTTP Request
     * @param {object} res - HTTP Response
     *
     * @memberof requestController
     *
     */

  }, {
    key: 'createRequest',
    value: function createRequest(req, res) {
      var id = req.token.id.id;
      var _req$body = req.body,
          title = _req$body.title,
          department = _req$body.department,
          equipment = _req$body.equipment,
          serialnumber = _req$body.serialnumber,
          description = _req$body.description;

      var requests = '\n    INSERT INTO requests (\n      user_id,\n      title,\n      department,\n      equipment,\n      serialnumber,\n      description\n    )\n    VALUES (\n      \'' + id + '\',\n      \'' + title + '\',\n      \'' + department + '\',\n      \'' + equipment + '\',\n      \'' + serialnumber + '\',\n      \'' + description + '\'\n    ) RETURNING *;';
      client.query(requests).then(function (newRequest) {
        return res.status(201).json({
          data: {
            request: newRequest.rows[0]
          },
          message: 'request created successfully',
          status: 'success'
        });
      }).catch(function (err) {
        res.status(500).send(err.message);
      });
    }

    /**
     * @description - update a request
     * @static
     *
     * @param {object} request - HTTP Request
     * @param {object} response - HTTP Response
     *
     * @memberof requestController
     *
     */

  }, {
    key: 'updateRequest',
    value: function updateRequest(req, res) {
      var requestId = parseInt(req.params.id, 10);
      var id = req.token.id.id;

      var findRequestById = 'SELECT * FROM requests WHERE id = ' + requestId + ' AND user_id =' + id;
      client.query(findRequestById).then(function (foundRequestById) {
        if (!foundRequestById.rows[0]) {
          return res.status(404).json({
            message: 'request with id not available',
            status: 'fail'
          });
        }
        var mergeRequestUpdateAndRequest = _extends({}, foundRequestById.rows[0], req.body);
        var title = mergeRequestUpdateAndRequest.title,
            department = mergeRequestUpdateAndRequest.department,
            equipment = mergeRequestUpdateAndRequest.equipment,
            serialnumber = mergeRequestUpdateAndRequest.serialnumber,
            description = mergeRequestUpdateAndRequest.description;

        var requestUpdate = {

          text: 'UPDATE requests SET title=$1, department=$2, equipment=$3, serialNumber=$4,description=$5 WHERE id= $6 AND user_id =$7 RETURNING *',
          values: [title, department, equipment, serialnumber, description, requestId, id]
        };
        return client.query(requestUpdate).then(function (newRequestUpdated) {
          if (newRequestUpdated.rows[0].requeststatus === 'pending') {
            res.status(200).json({
              data: {
                updatedRequest: newRequestUpdated.rows[0]
              },
              message: 'request updated successfully',
              status: 'success'
            });
          }
          res.status(403).json({
            message: 'cannot update, request is no longer pending',
            status: 'fail'
          });
        });
      }).catch(function (err) {
        res.status(500).send(err.message);
      });
    }
  }]);

  return RequestController;
}();

exports.default = RequestController;