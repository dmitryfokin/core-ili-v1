const config = require('config')
const ili = require('./core-ili/core-ili')

async function start() {
  try {
    await ili.connect(config.get('dbConfig'))
    // await ili.use()
    await ili.clearDB()
    await ili.initDB()
    // await ili.queryDB('select * from ili_items', [])
    //await ili.queryDB('SELECT NOW()', [])
    await ili.disconnect()
  } catch (err) {
    console.error('app', err)
  }
}

start()