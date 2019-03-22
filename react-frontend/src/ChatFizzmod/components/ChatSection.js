'use strict'

import React from 'react'
import './chatSection.css'

export default function ChatSection (props) {
    const { handleSubmit, messages, handleDateClass } = props

    return (
        <div className="chatSection">
            <div className="messages">
                {
                    messages.map((message, i) => {
                        const dateMessage = new Date(message.creado_en).toLocaleTimeString().slice(0, 17)

                        return (
                            <p 
                                onMouseEnter={ handleDateClass('in') }
                                onMouseLeave={ handleDateClass('out') }>

                                <span className="user">{ message.username }:</span> { message.cuerpo } 
                                <span className="dateHidden">{ dateMessage }</span>
                            </p>
                        )
                    })
                }
            </div>
            <form className="messageForm" onSubmit={ handleSubmit }>
                <input className="inputText" type="text" name="message" />
                <input className="inputButtom"type="submit" value="Enviar!" />

            </form>
        </div>
    )
}