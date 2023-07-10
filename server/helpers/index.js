const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const comparePassword = (password, hashed) => {
  return bcrypt.compareSync(password, hashed);
};

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const getToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
};

module.exports = { comparePassword, hashPassword, getToken, verifyToken };
