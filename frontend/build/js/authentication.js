'use strict'

const body = {
    token:  sessionStorage.getItem('token'),
    username: sessionStorage.getItem('username')
}

function run(){
    const resp = fetch('http://localhost:8000/chat-fizzmod/chat.js', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    })
    
    resp
    .then(data => {
        return data.text()
    })
    .then(body => {
        const scriptElement = document.createElement('script')
        const scriptContent = document.createTextNode(body)
        
        scriptElement.appendChild(scriptContent)
        document.body.appendChild(scriptElement)
        
    })
    .catch(e => {
        console.error(e)
        window.location.replace('http://localhost:8000/access-denied')
    })
}

run()