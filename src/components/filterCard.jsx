import React from "react";
import TaskCard from "./taskCard";
import "./main.css";
import uuid from "react-uuid";

export default function FilterCard(props) {
  const myMap = (tasks) => {
    return tasks.map((item, key) => {
      return (
        <TaskCard
          taskName={item.taskName}
          category={item.category}
          id={item.id}
          key={uuid()}
          completed={item.completed}
          test={props.handleRemoveItem}
          handleDisplayDialog= {props.handleDisplayDialog}
          getId = {props.getId}
          decision = {props.decision}
          disabled={item.disabled}
          time = {item.time}
        />
      );
    });
  };

  const filterOption = props.filterOption;
  const tasks = props.tasksObj;

  if (filterOption === "all") {
    return <div className="tasks-container">{myMap(tasks)}</div>;
  }
  if (filterOption === "completed") {
    const completedTasks = tasks.filter((item) => {
      return item.completed === true;
    });
    
    return <div className="tasks-container">{myMap(completedTasks)}</div>;
  }
  if (filterOption === "uncompleted") {
    const uncompletedTasks = tasks.filter((item) => {
      return item.completed === false;
    });
    return <div className="tasks-container">{myMap(uncompletedTasks)}</div>;
  }
  if (filterOption === "personal") {
    const personalTasks = tasks.filter((item) => {
      return item.category === "personal";
    });
    return <div className="tasks-container">{myMap(personalTasks)}</div>;
  }
  if (filterOption === "business") {
    const businessTasks = tasks.filter((item) => {
      return item.category === "business";
    });
    
    return <div className="tasks-container">{myMap(businessTasks)}</div>;
  }
}
