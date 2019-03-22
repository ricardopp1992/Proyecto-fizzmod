'use strict'

const connection = require('../database/connection')

function getMessages(){
    return new Promise((res, rej) => {
        let selectSql = "SELECT cuerpo, m.creado_en, u.nombre_de_usuario AS username"
        selectSql += " FROM mensaje AS m INNER JOIN usuario as u ON m.id_usuario = u.id_usuario"
        selectSql += " ORDER BY m.creado_en ASC"

        connection.query(selectSql, (err, results, fields) => {
            if(err){
                rej(err)

            } else {
                res(results)
            }
        })
    })
}

function insertMessage(message){
    const { body, createAt, username } = message

    return new Promise((res, rej) => {
        // Sub consulta SQL
        const userIdSql = 'SELECT id_usuario FROM usuario WHERE nombre_de_usuario = ?'
        const insertSql = `INSERT INTO mensaje (cuerpo, creado_en, actualizado_en, id_usuario, id_status) VALUES (?, ?, ?, (${ userIdSql }), ?)`
        const messageArray = [body, createAt, createAt, username, 0]

        connection.query(insertSql, messageArray, (err, result, fields) => {
            if(err){
                rej({resp: false, message: err})

            } else {
                res({resp: true, message: 'message inserted successfully'})
            }
        })
    })
}

module.exports = {
    getMessages,
    insertMessage
}