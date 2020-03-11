const config = require('config')
const ili = require('./core-ili/core-ili')

async function start() {
  try {
    await ili.connect(config.get('dbConfig'))
    ili.use()
    ili.disconnect()
  } catch (err) {
    console.error(err)
  }
}

start()