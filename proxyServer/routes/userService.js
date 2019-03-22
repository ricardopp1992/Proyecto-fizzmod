'use strict'

const axios = require('axios')

async function userService(req, res){
    const { url, method } = req

    if(url == '/user/signup'){
        const user = req.body 

        try {
            const resp = await axios({
                url: 'http://localhost:9000/signup-user',
                method: 'post',
                headers: { 'content-type': 'application/json' },
                data: JSON.stringify(user)
            })

            const data = resp.data

            res.writeHead(200, { 'content-type': 'application/js' })
            res.end(JSON.stringify(data))

        } catch(e) {
            console.log(e)

            res.writeHead(500, { 'content-type': 'application/json' })
            res.end()
        }

    } else if(url == '/user/signin'){
        const user = req.body 

        try {
            const resp = await axios({
                url: 'http://localhost:9000/user-authentication',
                method: 'post',
                data: JSON.stringify(user)
            })

            const data = resp.data

            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify(data))

        } catch(e) {
            console.log(e)

            res.writeHead(401, { 'content-type': 'application/json' })
            res.end()
        } 
    } else if(url == '/user/all') {
        try {
            const resp = await axios({
                url: 'http://localhost:9000/get-users'
            })

            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify(resp.data))

        } catch(e) {
            console.log(e)

            res.writeHead(500, { 'content-type': 'text/plain' })
            res.end()
        }
    }
}

module.exports = userService