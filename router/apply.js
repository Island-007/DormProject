const express = require('express');
const router = express.Router();
const resBody = require('../struct/resBody');

const Apply = require("../model/apply_model");
const Student = require('../model/student_model');
const Room = require('../model/room_model');

router.post("/", async (req, res, next) => {
  try {
    const { account, intention, reason } = req.body;
    const newApply = await Apply.create({ account, intention, reason, state: false, agree: 0, opinion: null });
    res.send(resBody({ newApply }, "换宿申请创建成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.get("/:account", async (req, res, next) => {
  try {
    const { account } = req.params;
    const apply = await Apply.findAll({ where: { account }, order: [['createdAt', 'DESC']] });
    for (let item of apply) {
      const stuInfo = await Student.findAll({ where: { account } });
      item.setDataValue("roomId", stuInfo[0].roomId);
    }
    res.send(resBody({ apply }, "查询换宿申请成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.get("/", async (req, res, next) => {
  try {
    const { buildingid, size, page } = req.query;
    const results = [];
    const rooms = await Room.findRoomsByBuilding(buildingid, Number(size), Number(page));
    for (let room of rooms.rows) {
      const students = await Student.findAll({ where: { roomId: room.room_id } });
      if (students.length === 0) {
        continue;
      }
      for (let student of students) {
        const applies = await Apply.findAll({ where: { account: student.account }, order: [['createdAt', 'DESC']] });
        if (applies.length === 0) {
          continue;
        }
        for (let apply of applies) {
          apply.setDataValue("buildingId", buildingid);
          apply.setDataValue("roomId", room.room_id);
          apply.setDataValue("name", student.name);
          apply.setDataValue("sex", student.sex);
          results.push(apply);
        }
      }
    }
    res.send(resBody({ results }, "查询申请记录成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { state, agree, opinion } = req.body;
    const isSolve = /^true$/i.test(state);
    const result = await Apply.update({
      state: isSolve, agree, opinion
    }, {
      where: { id }
    })
    res.send(resBody({ result }, "审批完毕！", 200));
  } catch (err) {
    next(err);
  }
})


module.exports = router;
