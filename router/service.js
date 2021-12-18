const express = require('express');
const router = express.Router();
const resBody = require('../struct/resBody');

const Service = require('../model/service_model');

router.post('/', async (req, res, next) => {
  try {
    const { account, name, building, roomId, phone, problem, solved } = req.body;
    const newService = await Service.addService(account, name, building, roomId, phone, problem, solved);
    res.send(resBody({ newService }, "申请维修成功", 200));
  } catch (err) {
    next(err);
  }
})

router.get('/', async (req, res, next) => {
  try {
    const { building, solved, page, size } = req.query;
    const isSolve = /^true$/i.test(solved);
    const results = await Service.getServices(building, isSolve, Number(size), Number(page));
    res.send(resBody({ results }, "维修信息获取成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.get('/all', async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const results = await Service.getAllServices(Number(size), Number(page));
    res.send(resBody({ results }, "维修信息获取成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { solved, reply } = req.body;
    const isSolve = /^true$/i.test(solved);
    const updated = await Service.update(
      {
        solved: isSolve,
        reply
      },
      {
        where: { id }
      })
    res.send(resBody({ updated }, "维修状态更新成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.get('/room', async (req, res, next) => {
  try {
    const { roomId, size, page } = req.query;
    const records = await Service.getServicesByRoom(roomId, Number(size), Number(page));
    res.send(resBody({ records }, "查询维修记录成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.get('/person', async (req, res, next) => {
  try {
    const { account, size, page } = req.query;
    const records = await Service.getServicesByAccount(account, Number(size), Number(page));
    res.send(resBody({ records }, "查询申请记录成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const { id } = req.query;
    const deleted = await Service.destroy({
      where: { id }
    });
    res.send(resBody({ deleted }, "已取消维修申请！", 200));
  } catch (err) {
    next(err);
  }
})


module.exports = router;
