class CoreILI {
  constructor(options) {
    this.options = options
    this.connected = false
    this.db = null


    if (options.autoConnect || true) {
      try {
        this.connectDB()
        this.connected = true
      } catch (error) {
        this.connected = false
      }
    }
  }

  connectDB() {
    if (this.options.dbConfig.dbDriver === 'postgres') {
      this.db = require('./db/core-ili-db-postgres').open(this.options)


    } else {
      throw 'Поддерживается, только, PostgreSQL база данных'
    }
  }
}




