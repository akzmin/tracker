const { v4: uuidv4 } = require('uuid')
const { Router } = require('express')
const { Container } = require('typedi')

const router = Router()

module.exports = (app) => {
  app.use('/track', router)

  router.get('/',
    async (req, res, next) => {
      try {
        const {
          protocol,
          hostname,
          originalUrl,
          query: { id } = {},
          cookies: { user_id: userId = uuidv4() }
        } = req
        const trackerServiceInstance = Container.get('trackerService')
        await trackerServiceInstance.track(
          id,
          {
            ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            url: `${protocol}://${hostname}${originalUrl}`,
            userId,
            userAgent: req.headers['user-agent'] || ''
          }
        )

        return res.writeHead(204, {
          'Set-Cookie': `user_id=${userId}; HttpOnly`,
          'Access-Control-Allow-Credentials': 'true'
        }).end()
      } catch (e) {
        console.error(e)

        return next(e)
      }
    }
  )
}
