'use strict'
const fs = require('fs')
const path = require('path')


function home (req, res) {
    const { url } = req

    if(url == '/'){
        const index = fs.createReadStream(path.join(__dirname, '../../frontend/index.html'))

        res.writeHead(200, { 'content-type': 'text/html' })
        index.pipe(res)

    }else if(url == '/home.js'){
        const indexJs = fs.createReadStream(path.join(__dirname, '../../frontend/build/js/home.js'))
        
        res.writeHead(200, { 'content-type': 'application/javascript' })
        indexJs.pipe(res)
        
    }else if(url == '/home.css'){
        const indexCss = fs.createReadStream(path.join(__dirname, '../../frontend/build/css/home.css'))

        res.writeHead(200, { 'content-type': 'text/css' })
        indexCss.pipe(res)
    }
}

module.exports = {
    home
} 