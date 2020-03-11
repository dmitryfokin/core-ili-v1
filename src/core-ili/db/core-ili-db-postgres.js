const pg = require('pg')

class CoreILIDBPG {
  constructor(options) {
    this.prefix = options.prefix
    this.pool = new pg.Pool(options)
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.pool
        .query('SELECT NOW()', (err, res) => {
          if (err) reject(err)
        })
    })
      .catch(err => {
        throw 'Error executing query' + err.stack
      })
  }
}


// connect() {
//   return new Promise((resolve, reject) => {
//     this.pool
//       .query('SELECT NOW()', (err, res) => {
//         if (err) {
//           console.log(err.stack)
//           reject()
//         } else {
//           console.log(res.rows[0])
//           resolve(res)
//         }
//       })
//   })
//     .then(res => console.log(res.rows[0]))
//     .catch(err => {
//       throw 'Error executing query' + err
//     })
// }


//const pool =


// .query('SELECT NOW()')
//   .then(res => console.log(res.rows[0]))
//   .catch(err => console.error('Error executing query', err.stack))


// class CoreILIDBPG {
//   constructor(options) {
//     // console.log('CoreILIDBPG constructor()')
//     this.prefix = options.prefix
//     this.pool = new pg.Pool(options)
//
//     ;(async () => {
//       await this.pool.connect()
//         .then(client => {
//           client
//             .query('SELECT NOW()', [])
//             .then(res => {
//               client.release()
//               console.log(res.rows[0])
//             })
//             .catch(err => {
//               client.release()
//               console.error('Ошибка выполнения запроса: ', err.stack)
//               throw 'Ошибка выполнения запроса: ' + err
//             })
//         })
//         .catch(err => {
//           console.error('Ошибка подключения: ', err.stack)
//           throw 'Ошибка подключения: ' + err
//         })
//     })()
//   }


//   pool.connect((err, client, release) => {
//     if (err) {
//       return console.error('Error acquiring client', err.stack)
//     }
//     client.query('SELECT NOW()', (err, result) => {
//       release()
//       if (err) {
//         throw 'Ошибка выполнения запроса к БД'
//         // return console.error('Error executing query', err.stack)
//       }
//       console.log(result.rows)
//     })
//   })
//
// }


module.exports = {open: options => new CoreILIDBPG(options)}
