import React from "react";
import { useState } from "react";
import "./main.css";

import { MdOutlineDelete } from "react-icons/md";
import {BiTime} from "react-icons/bi"
import { useDispatch } from "react-redux";
import { taskActions } from "../store/taskSlice";
import ConfirmBox from "./confirmBox";

export default function TaskCard(props) {
  const dispatch = useDispatch();
  let iconColor;
  let checkboxType;

  if (props.category === "personal") {
    iconColor = "rgb(101, 101, 219)";
    checkboxType = "personal-check";
  }

  if (props.category === "business") {
    iconColor = "rgb(214, 91, 91)";
    checkboxType = "business-check";
  }

  const [completed, setCompleted] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);

  const handleDelete = (e) => {
    let taskId = e.target.parentElement.parentElement.id;
    props.test(taskId);
  };

  const handleToogleStatus = (e) => {
    const taskId = e.target.parentElement.parentElement.id;
    setTodoId(taskId);

    setDisplayDialog(!displayDialog);
  };
  const handleDialogOption = (e) => {
    if (e.target.innerText === "Yes") {
      setCompleted(!completed);
      dispatch(taskActions.toogleStatus({ todoId, completed }));
      setDisplayDialog(!displayDialog);
    } else if (e.target.innerText === "No") {
      setDisplayDialog(!displayDialog);
    }
  };
  let strikeText;

  if (props.disabled === true) {
    strikeText = {
      textDecoration: "line-through",
    };
  }

  const handleTaskColor = () => {
    if (props.completed === false) {
      return "task-card";
    }
    if (props.completed === true) {
      return "tasks-card-completed";
    }
  };

  return (
    <>
      <div className={handleTaskColor()} id={props.id}>
        <label className="label-checkbox">
          <input
            type="checkbox"
            id="check-task"
            value="completed"
            checked={completed}
            disabled={props.disabled}
            onChange={handleToogleStatus}
          />
          {props.completed ? (
            <span className="task-checked"></span>
          ) : (
            <span className={checkboxType}></span>
          )}
        </label>
        <div className="task-name" style={strikeText}>
          {props.taskName}
        </div>
         <div className="task-time-container">
          <BiTime size={20}/>
          <span>{props.time}</span>
        </div>
        <div className="edit-box">
         
          <MdOutlineDelete
            className="ediit-icons"
            size={25}
            color={iconColor}
            onClick={handleDelete}
          />
        </div>
       
        {displayDialog ? (
          <ConfirmBox handleDialogOption={handleDialogOption} taskId={todoId} />
        ) : null}
      </div>
    </>
  );
}
