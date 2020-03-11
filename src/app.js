const config = require('config')
const ili = require('./core-ili/core-ili')

;(async () => {
  try {
    await ili.connect(config.get('dbConfig'))
    ili.connected ? coreILI.use() : null
  } catch (err) {
    console.error(err)
  }
})()
