const express = require('express')
const { Container } = require('typedi')
const config = require('./config')

let server

const run = () =>
  new Promise(async resolve => {
    const app = express()
    const initLoaders = require('./loaders')

    await initLoaders(app)

    server = app.listen(config.port, () => {
      console.info(`App started on port: ${config.port}`)
      resolve(server)
    })
    server.on('error', err => {
      console.error(err)
      process.exit(1)
    })
  })

// @TODO: implement graceful shutdown
const stop = () =>
  new Promise(resolve => server.close(async () => {
    await Container.get('sequelizeInstance').close()
    await Container.get('kafkaProducer').disconnect()
    resolve()
  }))

module.exports = {
  run,
  stop
}
