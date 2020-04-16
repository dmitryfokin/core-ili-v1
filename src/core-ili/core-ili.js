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
        throw new Error('Ошибка БД: ' + err)
      }
    } else {
      throw new Error('Поддерживается, только, PostgreSQL база данных')
    }
  }

  disconnect() {
    this.db.disconnect()
  }

  async use(script) {
    // TODO: Валидация данных

    // создаем правильную последовательность скриптов
    const scriptDB = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
      13: [],
      14: [],
      15: [],
      16: [],
      17: [],
      18: [],
      19: [],
      99: [],
    }

    script.actions.forEach(item => {
      if (item.action === 'create' && item.type === 'TypeLink') {
        scriptDB[1].push(item)
      } else if (item.action === 'update' && item.type === 'TypeLink') {
        scriptDB[2].push(item)
      } else if (item.action === 'create' && item.type === 'TypeItem') {
        scriptDB[3].push(item)
      } else if (item.action === 'update' && item.type === 'TypeItem') {
        scriptDB[4].push(item)
      } else if (item.action === 'create' && item.type === 'Item') {
        scriptDB[5].push(item)
      } else if (item.action === 'update' && item.type === 'Item') {
        scriptDB[6].push(item)
      } else if (item.action === 'create' && item.type === 'Link') {
        scriptDB[7].push(item)
      } else if (item.action === 'update' && item.type === 'Link') {
        scriptDB[8].push(item)
      } else if (item.action === 'destroy' && item.type === 'Link') {
        scriptDB[9].push(item)
      } else if (item.action === 'destroy' && item.type === 'Item') {
        scriptDB[10].push(item)
      } else if (item.action === 'destroy' && item.type === 'TypeItem') {
        scriptDB[11].push(item)
      } else if (item.action === 'destroy' && item.type === 'TypeLink') {
        scriptDB[12].push(item)
      } else {
        scriptDB[99].push(item)
      }
    })

    // запускаем в БД
    this.db.execute(scriptDB)
  }

  async clearDB() {
    await this.db.clearDB()
  }

  async initDB() {
    await this.db.initDB()

    const script = {actions: []}

    const iliTypesItem = require('./db/core-ili-db-init').iliTypesItem
    script.actions = iliTypesItem.map(item => {
      return {
        action: 'create',
        type: 'TypeItem',
        data: item,
      }
    })

    const iliTypesLinks = require('./db/core-ili-db-init').iliTypesLink
    script.actions = [...script.actions, ...iliTypesLinks.map(item => {
      return {
        action: 'create',
        type: 'TypeLink',
        data: item,
      }
    })]


    this.use(script)
  }

  async queryDB(queryText, params) {
    try {
      await this.db.queryDB(queryText, params)
    } catch (err) {
      throw 'Ошибка БД: ' + err
    }
  }

  // TODO: определить функцию заполнения параметров
  defineParameters(options) {
  }
}

module.exports = new CoreILI
