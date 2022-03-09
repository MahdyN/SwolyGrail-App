import './App.css';
import { React, useEffect, useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import Exercises from '../Exercises/Exercises';
import Workouts from '../Workouts/Workouts';
import About from '../About/About';
import LogInPage from '../LogInPage/LogInPage';
import GroupExercises from '../GroupExercises/GroupExercises';
import IndExercise from '../IndExercise/IndExercise';
import IndWorkout from '../IndWorkout/IndWorkout';

function App() {

  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState(null)
  const [exercises, setExercises] = useState([])
  const [userWorkouts, setUserWorkouts] = useState([])
  const [workoutError, setWorkoutError] = useState([])

  useEffect(() => {
    fetch('/me')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(user => {
          setIsAuth(true)
          setUser(user)
        })
      }
    })

    fetch('/exercises')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(exerciseData => {
          setExercises(exerciseData)
        })
      }
    })

    fetch('/workouts')
    .then(res => {
      if(res.ok) {
        res.json()
        .then(userWorkoutData => {
          setUserWorkouts(userWorkoutData)
          setWorkoutError([])
        })
      }
      else {
        res.json()
        .then(json => {
          setWorkoutError(json.error)
        })
      }
    })
    
  }, [isAuth])




  return (
    <>
        <NavBar user = {user} setUser = {setUser} isAuth = {isAuth} setIsAuth = {setIsAuth} />

        <Routes>

          <Route path = '/' element = {<Home />} />
          <Route path = '/home' element = {<Home user = {user} />} />
          <Route path = '/all_exercises' element = {<Exercises exercises = {exercises}  />} />
          <Route path = '/my_workouts' element = {<Workouts userWorkouts={userWorkouts} workoutError = {workoutError} isAuth = {isAuth} user ={user}/>} />
          <Route path = '/about' element = {<About/>} />
          <Route path = '/login' element = {<LogInPage setUser={setUser} setIsAuth = {setIsAuth}/>} />
          <Route path = '/all_exercises/:group/:id' element = {<IndExercise exercises ={exercises} userWorkouts={userWorkouts} setUserWorkouts = {setUserWorkouts} isAuth = {isAuth} user ={user}/>} />
          {/* <Route path = '/all_exercises/:group' element = {<GroupExercises exercises ={exercises} isAuth = {isAuth}/>} /> */}
          <Route path = '/my_workouts/:id' element = {<IndWorkout userWorkouts = {userWorkouts} setUserWorkouts={setUserWorkouts} user ={user}/>} />
          
          

        </Routes>
    </>
  );
}

export default App;
