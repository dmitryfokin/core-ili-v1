const pg = require('pg')

class CoreILIDBPG {
  constructor(options) {
    this.prefix = options.prefix
    this.db = new pg.Pool(options.dbConfig)

    throw 'Проверка вызова исключения из конструктора'
  }

}

module.exports = {open: options => new CoreILIDBPG(options)}
