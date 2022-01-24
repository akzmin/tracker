const expressLoader = require('./express')
const dependencyInjectorLoader = require('./dependency-injector')
const kafkaLoader = require('./kafka')
const sequelizeLoader = require('./sequelize')
const clickhouseLoader = require('./clickhouse')
const getTrackerModel = require('./../models/tracker')

module.exports = async function (app) {
  const sequelizeInstance = sequelizeLoader()
  const clickhouseInstance = clickhouseLoader()

  await dependencyInjectorLoader({
    sequelizeInstance,
    clickhouseInstance,
    kafkaProducer: await kafkaLoader(),
    models: [
      {
        name: 'trackerModel',
        getModel: getTrackerModel
      }
    ]
  })

  expressLoader(app)
}