'use strict'

import React from 'react'

export default function SignupForm(props){
    const { urlAction, handleChangeForm, handleSubmit, onChangeInput } = props

    return(
        <form action={ urlAction } onSubmit={ handleSubmit }>
            <label className="allWidth" htmlFor="user">Nombre de usuario</label>
            <input onChange={ onChangeInput } className="allWidth" type="text" name="user" />
            <label className="allWidth" htmlFor="name">Nombre</label>
            <input onChange={ onChangeInput } className="allWidth" type="text" name="name" />
            <label className="allWidth" htmlFor="user">Apellido</label>
            <input onChange={ onChangeInput } className="allWidth" type="text" name="lastname" />
            <label className="allWidth" htmlFor="user">Email</label>
            <input onChange={ onChangeInput } className="allWidth" type="email" name="email" />
            <label className="allWidth" htmlFor="password">Contraseña</label>
            <input onChange={ onChangeInput } className="allWidth" type="password" name="password" />

            <input className="submitButton" type="submit" value="Registrse" />

            <p>¿Ya tienes cuenta? <a onClick={ handleChangeForm('signup') } href="">Ingresa Aquí</a></p>
        </form>
    )
}