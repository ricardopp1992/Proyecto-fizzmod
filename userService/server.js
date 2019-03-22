'use strict'

const http = require('http')

const myBodyParse = require('../utils/myBody-parse')
const { port } = require('./config') // port 9000

const routes = require('./routes/routes')
const server = http.createServer()

server.on('request', async (req, res) => {
    await myBodyParse(req)

    // ROUTES
    routes(req, res)
})

server.listen(port, () => {
    console.log(`User server listen on: ${ port }`)
})