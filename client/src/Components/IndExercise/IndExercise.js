import {React, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player'
import './IndExercise.css'

function IndExercise({exercises, userWorkouts, setUserWorkouts, isAuth, user}){
    
    const [showForm, setShowForm] = useState(false)
    const [day, setDay] = useState('')
    const [sets, setSets] = useState(0)
    const [reps, setReps] = useState(0)
    const [postErrors, setPostErrors] = useState([])

    let { group } = useParams();
    let { id } = useParams();


    const indExercise = exercises.filter((exercise) => {
        return exercise.id == id
    })[0]

    function handleClick() {
        setShowForm(!showForm)
        setPostErrors([])
        setDay('')
        setSets(0)
        setReps(0)
    }

    function handleWorkoutPost(e){
        e.preventDefault()

        const workout = {
            day: day,
            sets: sets,
            reps: reps,
            exercise_id: id
        }

        fetch('/workouts', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(workout)
        })
        .then(res => {
            if(res.ok) {
                res.json()
                .then((newWorkout) => {
                    console.log(newWorkout)
                    
                    setUserWorkouts([newWorkout, ...userWorkouts])
                    setDay('')
                    setSets(0)
                    setReps(0)
                    setShowForm(!showForm)
                    setPostErrors([])
                    alert(`${user.first_name}, this exercise was successfully added to your workout schedule!`)
                } )
            }
            else{
                res.json()
                .then(json => setPostErrors(json.errors))
            }
        })
    }



    

    
    return(
        <>
            <h1 className ='ind-ex-header-group'> {group} </h1>
            { indExercise ?(
                <div className = 'ind-ex-box'>
                    <h2 className ='ind-ex-header'> {indExercise.name} </h2>
                    <p className='ind-ex-desc'>{indExercise.description}</p>
                    <ReactPlayer controls url = {indExercise.form} />

                    {isAuth ?(
                        <>
                            {showForm ? (
                                <div className = "workout-form">
                                <form onSubmit={handleWorkoutPost}>
                                    <select onChange={(e) => setDay(e.target.value)}>
                                        <option value="">Select A Day</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                        <option value="Sunday">Sunday</option>
                                    </select>
                                    
                                    <label for="sets">Sets:</label>
                                    <input
                                        id= "sets"
                                        type="number"
                                        value={sets}
                                        onChange = {(e) => setSets(e.target.value)}
                                    >
                                    </input>

                                    <label for="reps">Reps:</label>
                                    <input
                                        id= "reps"
                                        type="number"
                                        value={reps}
                                        onChange = {(e) => setReps(e.target.value)}
                                    >
                                    </input>

                                    <button type ="submit" className = 'workout-form-submit'>Add Workout</button>
                                </form>

                                {postErrors ? postErrors.map(error => <div>{error} </div>)  : null }
                                
                                <button onClick={handleClick} className = "form-toggle">Go Back</button>
                                </div>
                            ) : (
                                <>
                                <button onClick={handleClick} className = "form-toggle">Add To Workouts</button>
                                </>
                            )}
                        </>
                    ):(
                        null
                    )}   
                </div>
            ):(
                null
            )}
            
        </>
    )
}

export default IndExercise
