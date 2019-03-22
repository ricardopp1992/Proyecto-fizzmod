'use strict'

const axios = require('axios')

async function messageService(req, res){
    const { url, method } = req 

    if (url == '/message/all' && method == 'GET'){
        try {
            const resp = await axios({
                url: 'http://localhost:7000/get-messages',
                method: 'get'
            })

            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify(resp.data))
            
        } catch(e) {
            console.log(e)

            res.end()

        }

    } else if(url == '/message/insert' && method == 'POST'){
        const { body, createAt, username } = req.body

        try {
            const resp = await axios({
                url: 'http://localhost:7000/insert-message',
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                data: {
                    body,
                    createAt,
                    username
                }
            })

            res.writeHead(resp.status , { 'content-type': 'application/json' })
            res.end()

        } catch(e) {
            console.log(e)
            res.writeHead(500, { 'content-type': 'text/plain' })
            res.end()
        }  
    }
}

module.exports = messageService