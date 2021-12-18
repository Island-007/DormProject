const resBody = require('../struct/resBody')
const { jwtverify } = require('../utils/jwt')
const { sysConfig } = require('../config')
const User = require('../model/user_model')

module.exports = async (req, res, next) => {
  let token = req.headers['authorization'];
  token = token ? token.split('Bearer ')[1] : null;
  if (token === null) {
    return res.status(401).send(resBody(null, "token为空！", 401));
  }
  try {
    const decodedToken = await jwtverify(token, sysConfig.jwtSecret);
    req.user = await User.getInfoByAccount(decodedToken.account);
    next();
  } catch (err) {
    return res.status(401).send(resBody(null, "token无效！", 401))
  }
}
