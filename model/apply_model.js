const { Sequelize, DataTypes, Model, TINYINT } = require('sequelize');
const db = require('../db')

class Apply extends Model {

}

Apply.init({
  account: {
    type: DataTypes.STRING,
    allowNull: false
  },
  intention: {
    type: DataTypes.STRING
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: Boolean,
    allowNull: false
  },
  agree: {
    type: TINYINT,
    allowNull: false
  },
  opinion: {
    type: DataTypes.STRING
  }
}, {
  sequelize: db.sequelize,
  modelName: "Apply",
  paranoid: true
})

module.exports = Apply;
