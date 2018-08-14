'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _express2.default();

var port = process.env.PORT || 3000;
app.use((0, _cors2.default)());
app.use((0, _morgan2.default)('development'));
app.use(_bodyParser2.default.json());

app.get('/', function (request, response) {
  return response.redirect('https://app.swaggerhub.com/apis/maureen-api/Maintenance-tracker-api/1.0.0');
});

app.use(_bodyParser2.default.urlencoded({
  extended: false
}));
(0, _index2.default)(app);
app.use('/client', _express2.default.static('public'));
if (!module.parent) {
  app.listen(port);
}

app.all('*', function (req, res) {
  return res.status(404).json({
    message: 'route is invalid, please put in valid route',
    status: 'fail'
  });
});

_winston2.default.log('server is running at http://localhost:' + port);

exports.default = app;