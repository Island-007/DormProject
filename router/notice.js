const express = require('express');
const router = express.Router();
const resBody = require('../struct/resBody');

const Notice = require('../model/notice_model');

router.post('/', async (req, res, next) => {
  try {
    const { noticeTitle, noticeContent, noticeType, admin } = req.body;
    const notice = await Notice.createNotice(noticeTitle, noticeContent, noticeType, admin);
    res.send(resBody({ notice }, "公告创建成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.get('/', async (req, res, next) => {
  try {
    const notices = await Notice.findAll({ order: [['createdAt', 'DESC']] });
    res.send(resBody({ notices }, "查询成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.get('/list', async (req, res, next) => {
  try {
    const { size, page } = req.query;
    const notices = await Notice.findAllNoticesByPage(Number(size), Number(page));
    res.send(resBody({ notices }, "查询成功！", 200))
  } catch (err) {
    next(err);
  }
})

router.get('/admin', async (req, res, next) => {
  try {
    const { admin, size, page } = req.query;
    const notices = await Notice.findNoticesByAdmin(admin, Number(size), Number(page));
    res.send(resBody({ notices }, "查询成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findOne({
      where: { id }
    })
    res.send(resBody({ notice }, "查询成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, type } = req.body;
    const update = await Notice.editNotice(id, title, content, type);
    res.send(resBody({ update }, "编辑公告成功！", 200));
  } catch (err) {
    next(err);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Notice.destroy({
      where: { id: Number(id) }
    })
    res.send(resBody({ deleted }, "删除公告成功！", 200));
  } catch (err) {
    next(err);
  }
})
module.exports = router;
