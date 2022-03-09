import {React} from 'react'
import { NavLink } from 'react-router-dom'
import './Exercises.css'

function Exercises({exercises}) {

    const groups = ["Chest", "Back", "Biceps", "Triceps", "Shoulders", "Legs", "Abdominals"]


    return(
        <>
        <h1 className = "exercise-header">Exercises</h1>
        <div className = 'exercise-box'>
            {groups.map((group) => (
                <div className = "group-div" key ={group}>
                    <h2 className ="group-header">{group}</h2>
                    <ul className = "group-list">
                        {exercises.filter((exercise) => {
                            return exercise.group === group
                        }).map((groupExercise) => (
                            <li key = {groupExercise.id}>
                                <NavLink to = {`/all_exercises/${groupExercise.group}/${groupExercise.id}`} >{groupExercise.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        </>
    )
}

export default Exercises