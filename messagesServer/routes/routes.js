'use strict'

const { getMessages, insertMessage } = require('../models/method')

async function routes (req, res){
    const { url, method } = req

    if(url == '/get-messages' && method == 'GET'){
        try{
            const resp = await getMessages()

            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify(resp))

        } catch(e) {
            console.log(e)

            //comparar el error
            res.writeHead(500, { 'content-type': 'text/plain' })
            res.end()
        }

    } else if (url == '/insert-message' && method == 'POST') {
        const  message = req.body

        try {
            const resp = await insertMessage(message)

            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify(resp))

        } catch(e) {
            console.log(e)

            res.writeHead(500, 'Server Internal Error' , { 'content-type': 'text/plain' })
            res.end()
        }
    }
}

module.exports = routes