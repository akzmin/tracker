#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname="$POSTGRES_DB"<<-EOSQL
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   CREATE TABLE IF NOT EXISTS trackers (
      id bigserial PRIMARY KEY,
      uuid uuid DEFAULT uuid_generate_v4(),
      value character varying(32) NOT NULL
   );
   CREATE INDEX IF NOT EXISTS trackers_uuid_idx ON trackers USING btree (uuid);

   INSERT INTO trackers VALUES (DEFAULT, DEFAULT, 'value-1');
   INSERT INTO trackers VALUES (DEFAULT, DEFAULT, 'value-2');
   INSERT INTO trackers VALUES (DEFAULT, DEFAULT, 'value-3');
   INSERT INTO trackers VALUES (DEFAULT, DEFAULT, 'value-4');
   INSERT INTO trackers VALUES (DEFAULT, DEFAULT, 'value-5');
EOSQL