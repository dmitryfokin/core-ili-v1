const pg = require('pg')

class CoreILIDBPG {
  constructor(options) {
    this.prefix = options.prefix
    this.pool = new pg.Pool(options)
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.pool
        .query('SELECT NOW()', err => {
          if (err) reject(err)
          resolve()
        })
    })
      .catch(err => {
        throw 'Error executing query' + err.stack
      })
  }

  disconnect() {
    this.pool.end()
  }


}

module.exports = {open: options => new CoreILIDBPG(options)}
