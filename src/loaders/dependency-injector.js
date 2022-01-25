const { Container } = require('typedi')
const TrackerService = require('../services/tracker')
const StatisticService = require('../services/statistic')

module.exports = ({
  sequelizeInstance,
  clickhouseInstance,
  kafkaProducer,
  models
}) => {
  models.forEach(
    ({ name, getModel }) => Container.set(name, getModel({ sequelize: sequelizeInstance }))
  )

  Container.set('sequelizeInstance', sequelizeInstance)
  Container.set('kafkaProducer', kafkaProducer)
  Container.set('trackerService', new TrackerService({
    kafkaProducer,
    trackerModel: Container.get('trackerModel')
  }))
  Container.set('statisticService', new StatisticService({ clickhouseInstance }))
}
