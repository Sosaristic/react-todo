import React from "react";
import './main.css'
export default function Categories(props){


    return(
<div className={props.categoryStyle}>
    <p className="total-tasks">{props.completedTasks}/{props.totalTasks} tasks</p>
    <p className="category">{props.Categories}</p>

</div>
    )
}