// vendor libraries
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'
import { graphql } from 'react-apollo'
import flowright from 'lodash.flowright'

// custom module
import { createUserMutation } from '../../graphql/mutations'
import './shit.css'

const RegisterPage = props => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gotoLogin, setGotoLogin] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)


    const register = e => {
        e.preventDefault()

        props.createUserMutation({
            variables: {
                name: name,
                username: username,
                email: email,
                password: password
            }
        }).then(response => {
            const userAdded = response.data.createUser

            if(userAdded) {
                Swal.fire({
                    title: 'Registration Successful',
                    text: 'You will now be redirected to the login.',
                    type: 'success'
                }).then(() => {
                    setGotoLogin(true)
                })
            } else {
                Swal.fire({
                    title: 'Registration Failed',
                    text: 'The server encountered an error.',
                    type: 'error'
                })
            }
        })
    }

    const checkPassword = (password) => {
        setPassword(password)

        if (password.length >= 8) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }

    if(gotoLogin) {
        return <Redirect to="/login?register=true" />
    }




    return(
        <>
        <div class="login-box">
        <h2>Register</h2>
        <form onSubmit={e => register(e)}>
            <div class="user-box">
            <input value={name} onChange={e => setName(e.target.value)} type="text" name="" required="" />
            <label>Name</label>
            </div>
            <div class="user-box">
            <input value={username} onChange={e => setUsername(e.target.value)} type="text" name="" required="" />
            <label>Username</label>
            </div>
            <div class="user-box">
            <input value={email} onChange={e => setEmail(e.target.value)} type="text" name="" required="" />
            <label>Email</label>
            </div>
            <div class="user-box">
            <input value={password} onChange={e => checkPassword(e.target.value)} type="password" name="" required="" />
            <label>Password</label>
            </div>
            <button>Submit</button>
        </form>
        </div>
        </>
    )
}

export default flowright(
    graphql(createUserMutation, { name: 'createUserMutation' })
)(RegisterPage)