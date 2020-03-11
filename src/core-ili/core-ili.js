const CoreILIDBPG = require('./db/core-ili-db-postgres')

class CoreILI {

  constructor() {

    this.options = {}
    this.connected = false
    this.db = null

  }

  async connect(options) {
    this.options = options

    if (this.options.dbDriver === 'postgres') {
      this.db = CoreILIDBPG.open(this.options)

      try {
        await this.db.connect()
      } catch (err) {
        throw 'Ошибка БД: ' + err
      }
    } else {
      throw 'Поддерживается, только, PostgreSQL база данных'
    }
  }

  disconnect() {
    this.db.disconnect()
  }

  use() {
    console.log('core-ili use()')
  }

  // TODO: определить функцию заполнения параметров
  defineParameters(options) {
  }
}

module.exports = new CoreILI
