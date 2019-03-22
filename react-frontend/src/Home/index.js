'use strict'

import React, { Component } from 'react'

import SigninForm from '../SigninForm/index'
import SignupForm from '../SignupForm/index'
import './formStyle.css'

export default class Home extends Component{
    constructor(){
        super()

        this.state = {
            isSignup: true,
            name: '',
            lastname: '',
            user: '',
            password: '',
            email: ''
        }
    }

    onChangeInput = (e) => {
        const  { name, value } = e.target

        this.setState({
            [name]: value
        })
    } 

    handleChangeForm = (type) => {
        switch(type){
            case 'signup':
                return  (e) => {
                    e.preventDefault()

                    this.setState({
                        isSignup: false
                    })
                }
            case 'signin':
                return (e) => {
                    e.preventDefault()

                    this.setState({
                        isSignup: true
                    })
            }
        }
    }

    signupSubmit = (e) => {
        e.preventDefault()

        const { name, lastname, user, password, email } = this.state
        const body = {
            name,
            lastname,
            user,
            password,
            email
        }

        const resp = fetch('http://localhost:8000/user/signup', {
        // const resp = fetch('https://httpbin.org/post', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body)
        })

        resp
        .then(data => data.json())
        .then(data => {
            if(data.resp){
                alert('Te has registrado exitósamente')

            }else {
                alert('ha ocurrido un error')
            }
        })
        .catch(err => {
            console.error(err)
        })
    }
    
    signinSubmit = (e) => {
        // console.log("signin")
        e.preventDefault()
        const { user, password } = this.state

        const resp = fetch('http://localhost:8000/user/signin', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                user,
                password
            })
        })

        resp
        .then(dataJson => dataJson.json())
        .then(data => {
            if(data.resp){
                //redireccionar
                window.sessionStorage.setItem('token', data.token)
                window.sessionStorage.setItem('username', data.user)
                window.location.replace('http://localhost:8000/chat-fizzmod')

            }
        })
        .catch( err => {
            if(err){
                console.error('Some error: ', err.message)
            }
            
            alert('usuario o clave inválida')
            console.log('fail authenticate')
        })
    }

    render(){
        const { isSignup } = this.state

        return(
            <div className="application">
                
                <div className="formularop">
                    {
                        isSignup ? 
                        <SignupForm
                            onChangeInput={ this.onChangeInput }
                            handleChangeForm={ this.handleChangeForm }
                            handleSubmit={ this.signupSubmit }
                            urlAction="" /> 
                            :
                        <SigninForm 
                            onChangeInput={ this.onChangeInput }
                            urlAction=""
                            handleChangeForm={ this.handleChangeForm }
                            handleSubmit={ this.signinSubmit } />
                    }
                </div>
            </div>
        )
    }
}