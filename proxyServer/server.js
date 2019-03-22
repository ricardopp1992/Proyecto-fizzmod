'use strict'

const http = require('http')

// const connection = require('./database/connection')
const myBodyParse = require('../utils/myBody-parse')
const { home } = require('./routes/routes')
const chatFizzmod = require('./routes/chatFizzmod')
const userService = require('./routes/userService')
const messageService = require('./routes/messagesService')
const { port } = require('./config')

const server = http.createServer()

server.on('request', async (req, res) => {
    const { url } = req
    
    
    await myBodyParse(req)

    //Sirviendo la página de login de usuario
    if(url == '/home.js' || url == '/home.css' || url == '/'){
        home(req, res)

    } else if (url == '/chat-fizzmod/authentication.js' || url == '/chat-fizzmod/chat.js' || url == '/chat-fizzmod/chat.css' || url == '/chat-fizzmod') {
        chatFizzmod(req, res)
    }

    // ROUTES
    // hacer una RegEx que si comienza con /user entre a este "middleware"
    userService(req, res)

    //hacer una RegEx que si comienza con /message entre a este otro "middleware"
    messageService(req, res)

    //manejando errores
    req.on('error', (err) => {
        console.log('error: ', err)
    })
})

//                                                          not sure yet
// server.on('clientError', (err, socket) => {
//     socket.end('404 ERROR')

// })


server.listen(port, () => {
    console.log(`Server running on port: ${ port }`)
})