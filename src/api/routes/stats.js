const { Router } = require('express')
const { Container } = require('typedi')

const router = Router()

module.exports = (app) => {
  app.use('/stats', router)

  router.get('/',
    async (req, res, next) => {
      try {
        const { query: { tracker_id: trackerId, from, to } } = req
        const statisticServiceInstance = Container.get('statisticService')
        const count = await statisticServiceInstance.getEventsCount({ trackerId, from, to })

        return res.send(String(count))
      } catch (e) {
        console.error(e)

        return next(e)
      }
    }
  )
}
