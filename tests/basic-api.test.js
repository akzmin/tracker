const axios = require('axios')
const nock = require('nock')
const { run, stop } = require('../src/app')
const { getDateTimeParts } = require('../src/lib/dates')

let axiosAPIClient

beforeAll(async () => {
  const apiServer = await run()
  const { port } = apiServer.address()
  nock.disableNetConnect()
  nock.enableNetConnect(host => [`127.0.0.1:${port}`, 'test-tracker-clickhouse:8123'].includes(host))

  const axiosConfig = {
    baseURL: `http://127.0.0.1:${port}`,
    validateStatus: () => true
  }
  axiosAPIClient = axios.create(axiosConfig)
})

afterEach(() => {
  nock.cleanAll()
})

afterAll(async () => {
  await stop()
  nock.enableNetConnect()
})

describe('API', () => {
  describe('GET /track', () => {
    test('Should return 204 status and set cookie header', async () => {
      const response = await axiosAPIClient.get('/track?id=0213db1a-e739-4b95-8b51-ce5234f09d8e')

      expect(response.status).toBe(204)
      expect(response.headers['set-cookie'][0]).toEqual(
        expect.stringMatching(/^user_id=[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}; HttpOnly$/)
      )
    })
  })

  describe('GET /stats', () => {
    test('Should return events count', async () => {
      const { date } = getDateTimeParts()
      const response = await axiosAPIClient.get(`/stats?tracker_id=0213db1a-e739-4b95-8b51-ce5234f09d8e&from=${date}&to=${date}`)

      expect(response.status).toBe(200)
      expect(typeof response.data).toBe('number')
    })
  })
})
