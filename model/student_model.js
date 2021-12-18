const { Sequelize, DataTypes, Model, Op, where } = require("sequelize");
const db = require("../db");

class Student extends Model {
  static findByAccount(account, size, page) {
    return Student.findAndCountAll({
      where: { account },
      offset: (page - 1) * size,
      limit: size
    })
  }
  static findByName(name, size, page) {
    return Student.findAndCountAll({
      where: { name },
      offset: (page - 1) * size,
      limit: size
    })
  }
  static findByRoom(room, size, page) {
    return Student.findAndCountAll({
      where: {
        roomId: { [Op.like]: room + '%' },
      },
      offset: (page - 1) * size,
      limit: size
    })
  }
  static findAllByPage(size, page) {
    return Student.findAndCountAll({
      offset: (page - 1) * size,
      limit: size
    })
  }
  static createStudent(account, name, sex, phone, roomId, area) {
    return Student.create({
      account,
      name,
      sex,
      phone,
      roomId,
      area
    })
  }
  static updateStuInfo(account, name, sex, phone, roomId, area) {
    return Student.update({
      name, sex, phone, roomId, area
    }, {
      where: { account }
    })
  }
}

Student.init({
  account: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roomId: {
    type: DataTypes.STRING,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db.sequelize,
  modelName: "Student",
  paranoid: true
})

module.exports = Student;
