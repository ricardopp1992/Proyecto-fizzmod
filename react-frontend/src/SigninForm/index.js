'use strict'

import React from 'react'

export default function SigninForm(props){
    const { urlAction, handleChangeForm, handleSubmit, onChangeInput } = props

    return(
        <form action={ urlAction } onSubmit={ handleSubmit } >
            <label className="allWidth" for="user">Usuario</label>
            <input onChange={ onChangeInput } className="allWidth" type="text" name="user" />
            <label className="allWidth" for="password">Contraseña</label>
            <input onChange={ onChangeInput } className="allWidth" type="password" name="password" />

            <input className="submitButton" type="submit" value="Ingresar al chat" />

            <p>¿No tienes cuenta aún? <a onClick={ handleChangeForm('signin') } href="">Regístrate Aquí</a></p>
        </form>
    )
}