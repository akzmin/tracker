Tracker Node.js application

To start project locally with docker-compose execute cli command `docker-compose up --no-recreate`

Endpoints usage examples:
`/track?id=0213db1a-e739-4b95-8b51-ce5234f09d8e` - create event
`/stats?tracker_id=0213db1a-e739-4b95-8b51-ce5234f09d8e&from=2022-01-24&to=2022-01-24` - return count of created events
