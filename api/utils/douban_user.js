const DbEngine = require('./db_engine')
const Sequelize = require('sequelize')


const User = DbEngine.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.DataTypes.INTEGER
  },
  user_id: {
    type: Sequelize.DataTypes.STRING(30)
  },
  user_nickname: {
    type: Sequelize.DataTypes.STRING(30)
  },
  signature: {
    type: Sequelize.DataTypes.STRING(50)
  },
  location: {
    type: Sequelize.DataTypes.STRING(40)
  },
  check_in_time: {
    type: Sequelize.DataTypes.STRING(30)
  },
  user_intro: {
    type: Sequelize.DataTypes.STRING(1200)
  },
  books_wanted: {
    type: Sequelize.DataTypes.STRING(200)
  },
  books_red: {
    type: Sequelize.DataTypes.STRING(200)
  },
  movies_wanted: {
    type: Sequelize.DataTypes.STRING(200)
  },
  movies_watched: {
    type: Sequelize.DataTypes.STRING(200)
  },
  groups: {
    type: Sequelize.DataTypes.STRING(200)
  },
  dou_list: {
    type: Sequelize.DataTypes.STRING(300)
  }
})

module.exports = User
