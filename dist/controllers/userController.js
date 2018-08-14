'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _connection = require('../helpers/connection');

var _connection2 = _interopRequireDefault(_connection);

var _createToken = require('../helpers/createToken');

var _createToken2 = _interopRequireDefault(_createToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var client = (0, _connection2.default)();
client.connect();

/**
 * @class userController
 *
 * @export
 *
 */

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'signupUser',

    /**
     * @description - Creates a new user
     * @static
     *
     * @param {object} request - HTTP Request
     * @param {object} response- HTTP Response
     *
     * @memberof userController
     *
     */
    value: function signupUser(req, res) {
      var password = _bcrypt2.default.hashSync(req.body.password.trim(), 10);
      var _req$body = req.body,
          name = _req$body.name,
          email = _req$body.email;


      var user = '\n    INSERT INTO users (\n      name,\n      email,\n      password\n    )\n    VALUES (\n      \'' + name + '\',\n      \'' + email + '\',\n      \'' + password + '\'\n    ) RETURNING *;';
      client.query(user).then(function (newUser) {
        var token = (0, _createToken2.default)(newUser.rows[0]);
        return res.status(201).json({
          data: {
            user: {
              id: newUser.rows[0].id,
              name: name,
              email: email,
              role: newUser.rows[0].role
            },
            token: token
          },
          message: 'user created successfully',
          status: 'success'
        });
      }).catch(function (err) {
        res.status(500).send(err);
      });
    }
    /**
    * @description - logs in a user
     * @static
     *
     * @param {object} request - HTTP Request
     * @param {object} response - HTTP Response
     *
     * @memberof userController
     *
     */

  }, {
    key: 'signinUser',
    value: function signinUser(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      var findUser = 'SELECT * FROM users WHERE  email = \'' + email + '\'';
      client.query(findUser).then(function (foundUser) {
        if (!foundUser.rows[0]) {
          return res.status(404).json({
            message: 'user does not exist',
            status: 'fail'
          });
        }
        if (!_bcrypt2.default.compareSync(password.trim(), foundUser.rows[0].password)) {
          return res.status(401).json({
            message: 'please try again, password or email is incorrect',
            status: 'fail'
          });
        }
        var token = (0, _createToken2.default)(foundUser.rows[0]);
        return res.status(200).json({
          data: {
            user: {
              id: foundUser.rows[0].id,
              name: foundUser.rows[0].name,
              email: email,
              role: foundUser.rows[0].role
            },
            token: token
          },
          message: 'user logged in successfully',
          status: 'success'
        });
      }).catch(function (err) {
        res.status(500).send(err);
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;