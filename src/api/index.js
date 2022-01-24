const { Router } = require('express')
const track = require('./routes/track')
const stats = require('./routes/stats')

module.exports = () => {
	const app = Router()
	track(app)
	stats(app)

	return app
}
