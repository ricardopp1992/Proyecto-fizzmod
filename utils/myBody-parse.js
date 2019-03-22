'use strict'

function myBodyParse(req, next){
    return new Promise((res, rej) => {
        let bodyString = ''
    
        req.on('data', chunk => {
            bodyString += chunk
    
        })

        req.on('end', () => {
            if(bodyString.length){
                req.body = JSON.parse(bodyString)
                // console.log(`myBody-parse module: ${ JSON.stringify(req.body) }`)
                res()

            } else {
                res()

            }

        })

        req.on('error', (err) => {
            rej(err)
        })
    })

}

module.exports = myBodyParse