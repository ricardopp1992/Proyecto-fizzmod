'use strict'

const fs = require('fs')
const path = require('path')
const axios = require('axios')

async function chatFizzmod (req, res) {
    const { url, method } = req 

    if(url == '/chat-fizzmod') {
        const chatIndex = fs.createReadStream(path.join(__dirname, '../../frontend/chatapplication.html'))

        res.writeHead(200, { 'content-type': 'text/html' })
        chatIndex.pipe(res)

    } else if (url == '/chat-fizzmod/authentication.js'){   // getting Authorization
        const authenticationJs = fs.createReadStream(path.join(__dirname, '../../frontend/build/js/authentication.js'))
        
        res.writeHead(200, { 'content-type': 'application/javascript' })
        authenticationJs.pipe(res)

    }else if (url == '/chat-fizzmod/chat.js' && method == 'POST') {
        const user = req.body

        // if the user is authorized we will provide the chat.js else will provide denied.js
        try{
            //call to axios
            const resp = await axios({
                url: 'http://localhost:9000/get-authorization',
                method: 'post',
                data: JSON.stringify(user)
            })
            
            const chatJs = fs.createReadStream(path.join(__dirname, '../../frontend/build/js/chat.js'))

            res.writeHead(200, { 'content-type': 'text/plain' })
            chatJs.pipe(res)

        } catch(e) {
            console.log(e)
            const deniedIndex = fs.createReadStream(path.join(__dirname, '../../frontend/build/js/denied.js'))

            deniedIndex.pipe(res)
        }

    } else if(url == '/chat-fizzmod/chat.css'){
        const chatCss = fs.createReadStream(path.join(__dirname, '../../frontend/build/css/chat.css'))

        res.writeHead(200, { 'content-type': 'text/css' })
        chatCss.pipe(res)
    }    
}

module.exports = chatFizzmod