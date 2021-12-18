const { Sequelize, DataTypes, Model } = require("sequelize");
const { hash } = require("../utils/bcrypt")
const db = require("../db");

class User extends Model {
  static findByAccount(account) {
    return User.findOne({
      where: { account }
    })
  }
  static getInfoByAccount(account) {
    return User.findOne({
      attributes: ['account', 'role', 'name', 'phone', 'roomId'],
      where: { account }
    })
  }
  static getAdmin() {
    return User.findAll({
      attributes: ['account', 'name', 'phone'],
      where: { role: 'admin' }
    })
  }
  static getAllAdmins(size, page) {
    return User.findAndCountAll({
      attributes: ['account', 'name', 'phone'],
      where: { role: 'admin' },
      offset: (page - 1) * size,
      limit: size
    })
  }
  static createUser(account, password, role, name, phone, roomId) {
    return User.create({
      account,
      password,
      role,
      name,
      phone,
      roomId
    })
  }
  static updateUserPassword(account, password) {
    return User.update({
      password
    }, {
      where: { account }
    })
  }
  static updateUserInfo(account, name, phone) {
    return User.update({
      name,
      phone
    }, {
      where: { account }
    })
  }
}

User.init({
  account: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("password", hash(value));
    }
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "student",
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roomId: {
    type: DataTypes.STRING,
  }
},
  {
    sequelize: db.sequelize,
    modelName: "User",
    paranoid: true
  }
);

module.exports = User;
