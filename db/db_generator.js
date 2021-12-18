const db = require("./index");

const User = require("../model/user_model");
const Menu = require("../model/menu_model");
const Student = require("../model/student_model");
const Room = require("../model/room_model");
const Building = require("../model/building_model")
const Notice = require("../model/notice_model");
const Service = require("../model/service_model");
const Apply = require("../model/apply_model");

const { dataBaseConfig } = require("../config")

// 创建表关系
Building.hasMany(Room);
Room.belongsTo(Building);

// function initData() {
//   const admin = User.create({
//     account: "admin21001",
//     password: hash("123456"),
//     role: "admin",
//     name: "张三",
//     phone: "13309048908"
//   })
// }

module.exports = function () {
  console.log("DataBase Syncing... ...");
  db.sequelize.sync({
    alter: true
    // force: dataBaseConfig.rebuild //User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
  })
    // .then(() => {
    //   if (dataBaseConfig.rebuild) {
    //     initData();
    //   }
    // })
    .then(() => {
      console.log("DataBase Sync Done");
    })
}
