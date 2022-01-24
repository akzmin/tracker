const { ClickHouse } = require('clickhouse')
const { clickhouseDb: { url, port, database } } = require('../config')

module.exports = () => {
  const clickhouse = new ClickHouse({
    url,
    port,
    debug: false,
    basicAuth: null,
    isUseGzip: false,
    format: 'json',
    raw: false,
    config: {
      output_format_json_quote_64bit_integers: 0,
      enable_http_compression: 0,
      database
    },
    reqParams: {}
  })

  return clickhouse
}
