'use strict'

const mysql = require('mysql')

const { user, password, database } = require('../config')

const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user,
    password,
    database
})

pool.query('SELECT 1 + 1 as solution', (err, res, field) => {
    if(err){
        console.error(err)

    }
    
    console.log('Database connected: ', res[0].solution)
})



module.exports = pool