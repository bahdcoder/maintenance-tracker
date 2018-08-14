'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var hashedPassword = _bcrypt2.default.hashSync(process.env.H_PASSWORD, 10);
var userSeed = '\nDROP TABLE IF EXISTS users CASCADE;\nDROP TYPE IF EXISTS status;\nCREATE TYPE status AS ENUM(\'user\',\'admin\');\nCREATE TABLE users(\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(50) NOT NULL,\n  email VARCHAR(50) NOT NULL,\n  password VARCHAR(255) NOT NULL,\n  role status DEFAULT \'user\');\nINSERT INTO users(name,email,password,role)\nVALUES (\'mena\',\'mena@gmail.com\',\'' + hashedPassword + '\',\'admin\');';

var requestSeed = '\nDROP TABLE IF EXISTS requests CASCADE;\nDROP TYPE IF EXISTS request_status;\nCREATE TYPE request_status AS ENUM(\'pending\',\'approved\',\'disapproved\',\'resolved\');\nCREATE TABLE requests(\n  id SERIAL PRIMARY KEY,\n  user_id INTEGER NOT NULL,\n  title VARCHAR(50) NOT NULL,\n  department VARCHAR(50) NOT NULL,\n  equipment VARCHAR(50) NOT NULL,\n  serialnumber VARCHAR(50) NOT NULL,\n  description VARCHAR(255) NOT NULL,\n  requeststatus request_status DEFAULT \'pending\',\n  FOREIGN KEY (user_id) REFERENCES users(id));\nINSERT INTO requests(\n  user_id,\n  title,\n  department,\n  equipment,\n  serialnumber,\n  description)\nVALUES (1, \'bad computer\', \'technical\', \'computer\', 00000004, \'faulty battery\');\nINSERT INTO requests(\n  user_id,\n  title,\n  department,\n  equipment,\n  serialnumber,\n  description)\nVALUES (1, \'bad computer\', \'technical\', \'computer\', 00000005, \'faulty battery\');\nINSERT INTO requests(\n  user_id,\n  title,\n  department,\n  equipment,\n  serialnumber,\n  description,\n  requeststatus)\nVALUES (1, \'bad computer\', \'technical\', \'computer\', 00000007, \'faulty battery\', \'approved\');\nINSERT INTO requests(\n  user_id,\n  title,\n  department,\n  equipment,\n  serialnumber,\n  description,\n  requeststatus)\nVALUES (1, \'bad computer\', \'technical\', \'computer\', 00000008, \'faulty battery\', \'disapproved\');\nINSERT INTO requests(\n  user_id,\n  title,\n  department,\n  equipment,\n  serialnumber,\n  description,\n  requeststatus)\nVALUES (1, \'bad computer\', \'technical\', \'computer\', 00000009, \'faulty battery\', \'resolved\');';

var queries = '' + userSeed + requestSeed;

exports.default = queries;