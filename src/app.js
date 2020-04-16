const path = require('path')
const config = require('config')
const ili = require('./core-ili/core-ili')
const express = require('express')
const PORT = 4200

const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use((req, res, next) => {
  res.sendFile(path.join('/index.html'))

  next()
})

async function start() {
  try {
    await ili.connect(config.get('dbConfig'))
    // await ili.use()
    // await ili.clearDB()
    // await ili.initDB()
    // await ili.queryDB('select * from ili_items', [])
    //await ili.queryDB('SELECT NOW()', [])
    // await ili.disconnect()
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`)
    })
  } catch (err) {
    console.error('app', err)
  }
}

start()