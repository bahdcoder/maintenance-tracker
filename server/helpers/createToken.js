import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const secret = process.env.JWT_SECRET;
const oneDay = 60 * 60 * 24;

const createToken = id => jwt.sign(
  { id },
  secret,
  { expiresIn: oneDay },
);

export default createToken;

