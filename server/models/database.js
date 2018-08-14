import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


dotenv.config();

const hashedPassword = bcrypt.hashSync(process.env.H_PASSWORD, 10);
const userSeed = `
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS status;
CREATE TYPE status AS ENUM('user','admin');
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role status DEFAULT 'user');
INSERT INTO users(name,email,password,role)
VALUES ('mena','mena@gmail.com','${hashedPassword}','admin');`;


const requestSeed = `
DROP TABLE IF EXISTS requests CASCADE;
DROP TYPE IF EXISTS request_status;
CREATE TYPE request_status AS ENUM('pending','approved','disapproved','resolved');
CREATE TABLE requests(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title VARCHAR(50) NOT NULL,
  department VARCHAR(50) NOT NULL,
  equipment VARCHAR(50) NOT NULL,
  serialnumber VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  requeststatus request_status DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id));
INSERT INTO requests(
  user_id,
  title,
  department,
  equipment,
  serialnumber,
  description)
VALUES (1, 'bad computer', 'technical', 'computer', 00000004, 'faulty battery');
INSERT INTO requests(
  user_id,
  title,
  department,
  equipment,
  serialnumber,
  description)
VALUES (1, 'bad computer', 'technical', 'computer', 00000005, 'faulty battery');
INSERT INTO requests(
  user_id,
  title,
  department,
  equipment,
  serialnumber,
  description,
  requeststatus)
VALUES (1, 'bad computer', 'technical', 'computer', 00000007, 'faulty battery', 'approved');
INSERT INTO requests(
  user_id,
  title,
  department,
  equipment,
  serialnumber,
  description,
  requeststatus)
VALUES (1, 'bad computer', 'technical', 'computer', 00000008, 'faulty battery', 'disapproved');
INSERT INTO requests(
  user_id,
  title,
  department,
  equipment,
  serialnumber,
  description,
  requeststatus)
VALUES (1, 'bad computer', 'technical', 'computer', 00000009, 'faulty battery', 'resolved');`;


const queries = `${userSeed}${requestSeed}`;

export default queries;
