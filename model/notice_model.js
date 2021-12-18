const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db')

class Notice extends Model {
  static createNotice(notice_title, notice_content, notice_type, admin) {
    return Notice.create({
      notice_title,
      notice_content,
      notice_type,
      admin
    })
  }
  static findAllNoticesByPage(size, page) {
    return Notice.findAndCountAll({
      offset: (page - 1) * size,
      limit: size,
      order: [['createdAt', 'DESC']]
    })
  }
  static findNoticesByAdmin(admin, size, page) {
    return Notice.findAndCountAll({
      where: { admin },
      offset: (page - 1) * size,
      limit: size,
      order: [['createdAt', 'DESC']]
    })
  }
  static editNotice(id, notice_title, notice_content, notice_type) {
    return Notice.update({
      notice_title,
      notice_content,
      notice_type
    }, {
      where: { id }
    })
  }
}

Notice.init({
  notice_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notice_content: {
    type: DataTypes.TEXT,
  },
  notice_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize: db.sequelize,
  modelName: "Notice",
  paranoid: true
})

module.exports = Notice;
