const express = require('express');
const router = express.Router();
const resBody = require('../struct/resBody');

const Room = require('../model/room_model');
const Student = require('../model/student_model');
const RoomController = require('../controller/room_controller');

router.get('/:roomid', async (req, res, next) => {
  try {
    const { roomid } = req.params;
    const room = await Room.findByRoomid(roomid);
    res.send(resBody({ room }, "查询宿舍信息成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.get('/', async (req, res, next) => {
  try {
    const { buildingId, floor, size, page } = req.query;
    const rooms = await Room.findRoomsByOptions(buildingId, floor, Number(size), Number(page));
    for (let room of rooms.rows) {
      const studentCount = await Student.count({ where: { roomId: room.dataValues.room_id } });
      room.setDataValue("studentCount", studentCount);
    }
    res.send(resBody({ rooms }, "查询宿舍信息成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.get('/usablerooms/all', async (req, res, next) => {
  try {
    const rooms = await Room.findAll();
    const usabled = await RoomController.getUsabledRooms(rooms);
    res.send(resBody({ usabled }, "查询宿舍信息成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.get('/usablerooms/id/:buildingId/floor/:floor', async (req, res, next) => {
  try {
    const { buildingId, floor } = req.params;
    const rooms = await Room.findAll({ where: { BuildingBuildingId: buildingId, floor } });
    const usabled = await RoomController.getUsabledRooms(rooms);
    res.send(resBody({ usabled }, "查询宿舍信息成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.post("/", async (req, res, next) => {
  try {
    const { buildingId, floor, roomType, min, max } = req.body;
    for (let i = min; i <= max; i++) {
      const roomId = i < 10 ? buildingId + floor + '0' + i : buildingId + floor + i;
      const searchRoom = await Room.findOne({ where: { room_id: roomId } });
      if (searchRoom) {
        continue;
      } else {
        const newRoom = await Room.addRoom(roomId, floor, roomType, buildingId);
      }
    }
    res.send(resBody(null, "宿舍楼批量创建成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.put('/:roomId', async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const { roomType } = req.body;
    const updated = await Room.update({ room_type: Number(roomType) }, { where: { room_id: roomId } });
    res.send(resBody({ updated }, "更新宿舍信息成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.delete('/:roomId', async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findByRoomid(roomId);
    if (!room) {
      res.send(resBody(null, "该宿舍不存在！", 400));
    } else {
      const deleted = await Room.destroy({ where: { room_id: roomId } });
      res.send(resBody({ deleted }, "该宿舍已删除！", 200));
    }
  } catch (err) {
    next(err);
  }
})

module.exports = router;
