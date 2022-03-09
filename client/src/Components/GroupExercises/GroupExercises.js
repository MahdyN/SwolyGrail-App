import React from "react";
import { useParams } from "react-router-dom";
import './GroupExercises.css'

function GroupExercises({exercises, isAuth}) {

    let { group } = useParams();

    return(
        <>
        <h1 className = "group-ex-header">{group}</h1>
        </>
    )
}

export default GroupExercises

