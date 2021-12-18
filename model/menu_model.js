const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db')

class Menu extends Model {
  static findByRole(role) {
    if (role === "superAdmin") {
      return Menu.findAll({
        attributes: ['menu_id', 'menu_pid', 'menu_path', 'menu_name', 'menu_title', 'menu_link', 'icon'],
        where: {
          role: ['superAdmin', 'admin', 'all']
        }
      })
    } else {
      return Menu.findAll({
        attributes: ['menu_id', 'menu_pid', 'menu_path', 'menu_name', 'menu_title', 'menu_link', 'icon'],
        where: {
          role: [role, 'all']
        }
      })
    }

  }
}

Menu.init({
  menu_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  menu_pid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  menu_path: {
    type: DataTypes.STRING,
  },
  menu_name: {
    type: DataTypes.STRING,
  },
  menu_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  menu_link: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
  }
}, {
  sequelize: db.sequelize,
  modelName: "Menu",
  paranoid: true
});

module.exports = Menu;
