const Sequelize = require('sequelize')
const { postgresDbUri } = require('../config')

module.exports = () => {
  const sequelize = new Sequelize(postgresDbUri)

  return sequelize
}
