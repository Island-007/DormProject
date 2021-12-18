const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db')

class Service extends Model {
  static addService(account, name, building, roomId, phone, problem, solved) {
    return Service.create({
      account,
      name,
      building,
      roomId,
      phone,
      problem,
      solved,
      reply: null
    })
  }
  static getServices(building, solved, size, page) {
    return Service.findAndCountAll({
      where: { building, solved },
      offset: (page - 1) * size,
      limit: size,
      order: [['createdAt', 'DESC']]
    })
  }
  static getAllServices(size, page) {
    return Service.findAndCountAll({
      offset: (page - 1) * size,
      limit: size,
      order: [['createdAt', 'DESC']]
    })
  }
  static getServicesByRoom(roomId, size, page) {
    return Service.findAndCountAll({
      where: { roomId },
      offset: (page - 1) * size,
      limit: size,
      order: [['createdAt', 'DESC']]
    })
  }
  static getServicesByAccount(account, size, page) {
    return Service.findAndCountAll({
      where: { account },
      offset: (page - 1) * size,
      limit: size,
      order: [['createdAt', 'DESC']]
    })
  }
}

Service.init({
  account: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  building: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roomId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  problem: {
    type: DataTypes.STRING,
    allowNull: false
  },
  solved: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  reply: {
    type: DataTypes.STRING,
  }
}, {
  sequelize: db.sequelize,
  modelName: "Service",
  paranoid: true
})

module.exports = Service;
