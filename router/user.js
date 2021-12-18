const express = require('express');
const Student = require('../model/student_model');
const User = require('../model/user_model');
const router = express.Router();
const resBody = require('../struct/resBody');
const { verify } = require('../utils/bcrypt');

// 获取当前用户
router.get('/', async (req, res, next) => {
  try {
    res.send(resBody({
      ...req.user.dataValues,
    }, "获取当前用户信息成功！", 200));
  } catch (err) {
    next(err);
  }
})

// 根据账号获取管理员信息
router.get('/admin', async (req, res, next) => {
  try {
    const { account } = req.query;
    const admin = await User.getInfoByAccount(account);
    res.send(resBody({
      admin
    }, "获取管理员信息成功！", 200));
  } catch (err) {
    next(err);
  }
})

// 用户修改密码
router.put('/password', async (req, res, next) => {
  try {
    const { account, oldpassword, newpassword } = req.body;
    const user = await User.findByAccount(account);
    if (!verify(oldpassword, user.password)) {
      res.send(resBody(null, "输入原密码错误！", 400));
    } else {
      const updated = User.updateUserPassword(account, newpassword);
      res.send(resBody({ updated }, "密码修改成功！", 200));
    }
  } catch (err) {
    next(err);
  }
})

// 管理员修改信息
router.put('/admin/:account', async (req, res, next) => {
  try {
    const { account } = req.params;
    const { username, phone } = req.body;
    const user = await User.findByAccount(account);
    if (user === null) {
      res.send(resBody(null, "查无该用户!", 400));
    } else {
      const updated = await User.updateUserInfo(account, username, phone);
      res.send(resBody({ updated }, "修改成功！", 200));
    }
  } catch (err) {
    next(err);
  }
})

// 学生修改信息
router.put('/student/:account', async (req, res, next) => {
  try {
    const { account } = req.params;
    const { username, sex, phone, roomId, area } = req.body;
    const stu = await Student.findByAccount(account, 1, 1);
    if (stu === null) {
      res.send(resBody(null, "查无该学生用户!", 400));
    } else {
      const updatedUser = await User.updateUserInfo(account, username, phone);
      const updatedStu = await Student.updateStuInfo(account, username, sex, phone, roomId, area);
      res.send(resBody({ updatedStu }, "学生修改信息成功！", 200));
    }
  } catch (err) {
    next(err);
  }
})

// 学生更换宿舍
router.put('/student/:account/room/:roomid', async (req, res, next) => {
  try {
    const { account, roomid } = req.params;
    const updatedUser = await User.update({ roomId: roomid }, { where: { account } });
    const updatedStu = await Student.update({ roomId: roomid }, { where: { account } });
    res.send(resBody({ roomid }, "学生更换宿舍成功！", 200));
  } catch (err) {
    next(err);
  }
})


module.exports = router;
