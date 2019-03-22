'use strics'

const http = require('http')

const { port } = require('./config')  // port 7000
const myBodyParse = require('../utils/myBody-parse')
const routes = require('./routes/routes')
const server = http.createServer()

server.on('request', async (req, res) => {
    await myBodyParse(req)

    // Routes
    routes(req, res)

    //handle errors
})

server.listen(port, () => {
    console.log(`Message server listen on: ${ port }`)
})