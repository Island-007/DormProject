const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db')

class Room extends Model {
  static findRoomsByOptions(buildingId, floor, size, page) {
    return Room.findAndCountAll({
      where: {
        BuildingBuildingId: buildingId,
        floor,
      },
      offset: (page - 1) * size,
      limit: size
    })
  }

  static findRoomsByBuilding(buildingId, size, page) {
    if (buildingId === undefined) {
      return Room.findAndCountAll({
        offset: (page - 1) * size,
        limit: size
      })
    }
    return Room.findAndCountAll({
      where: {
        BuildingBuildingId: buildingId,
      },
      offset: (page - 1) * size,
      limit: size
    })
  }

  static findByRoomid(room_id) {
    return Room.findOne({
      where: { room_id },
    })
  }

  static addRoom(room_id, floor, room_type, buildingId) {
    return Room.create({
      room_id,
      floor,
      room_type,
      BuildingBuildingId: buildingId
    })
  }

}

Room.init({
  room_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  floor: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  room_type: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
}, {
  sequelize: db.sequelize,
  modelName: "Room",
  paranoid: true
})

module.exports = Room;
