import {React, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player'
import './IndWorkout.css'

function IndWorkout({userWorkouts, setUserWorkouts, user}) {

    const [showForm, setShowForm] = useState(false)
    const [day, setDay] = useState('')
    const [sets, setSets] = useState(0)
    const [reps, setReps] = useState(0)
    const [patchErrors, setPatchErrors] = useState([])

    let { id } = useParams();
    const navigate = useNavigate();

    function handleClick() {
        setShowForm(!showForm)
        setPatchErrors([])
        setDay('')
        setSets(0)
        setReps(0)
    }

    function handleWorkoutUpdate(e) {
        e.preventDefault()

        const updatedInfo = {
            day: day,
            sets: sets,
            reps: reps,
        }

        fetch(`/workouts/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedInfo)
        })
        .then(res => {
            if(res.ok) {
                res.json()
                .then((updatedWorkout) => {
                    const updatedWorkoutList = userWorkouts.map((wkout) => {
                        if(wkout.id == id){
                            return updatedWorkout
                        }
                        else{return wkout}
                    })

                    setUserWorkouts(updatedWorkoutList)
                    setShowForm(!showForm)
                    alert(`${user.first_name}, this workout has been updated!`)
                })
            }
            else{
                res.json()
                .then(json => setPatchErrors(json.errors))
            }
        })

    }

    function handleWorkoutDelete() {
        fetch(`/workouts/${id}`, {
            method: 'DELETE'
        })
        .then(res => res)
        .then(() => {
            const updatedWorkoutList = userWorkouts.filter((wkout) => {return wkout.id != id })
            setUserWorkouts(updatedWorkoutList)
            alert(`${user.first_name}, this workout was successfully removed from your schedule!`)
            navigate('/my_workouts')
        })
    }

    const indWorkout = userWorkouts.filter((workout) => {
        return workout.id == id
    })[0]
    

    return(
        <>
            <h1 className ='ind-workout-header-day'>{indWorkout ? (<>{indWorkout.day}</>) : null}</h1>
            {indWorkout ? (
                <div className = "ind-workout-box">
                    <h2 className = 'ind-workout-header'>{indWorkout.exercise.name} <br/> <u>Sets:</u> {indWorkout.sets} <u>Reps:</u> {indWorkout.reps}</h2>
                    <p className ='ind-workout-desc'> {indWorkout.exercise.description} </p>
                    <ReactPlayer controls url = {indWorkout.exercise.form} />

                    {showForm ? (
                        <div className ='workout-form'>
                            <form onSubmit = {handleWorkoutUpdate}>
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

                                    <button type ="submit" className = 'workout-form-submit'>Update Workout</button>
                                </form>
                                {patchErrors ? patchErrors.map(error => <div>{error} </div>)  : null }
                                <button onClick={handleWorkoutDelete} className ='form-toggle'>Remove Workout</button>
                                <button onClick={handleClick} className = "form-toggle">Go Back</button>
                                
                        </div>
                    ) : (
                        <>
                                <button onClick={handleClick} className = "form-toggle"> Edit or Delete Workout</button>
                        </>
                    ) }

                </div>
            ) : (
                null
            )}
        </>
    )
}

export default IndWorkout
