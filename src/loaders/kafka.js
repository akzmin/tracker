const { Kafka } = require('kafkajs')
const { hostName, kafkaBrokers } = require('../config')

module.exports = async () => {
  const kafkaClient = new Kafka({
    // logLevel: logLevel.DEBUG,
    clientId: `tracker-producer-${hostName}`,
    brokers: kafkaBrokers
  })
  const producer = kafkaClient.producer()
  await producer.connect()

  return producer
}
