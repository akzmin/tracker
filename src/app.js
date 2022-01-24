const express = require('express')
const config = require('./config')

async function main() {
  const app = express()
  const initLoaders = require('./loaders')

  await initLoaders(app)

  const server = app.listen(config.port, () => {
    console.info(`App started on port: ${config.port}`)
  })
  server.on('error', err => {
    console.error(err)
    process.exit(1)
  })

  // @TODO: add graceful shutdown
  // await producer.disconnect()
}

main()
