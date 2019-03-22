'use strict'

const connection = require('../database/connection')
// const uuid = require('uuid/v4')

function hexToken(){
    return Math.floor(Math.random() * 1e8).toString(16)
}

function getUsers(){
    return new Promise((res, rej) => {
        let selectSql = 'SELECT nombre_de_usuario as user, s.descripcion as status FROM usuario as u'
        selectSql += " INNER JOIN status_usuario as s ON s.id_status = u.id_status;"

        connection.query(selectSql, (err, result, fields) => {
            if(err) {
                rej({ message: err })

            } else {
                res(result)

            }

        })
    })
}

function createUser(userObj){
    const { name, lastname, user, password, email } = userObj
    const currentDate = new Date()
    const createAt = `${ currentDate.toISOString().slice(0,10) } ${ currentDate.toLocaleTimeString() }`

    
    return new Promise((res, rej) => {
        const insertSql = 'INSERT INTO usuario (nombre, apellido, nombre_de_usuario, contraseña, email, creado_en, actualizado_en, id_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        
        const userArray = [name, lastname, user, password, email, createAt, createAt, 1]

        connection.query(insertSql, userArray, (err, result, fields) => {
            if(err){
                rej({message: err})
            
            }else if (result.affectedRows == 1){
                res({resp: true, message: 'user created successful'})

            } else {
                rej({resp: false, message: 'a something really weird has happened'})
            }
        })
    })
}

function userAuthentication(userObj){
    const { user, password } = userObj

    return new Promise((res, rej) => {
        const selectSql = 'SELECT * FROM usuario WHERE nombre_de_usuario = ? AND contraseña = ?'
        const userInfo = [user, password]

        connection.query(selectSql, userInfo, async (err, rows, fields) => {
            if(err){
                rej({message: err})

            } else if(rows.length == 1){
                const userId = rows[0].id_usuario
                const token = hexToken()

                try{
                    await setToken(userId, token)
                    res({resp: true, message: 'authentication success', token, user})

                } catch(e) {
                    rej({message: e})
                }

            } else if(rows.length == 0){

                rej({resp: false, message: 'No user found'})

            }
        })
    })
}

function userAuthorization(token, username){
    return new Promise((res, rej) => {
        const selectSql = 'SELECT count(*) as isAuthenticated from usuario WHERE token = ? AND nombre_de_usuario = ?'
        
        connection.query(selectSql, [token, username], (err, result, fields) => {
            if(err){
                rej({message: err})

            } else if(result[0].isAuthenticated == 1){
                res({resp: true, message: 'is authorized'})

            } else {
                rej({resp: false, message: 'isn\'t authorized'})
            }
        })
    })
}

function setToken(userId, token){
    return new Promise((res, rej) => {
        connection.query('UPDATE usuario SET token = ? WHERE id_usuario = ?', [token, userId], (err, rows, fields) => {
            if(err){
                rej(err)

            } else if(rows.affectedRows == 1) {
                res({message: 'token updated successful'})
            }
        })

    })
}

module.exports = {
    createUser,
    userAuthentication,
    userAuthorization,
    getUsers
}