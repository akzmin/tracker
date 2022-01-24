const cookieParser = require('cookie-parser')
const cors = require('cors')
const routes = require('../api')
const { NotFoundError } = require('../errors')

module.exports = function(app) {
  app.get('/status', (req, res) => { // heathcheck
    res.status(200).end()
  })
  app.enable('trust proxy') // For real IP

  app.use(cookieParser())
  app.use(cors())
  app.use('/', routes())

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(new NotFoundError())
  })

  // error handlers
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      errors: {
        message: err.message
      }
    })
  })
}
