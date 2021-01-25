// vendor module
import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import Swal from 'sweetalert2'
import { Redirect } from 'react-router-dom'
import flowright from 'lodash.flowright'

// custom module
import './shit.css'
import { loginMutation } from '../../graphql/mutations'


const LoginPage = (props) => {
console.log(props)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRedirected, setIsRedirected] = useState(false)

    const login = e => {
        e.preventDefault()
        
        props.loginMutation({
            variables: {
                email: email,
                password: password
            }
        }).then(response => {
            let data = response.data.login
            
            if(data !== null) {
                localStorage.setItem('name', data.name)
                localStorage.setItem('role', data.role)
                localStorage.setItem('token', data.token)
                setIsRedirected(true)
            } else {
                Swal.fire({
                    title: 'Login Failed',
                    text: 'Either your email or password is incorrect, please try again.',
                    type: 'error'
                })
            }
        })
    }

    if(isRedirected || props.token != null) {
        props.updateSession()
        return <Redirect to='/' />
    }

    return(
        <>
        <div class="login-box">
        <h2>Login</h2>
        <form onSubmit={e => login(e)}>
            <div class="user-box">
            <input value={email} onChange={e => setEmail(e.target.value)} type="text" name="" required="" />
            <label>Email</label>
            </div>
            <div class="user-box">
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="" required="" />
            <label>Password</label>
            </div>
            <button>Submit</button>
        </form>
        </div>
        </>
    )
}

export default flowright(
    graphql(loginMutation, { name: 'loginMutation' })
)(LoginPage)