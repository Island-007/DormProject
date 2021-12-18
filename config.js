const dataBaseConfig = {
  dbname: 'dorm',
  username: 'root',
  password: '1808170303',
  port: 3306,
  rebuild: false, // 是否每次重启服务器时重建数据库
  logging: false// 是否在控制台输出建表语句
}

const sysConfig = {
  jwtSecret: '068b44fe-6e83-458f-b950-345faf465f20',
}

module.exports = {
  dataBaseConfig,
  sysConfig
}
