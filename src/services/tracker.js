const { v4: uuidv4 } = require('uuid')
const config = require('../config')
const { getDateTimeParts } = require('../lib/dates')
const { NotFoundError } = require('../errors')

class TrackerService {

  constructor ({ trackerModel, kafkaProducer }) {
    this.trackerModel = trackerModel
    this.kafkaProducer = kafkaProducer
  }

  async track(id, { ip, url, userId, userAgent }) {
    const tracker = await this.trackerModel.findOne({ where: { uuid: id } }) // @TODO: cache this db fetch
    if (!tracker) throw new NotFoundError()
    const { uuid: trackerId, value } = tracker
    const eventId = uuidv4()
    const { date, time } = getDateTimeParts()

    await this.kafkaProducer.send({
      topic: config.kafkaTopicTrackingEvents,
      messages: [{
        key: `key-${eventId}`,
        value: JSON.stringify({
          date,
          date_time: `${date} ${time}`,
          event_id: eventId,
          tracker_id: trackerId,
          ip,
          user_id: userId,
          user_agent: userAgent,
          url,
          value
        })
      }]
    })

    return true
  }

}

module.exports = TrackerService