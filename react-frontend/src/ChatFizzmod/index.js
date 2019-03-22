'use strict'

import React, { Component } from 'react'

import ChatSection from './components/ChatSection'
import ConnectedUsers from './components/ConnectedUsers'

export default class ChatFizzmod extends Component{
    constructor(){
        super()

        this.state = {
            connectedUser: [],
            messages: []
        }
    }

    refreshingChat = () => {
        const respMessage = fetch('http://localhost:8000/message/all')
        const respUser = fetch('http://localhost:8000/user/all')

        const resp = Promise.all([respMessage, respUser])
        resp
        .then(arrayPromise => arrayPromise.map((respJson) => respJson.json()))
        .then(dataArray => Promise.all(dataArray))
        .then(data => {
            console.log(data[0])
            console.log(data[1])
            this.setState({
                messages: data[0],
                connectedUser: data[1]
            })
        })

        
    }

    componentWillMount(){
        this.refreshingChat()
    }

    handleDateClass = (io) => {
        return (e) => {
            const dateSpan = e.target.childNodes[3]
            
            if(io == 'in'){
                dateSpan.className = "dateMessage"

            } else if(io == 'out') {
                dateSpan.className = "dateHidden"
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const currentDate = new Date()
        const createAt = `${ currentDate.toISOString().slice(0,10) } ${ currentDate.toLocaleTimeString() }`
        
        const message = {
            body: e.target[0].value,
            username: sessionStorage.getItem('username'),
            createAt: createAt
        }

        const resp = fetch('http://localhost:8000/message/insert', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(message)
        })

        resp
            .then(data => {
                this.refreshingChat()
            })
            .catch(e => {
                console.error(e)
            })

    }

    render(){
        const { connectedUser, messages } = this.state

        return(
            <div className="chat">

                <ChatSection
                    handleDateClass={ this.handleDateClass }
                    handleSubmit={ this.handleSubmit }
                    messages={ messages } />

                <ConnectedUsers 
                    connectedUsers={ connectedUser } />
            </div>
        )
    }
}