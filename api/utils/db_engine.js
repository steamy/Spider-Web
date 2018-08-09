const Sequelize = require('sequelize')
const isProd = process.env.NODE_ENV === 'production'

const sequlize = new Sequelize('douban', 'root', 'steam', {
  host: '120.77.242.48',
  port: '3307',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  define: {
    timestamps: false,
    underscored: false,
    freezeTableName: true
  }
})

module.exports = sequlize
