'use strict'

import React from 'react'
import './connectedUsers.css'

export default function ConnectedUsers (props) {
    const { connectedUsers } = props

    return(
        <div className="connectedUser">
            { 
                connectedUsers.map((user, i) => {
                    return (
                        <div>
                            <p>{ user.user }</p>
                            <div className={ `${user.status == 'Conectado' ? 'online' : 'offline'} dot` } />
                        </div>
                    )
                })
            }
        </div>
    )
}