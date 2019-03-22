'use stritc'

const { createUser, userAuthorization, userAuthentication, getUsers } = require('../models/method.js')

async function routes (req, res) {
    const { url, method } = req

    if(url == '/signup-user' && method == 'POST'){
        const  user  = req.body

        try{
            const resp = await createUser(user)

            console.log(resp)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify(resp))

        } catch(e) {
            console.log(e)
            res.writeHead(404, { 'content-type': 'application/json' })
            res.end(JSON.stringify(e))
        }

    } else if (url == '/user-authentication' && method == 'POST'){
        console.log(url)
        const user = req.body
        
        try {
            const resp = await userAuthentication(user)

            console.log(resp)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify(resp))

        } catch(e) {
            console.log('error: ', e)
            res.writeHead(404, { 'content-type': 'application/json' })
            res.end(JSON.stringify(e))
        }

    } else if(url == '/get-authorization') {
        const { token, username } = req.body

        try {
            const isAuthorized = await userAuthorization(token, username)

            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify(isAuthorized))

        } catch(e) {
            console.log(e)

            res.writeHead(407, { 'content-type': 'application/json' })
            res.end(JSON.stringify(e))
        }

    } else if(url == '/get-users') {
        try {
            const resp = await getUsers()

            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify(resp))

        } catch(e) {
            console.log(e)

            res.writeHead(500)
            res.end()
        }
    }
}

module.exports = routes