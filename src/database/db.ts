const Pool = require('pg').Pool

import db from './.db.config'

const pool = new Pool({
  user: db.user,
  password: db.password,
  database: db.database,
  host: db.host,
  port: db.port,
  ssl: {
    rejectUnauthorized: db.ssl.rejectUnauthorized,
  },
})

export = pool
