'use strict'

import React from 'react'
import { render } from 'react-dom'

function DeniedAcces(){
    return (
        <div>
            <p>Acceso denegado al Chat - Fizzmod</p>
            <p>Intenta logearte primero... <a href="http://localhost:8000/">Ir al inicio</a></p>
        </div>
    )
}

const root = document.getElementById('root')

render(<DeniedAcces />, root)