const escapeString = require('sql-escape-string')

class StatisticService {

  constructor ({ clickhouseInstance }) {
    this.clickhouseInstance = clickhouseInstance
  }

  async getEventsCount({ trackerId, from, to }) {
    const [{ total_events = 0 }] = await this.clickhouseInstance.query(
      `SELECT count() AS total_events FROM tracking_events WHERE date >= toDate(${escapeString(from)}) AND date <= toDate(${escapeString(to)}) AND tracker_id = ${escapeString(trackerId)}`
    ).toPromise()

    return total_events
  }

}

module.exports = StatisticService