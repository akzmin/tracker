const {
  API_SERVER_PORT = 3000,
  HOSTNAME = 'test',
  NODE_ENV = 'development',
  PG_DATABASE_URI,
  CH_DATABASE_URL,
  CH_DATABASE_PORT,
  CH_DATABASE_NAME,
  KAFKA_SERVER,
  KAFKA_TOPIC_TRACKING_EVENTS
} = process.env

const defaultConfig = {
  port: API_SERVER_PORT,
  hostName: HOSTNAME,
  postgresDbUri: PG_DATABASE_URI,
  clickhouseDb: {
    url: CH_DATABASE_URL,
    port: CH_DATABASE_PORT,
    database: CH_DATABASE_NAME
  },
  kafkaBrokers: [KAFKA_SERVER],
  kafkaTopicTrackingEvents: KAFKA_TOPIC_TRACKING_EVENTS
}

module.exports = {
  development: {
    ...defaultConfig
  },
  test: {
    ...defaultConfig
  },
  production: {
    ...defaultConfig
  }
}[NODE_ENV] || defaultConfig