const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../db");

class Building extends Model {
  static findById(building_id) {
    return Building.findOne({
      where: { building_id }
    })
  }
  static findByAdmin(building_admin) {
    return Building.findAll({
      where: { building_admin }
    })
  }
  static createBuilding(building_id, floors_num, building_type, building_admin) {
    return Building.create({
      building_id,
      floors_num,
      building_type,
      building_admin
    })
  }
  static findAllBuildingsByPage(size, page) {
    return Building.findAndCountAll({
      offset: (page - 1) * size,
      limit: size
    })
  }
  static updateBuilding(building_id, floors_num, building_type, building_admin) {
    return Building.update({
      floors_num,
      building_type,
      building_admin
    }, {
      where: {
        building_id
      }
    })
  }
  static delBuilding(building_id) {
    return Building.destroy({
      where: {
        building_id
      }
    })
  }
}

Building.init({
  building_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  floors_num: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  building_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  building_admin: {
    type: DataTypes.STRING
  }
}, {
  sequelize: db.sequelize,
  modelName: "Building",
  paranoid: true
})

module.exports = Building;
