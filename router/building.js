const express = require('express');
const router = express.Router();
const resBody = require('../struct/resBody');

const Building = require('../model/building_model');
const Room = require('../model/room_model');

// 查询所有宿舍楼
router.get('/', async (req, res, next) => {
  try {
    // findAllBuildingsByPage(size, page)
    const { size, page } = req.query;
    const buildings = await Building.findAllBuildingsByPage(Number(size), Number(page));
    for (let building of buildings.rows) {
      const roomCount = await Room.count({ where: { BuildingBuildingId: building.building_id } });
      building.setDataValue("roomCount", roomCount);
    }
    res.send(resBody({
      buildings
    }, "查询成功！", 200));
  } catch (err) {
    next(err)
  }
})
// 查询所有宿舍楼列表 不分页
router.get('/list', async (req, res, next) => {
  try {
    const buildings = await Building.findAll();
    res.send(resBody({ buildings }, "查询成功！", 200));
  } catch (err) {
    next(err);
  }
})

// 创建宿舍楼
router.post('/', async (req, res, next) => {
  try {
    const { buildingId, floors, buildingType, admin } = req.body;
    const building = await Building.findById(buildingId);
    if (building === null) {
      const newBuilding = await Building.createBuilding(buildingId, floors, buildingType, admin);
      res.send(resBody({
        newBuilding
      }, "宿舍楼创建成功！", 200))
    } else {
      res.send(resBody(null, "该宿舍楼已存在", 400));
    }

  } catch (err) {
    next(err)
  }
})

// 查询某栋宿舍楼
router.get('/building_id', async (req, res, next) => {
  try {
    const { building_id } = req.query;
    const building = await Building.findById(building_id);
    if (building !== null) {
      res.send(resBody({ building }, "查询成功", 200));
    } else {
      res.send(resBody(null, "该宿舍楼不存在", 404))
    }
  } catch (err) {
    next(err);
  }
})

// 更新某栋宿舍楼信息
router.put('/:buildingId', async (req, res, next) => {
  try {
    const { floors, buildingType, admin } = req.body;
    const { buildingId } = req.params;
    const updated = await Building.updateBuilding(buildingId, floors, buildingType, admin);
    if (updated) {
      res.send(resBody({ updated }, "宿舍楼信息更新成功！", 200));
    } else {
      res.send(resBody(null, "宿舍楼信息更新失败！", 400))
    }
  } catch (err) {
    next(err);
  }
})

// 删除某栋宿舍楼信息
router.delete('/building_id', async (req, res, next) => {
  try {
    const { building_id } = req.query;
    const deleted = await Building.delBuilding(building_id);
    if (deleted) {
      res.send(resBody({ deleted }, "该宿舍楼信息已删除！", 200));
    } else {
      res.send(resBody(null, "宿舍楼信息删除失败", 400));
    }
  } catch (err) {
    next(err);
  }
})

router.get('/admin', async (req, res, next) => {
  try {
    const { admin } = req.query;
    const results = await Building.findByAdmin(admin);
    res.send(resBody({ results }, "查询成功", 200));
  } catch (err) {
    next(err);
  }
})

router.get('/type', async (req, res, next) => {
  try {
    const results = {};
    const male = await Building.findAll({ where: { building_type: "男生宿舍" } });
    const female = await Building.findAll({ where: { building_type: "女生宿舍" } });
    results.male = male;
    results.female = female;
    res.send(resBody({ results }, "按性别查找宿舍楼成功！", 200));
  } catch (err) {
    next(err);
  }
})

module.exports = router;
