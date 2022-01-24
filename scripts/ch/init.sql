CREATE TABLE IF NOT EXISTS tracker.tracking_events_queue (
      date Date,
      date_time DateTime,
      event_id String,
      tracker_id String,
      ip String,
      user_id String,
      user_agent String,
      url String,
      value String
  ) ENGINE = Kafka SETTINGS kafka_broker_list = 'tracker-kafka:9092',
                            kafka_topic_list = 'topic-tracking-events',
                            kafka_group_name = 'group-tracking-events',
                            kafka_format = 'JSONEachRow',
                            kafka_max_block_size = 1000;

  CREATE TABLE IF NOT EXISTS tracker.tracking_events (
      date Date,
      date_time DateTime,
      event_id String,
      tracker_id String,
      ip String,
      user_id String,
      user_agent String,
      url String,
      value String
  ) ENGINE = MergeTree PARTITION BY toYYYYMM(date) ORDER BY (tracker_id) SETTINGS index_granularity = 8192;

  CREATE MATERIALIZED VIEW IF NOT EXISTS tracker.tracking_events_consumer TO tracker.tracking_events
      AS SELECT * FROM tracker.tracking_events_queue;
