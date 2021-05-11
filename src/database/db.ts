const Pool = require('pg').Pool

import dbConfig from './.db.config'

const pool = new Pool({
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  port: dbConfig.port,
  ssl: {
    rejectUnauthorized: dbConfig.ssl.rejectUnauthorized,
  },
})

export = pool
