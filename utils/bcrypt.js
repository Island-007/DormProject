const bcrypt = require("bcryptjs");

function hash(password) {
  const result = bcrypt.hashSync(password, 10);
  return result;
}

function verify(password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword)
}

module.exports = {
  hash,
  verify
}

