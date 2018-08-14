'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adminController = require('../controllers/adminController');

var _adminController2 = _interopRequireDefault(_adminController);

var _authenticateLogin = require('../middlewares/authenticateLogin');

var _authenticateLogin2 = _interopRequireDefault(_authenticateLogin);

var _checkDuplicateRequest = require('../middlewares/checkDuplicateRequest');

var _checkDuplicateRequest2 = _interopRequireDefault(_checkDuplicateRequest);

var _checkForId = require('../middlewares/checkForId');

var _checkForId2 = _interopRequireDefault(_checkForId);

var _requestController = require('../controllers/requestController');

var _requestController2 = _interopRequireDefault(_requestController);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _checkEmail = require('../middlewares/checkEmail');

var _checkEmail2 = _interopRequireDefault(_checkEmail);

var _userValidations = require('../middlewares/userValidations');

var _userValidations2 = _interopRequireDefault(_userValidations);

var _requestValidations = require('../middlewares/requestValidations');

var _requestValidations2 = _interopRequireDefault(_requestValidations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = function routes(app) {
  app.get('/', function (req, res) {
    res.status(200).send('Welcome to Maintenance Tracker API');
  });
  app.post('/api/v1/auth/signup', _checkEmail2.default.checkEmail, _userValidations2.default.validateSignupInput, _userController2.default.signupUser);
  app.post('/api/v1/auth/login', _userValidations2.default.validateSigninInput, _userController2.default.signinUser);
  app.get('/api/v1/users/requests', _authenticateLogin2.default.authenticateUser, _requestController2.default.getAllRequests);
  app.get('/api/v1/users/requests/:id', _authenticateLogin2.default.authenticateUser, _requestValidations2.default.idIsNumber, _requestController2.default.getRequestById);
  app.post('/api/v1/users/requests', _authenticateLogin2.default.authenticateUser, _checkDuplicateRequest2.default.checkDuplicate, _requestValidations2.default.vallidateRequest, _requestController2.default.createRequest);
  app.put('/api/v1/users/requests/:id', _authenticateLogin2.default.authenticateUser, _requestValidations2.default.idIsNumber, _checkDuplicateRequest2.default.checkDuplicate, _requestValidations2.default.vallidateUpdateRequest, _requestController2.default.updateRequest);
  app.get('/api/v1/requests/', _authenticateLogin2.default.authenticateAdmin, _adminController2.default.adminGetAllRequests);
  app.get('/api/v1/requests/:id', _authenticateLogin2.default.authenticateAdmin, _adminController2.default.getUserRequestById);
  app.put('/api/v1/requests/:id/approve', _authenticateLogin2.default.authenticateAdmin, _requestValidations2.default.idIsNumber, _checkForId2.default, _adminController2.default.approveRequests);
  app.put('/api/v1/requests/:id/disapprove', _authenticateLogin2.default.authenticateAdmin, _requestValidations2.default.idIsNumber, _checkForId2.default, _adminController2.default.disapproveRequests);
  app.put('/api/v1/requests/:id/resolve', _authenticateLogin2.default.authenticateAdmin, _requestValidations2.default.idIsNumber, _checkForId2.default, _adminController2.default.resolveRequests);
};
exports.default = routes;