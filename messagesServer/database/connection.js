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

pool.query('SELECT 1 + 1 as solution', (err, result, fields) => {
    console.log(`Database connected -> 1 + 1 : ${ result[0].solution }`)
})

module.exports = pool