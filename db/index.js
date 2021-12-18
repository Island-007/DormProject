const Sequelize = require('sequelize');
const { dataBaseConfig } = require('../config');

class DataBase {
  constructor() {
    this.sequelize = this.init();
  }
  init() {
    const { dbname, username, password } = dataBaseConfig;
    const sequelize = new Sequelize(dbname, username, password, {
      host: 'localhost',
      dialect: 'mysql',
      logging: dataBaseConfig.logging
    })
    return sequelize;
  }
  // 数据库连接测试（仅供调试使用）
  connectTest() {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log("数据库连接成功")
      })
      .catch(err => {
        console.error("数据库连接失败:", err)
      })
  }
}

module.exports = new DataBase();
