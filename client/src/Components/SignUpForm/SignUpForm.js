import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css'

function SignUpForm({setUser, setIsAuth}) {

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [signupErrors, setSignupErrors] = useState([])

    function handleSignUp(e) {
        e.preventDefault()

        const user ={
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password,
            password_confirmation: passwordConfirmation
        }

        fetch('/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                res.json()
                .then(user => {
                    setUser(user)
                    setIsAuth(true)
                    navigate('/home')
                })
            }
            else{
                res.json()
                .then(json => setSignupErrors(json.errors))
            }
        })
    }


    return(
        <form onSubmit={handleSignUp} className= "signup-form">
             <input 
                type = 'text'
                value = {firstName}
                onChange = {(e) => setFirstName(e.target.value)}
                placeholder = "First Name"
                required
            />
            <input 
                type = 'text'
                value = {lastName}
                onChange = {(e) => setLastName(e.target.value)}
                placeholder = "Last Name"
                required
            />
             <input 
                type = 'text'
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
                placeholder = "Username"
                required
            />
            <input 
                type = 'password'
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                placeholder = "Password"
                required
            />
            <input 
                type = 'password'
                value = {passwordConfirmation}
                onChange = {(e) => setPasswordConfirmation(e.target.value)}
                placeholder = "Password Confirmation"
                required
            />
            <button type = "submit">
                Sign Up
            </button>

            { signupErrors ? signupErrors.map(e => <div key={e}>{e}</div>) : null}

        </form>
    )


}

export default SignUpForm