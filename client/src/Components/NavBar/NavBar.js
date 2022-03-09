import {React} from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

function NavBar({user, setUser, isAuth, setIsAuth}) {

    function handleLogOut() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(() => {
            setUser(null)
            setIsAuth(false)
        })
    }

    return(

        <header className ="nav-header">
            <NavLink to = "/home"><h1>SwolyGrail &trade; </h1></NavLink>
            <nav>
                <ul className = 'nav-links'>
                    <li><NavLink to = "/home">Home</NavLink></li>
                    <li><NavLink to = "/all_exercises">Exercises</NavLink></li>
                    <li><NavLink to = "/my_workouts">{ user ?(
                        <>{user.first_name}'s Workouts</>
                    ) : (
                         <>Workouts</>
                    )}</NavLink></li>
                    <li><NavLink to = "/about">About</NavLink></li>
                </ul>
            </nav>
            {isAuth ? (
                    <NavLink to = "/" onClick = {handleLogOut}><button>Log Out</button></NavLink>
                ) : (
                    <NavLink to = "/login"><button>Log In</button></NavLink>
                )}
        </header>
    )
}

export default NavBar