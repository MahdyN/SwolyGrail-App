import {React} from 'react'
import './Home.css'

function Home({user}) {
    return(
        <>
        <h1 id = "home">{user ? (<>Welcome {user.first_name}!</>) : (<>Welcome User!</>) }</h1>
        <div id = "image-box">
            <img src = "https://complete-physio.co.uk/wp-content/uploads/2020/06/7-tips-for-a-successful-return-to-the-gym-after-lockdown-1.jpg" width ="744"/>
        </div>
        <p id= 'home-text'>Welcome to SwolyGrail, where your health and fitness is our number one priority. <br/> 
            We are dedicated to providing you with accurate information regarding exercises <br/> and giving you the platform to create your very own workout schedule! </p>
        </>
    )
}

export default Home