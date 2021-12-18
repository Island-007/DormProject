const express = require('express');
const router = express.Router();
const db = require('../db/index');
const resBody = require('../struct/resBody');
const auth = require('../middleware/auth');
const User = require('../model/user_model');
const Room = require('../model/room_model')
const { verify } = require('../utils/bcrypt');
const { jwtsign } = require('../utils/jwt');
const { sysConfig } = require('../config');
const Student = require('../model/student_model');

// 用户登录 
router.post('/login', async (req, res, next) => {
  try {
    const { account, password } = req.body;
    const user = await User.findByAccount(account);
    if (user === null) {
      res.send(resBody(null, "该用户不存在", 404));
    } else {
      console.log(user);
      if (!verify(password, user.password)) {
        res.send(resBody(null, "密码错误", 404));
      } else {
        const token = await jwtsign({
          account: user.account,
        }, sysConfig.jwtSecret, {
          expiresIn: "24h"
        });
        res.status(200).send(resBody({
          account: user.account,
          role: user.role,
          name: user.name,
          token
        }, "登录成功", 200))
      }
    }
  } catch (err) {
    next(err);
  }
})

// 用户注册(学生)
router.post('/regist', async (req, res, next) => {
  try {
    const { account, password, sex, name, phone, roomId, area } = req.body;
    const user = await User.findByAccount(account);
    const room = await Room.findByRoomid(roomId);
    if (user !== null) {
      res.send(resBody(null, "该用户已存在！", 400));
    } else if (room === null) {
      res.send(resBody(null, "查无此宿舍！", 400))
    } else {
      // 注册用户
      const newUser = await User.createUser(account, password, "student", name, phone, roomId);
      const newStu = await Student.createStudent(account, name, sex, phone, roomId, area);
      res.send(resBody({
        newStu
      }, "注册成功！", 200));
    }
  } catch (err) {
    next(err);
  }
})

// 添加管理员
router.post('/admins', auth, async (req, res, next) => {
  try {
    const { account, password, name, phone } = req.body;
    const user = await User.findByAccount(account);
    if (user !== null) {
      res.send(resBody(null, "该用户已存在！请勿重复添加！", 400));
    } else {
      const newAdmin = await User.createUser(account, password, "admin", name, phone, null);
      res.send(resBody({ newAdmin }, "添加管理员成功！", 200));
    }
  } catch (err) {
    next(err);
  }
})

router.get('/admins/all', auth, async (req, res, next) => {
  try {
    const { size, page } = req.query;
    const admins = await User.getAllAdmins(Number(size), Number(page));
    res.send(resBody({ admins }, "获取管理员信息成功！", 200));
  } catch (err) {
    next(err);
  }
})

//获取管理员列表
router.get('/admins', auth, async (req, res, next) => {
  try {
    const admins = await User.getAdmin();
    res.send(resBody({
      ...admins
    }, "获取管理员列表成功！", 200));
  } catch (err) {
    next(err);
  }
})

// 注销管理员
router.delete('/admins', auth, async (req, res, next) => {
  try {
    const { account } = req.query;
    const user = await User.findByAccount(account);
    if (user) {
      const admin = await User.destroy({
        where: { account }
      })
      res.send(resBody({ admin }, "注销成功！", 200));
    }
    else {
      res.send(resBody(null, "该管理员不存在！注销失败！", 400));
    }
  } catch (err) {
    next(err);
  }
})

// 注销学生信息
router.delete('/students', auth, async (req, res, next) => {
  try {
    const { account } = req.query;
    const stu = await Student.findByAccount(account, 1, 1);
    if (stu) {
      const user = await User.destroy({
        where: { account }
      })
      const deleted = await Student.destroy({
        where: { account }
      })
      res.send(resBody({ deleted }, "注销成功！", 200));
    }
    else {
      res.send(resBody(null, "该账号不存在！注销失败！", 400));
    }
  } catch (err) {
    next(err);
  }
})

// 查询学生
router.get('/students', auth, async (req, res, next) => {
  try {
    const { account, name, room, size, page } = req.query;
    let results;
    if (account) {
      results = await Student.findByAccount(account, Number(size), Number(page));
    } else if (name) {
      results = await Student.findByName(name, Number(size), Number(page));
    } else if (room) {
      results = await Student.findByRoom(room, Number(size), Number(page));
    } else {
      results = await Student.findAllByPage(Number(size), Number(page));
    }
    res.send(resBody({ results }, "查询学生信息成功！", 200));
  } catch (err) {
    next(err);
  }
})


module.exports = router;
