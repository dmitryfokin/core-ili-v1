const pg = require('pg')

class CoreILIDBPG {
  constructor(options) {
    this.prefix = options.prefix ? options.prefix + '_' : ''
    this.pool = new pg.Pool(options)
    this.metadata = {
      TypeItem: {
        table: (this.prefix + '_ili_types_item'),
        columns: [
          {name: 'id', type: 'uuid'},
          {name: 'name', type: 'String'},
          {name: 'description', type: 'String'},
        ]
      },
      TypeLink: {
        table: (this.prefix + '_ili_types_link'),
        columns: [
          {name: 'id', type: 'uuid'},
          {name: 'name', type: 'String'},
          {name: 'description', type: 'String'},
        ]
      },
      Item: {
        table: (this.prefix + '_ili_items'),
        columns: [
          {name: 'id', type: 'uuid'},
          {name: 'name', type: 'String'},
          {name: 'description', type: 'String'},
          {name: 'id_type_item', type: 'uuid'},
        ]
      },
      Link: {
        table: (this.prefix + '_ili_links'),
        columns: [
          {name: 'id', type: 'uuid'},
          {name: 'name', type: 'String'},
          {name: 'description', type: 'String'},
          {name: 'id_item', type: 'uuid'},
          {name: 'id_item_1', type: 'uuid'},
          {name: 'id_item_2', type: 'uuid'},
          {name: 'id_type_link', type: 'uuid'},
        ]
      },
    }
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

  async initDB() {
    const queryText = require('./core-ili-db-init').initDBPG.replace(/prefix_/g, 'app_')
    await this.queryDB(queryText)

  }

  async clearDB() {
    await this.queryDB('DROP TABLE IF EXISTS '
      + require('./core-ili-db-init').clearDBPG
        .map(tableName => tableName).join(', ').replace(/prefix_/g, 'app_') + ' CASCADE;')
  }

  async execute(scriptDB) {
    console.log(scriptDB)
    const client = await this.pool.connect()

    try {
      scriptDB.forEach(queue => {
        queue.forEach(record => {

        })
      })
    } catch {

    }
  }

  queryDB(queryText, params = []) {
    return new Promise((resolve, reject) => {
      this.pool
        .query(queryText, params, (err, rec) => {
          if (err) reject(err)
          resolve(rec)
        })
    })
      .then(rec => {
        //console.log('ilidbpg querydb then')
        //console.log(rec)
      })
      .catch(err => {
        //console.log('ilidbpg querydb catch')
        throw 'Error executing query' + err.stack
      })
  }
}


module.exports = {open: options => new CoreILIDBPG(options)}
