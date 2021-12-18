const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.jwtsign = promisify(jwt.sign);
exports.jwtverify = promisify(jwt.verify);
exports.jwtdecode = promisify(jwt.decode);
