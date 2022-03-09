import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './LogInForm.css'

function LogInForm({setUser, setIsAuth}) {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')

    function handleLogIn(e){
        e.preventDefault()

        const user = {
            username: username,
            password: password
        }

        fetch('/login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
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
                .then(json => setLoginError(json.error))
            }
        })
    }


    return(
        <form onSubmit={handleLogIn} className = "login-form">
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

            <button type = "submit">
                Log In
            </button>
                
            {loginError ? <div>{loginError}</div> : null }

        </form>
    );


}

export default LogInForm

