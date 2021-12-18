const express = require('express');
const router = express.Router();
const resBody = require('../struct/resBody');

const Menu = require('../model/menu_model');

// 根据角色获取菜单信息
router.get('/', async (req, res, next) => {
  try {
    const role = req.query.role;
    const menu = await Menu.findByRole(role);
    res.send(resBody(menu, "获取菜单信息成功！", 200));
  } catch (err) {
    next(err);
  }
})

module.exports = router;
