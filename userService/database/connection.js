'use strict'

const mysql = require('mysql')

const { user, password, database } = require('../config')

const pool = mysql.createPool({
    host: 'localhost',
    connectionLimit: 20,
    user,
    password,
    database
})

pool.query('SELECT 1 + 1 as sol', (err, result, field) => {
    if(err){
        console.log(err)
    }

    console.log(`Database is connected -> 1 + 1 = ${ result[0].sol }`)
    
})

module.exports = pool