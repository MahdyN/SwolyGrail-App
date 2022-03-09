import {React, useState} from 'react'
import './LogInPage.css'
import LogInForm from '../LogInForm/LogInForm'
import SignUpForm from '../SignUpForm/SignUpForm'

function LogInPage({setUser, setIsAuth}) {

    const [showLogIn, setShowLogIn] = useState(true)


    return(
        <div className = "form-box">
            {showLogIn ?(
                <h1 className = "form-header" >Log-In</h1>
            ):(
                <h1 className = "form-header" >Sign-Up</h1>
            )}

            {showLogIn ?(
                <>
                <LogInForm setUser = {setUser} setIsAuth={setIsAuth} />
                <div className = "toggle" >
                    <p>No Account?</p>
                    <button className = "toggle-btn" onClick = {() => setShowLogIn(false)}>Sign Up</button>
                </div>
                </>
            ):(
                <>
                <SignUpForm setUser = {setUser} setIsAuth={setIsAuth} />
                <div className = "toggle" >
                    <p>Already Have An Account?</p>
                    <button className = "toggle-btn" onClick = {() => setShowLogIn(true)}>Log-In</button>
                </div>
                </>
            )}
        </div>
    )
}

export default LogInPage