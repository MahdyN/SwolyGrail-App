import {React} from 'react'
import { NavLink } from 'react-router-dom'
import './Workouts.css'

function Workouts({isAuth, userWorkouts, workoutError, user}) {
    
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    
    

    return(

        
        <>
        {isAuth ? (
            <>
                <h1 className = "workouts">{user ? (<>{user.first_name}'s Workout Schedule </>) : null } </h1>
                <div className ="workout-box">
                    {days.map((day) => (
                        <div className = "day-div" key ={day}>
                            <h2 className ='day-header'>{day}</h2>
                            <ul className ='workout-list'>
                                    { 
                                    userWorkouts.filter((workout) => {
                                        return workout.day === day
                                    }).map((dayWorkout) => (
                                        <li key = {dayWorkout.id}>
                                            <NavLink to ={`/my_workouts/${dayWorkout.id}`}>{dayWorkout.exercise.name} <br/> <br/> <u>Group:</u> {dayWorkout.exercise.group} <br/> <br/><u>Sets:</u> {dayWorkout.sets} <br/> <br/> <u>Reps:</u> {dayWorkout.reps}</NavLink>
                                        </li>
                                    ))
                                    }
                            </ul>
                        </div>
                    ))}
                </div>
            </>
        ) : (
            <h1 className = "workouts" >{workoutError}</h1>
        )}
        </>

        
        
    )
}

export default Workouts