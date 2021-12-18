module.exports = function (data, msg, status) {
  const obj = {
    data,
    meta: {
      msg,
      status
    }
  }
  return obj;
}
