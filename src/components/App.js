import React, { useEffect } from "react";
import { useState } from "react";

import "../components/main.css";

import Categories from "./CategoriesCard";
import InputCard from "./inputCard";
import { MdAdd } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";

import FilterCard from "./filterCard";

import { useSelector, useDispatch } from "react-redux";
import { taskActions } from "../store/taskSlice";

export default function App() {
  const dispatch = useDispatch();

  //let username = window.prompt("Please Enter a username")
  const [user, setUser] = useState(false)
  const [myName, setMyName] = useState("user")
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("username")) === null) {
      let username = window.prompt("Please Enter a username");
      if (username !== null) {
        localStorage.setItem("username", JSON.stringify(username));
        
      }
    }
    if(JSON.parse(localStorage.getItem("username")) !== null && user === true){
      let username = window.prompt("Please Enter a username");
      if (username !== null) {
        localStorage.setItem("username", JSON.stringify(username));
       
      }
    }
    setMyName(JSON.parse(localStorage.getItem("username")))
    setUser(false)
  }, [user]);
const getUser = ()=> setUser(true)
  const [inputCard, setInputCard] = useState(false);

  const tasks = useSelector((state) => state.tasks.tasks);

  const myFilter = (task, category, id) => {
    let filteredValue = task.filter((item) => {
      return item.category === id;
    });
    return filteredValue;
  };

  const personalTask = myFilter(tasks, tasks.category, "personal");
  const businessTask = myFilter(tasks, tasks.category, "business");
  const personalTaskCompleted = tasks.filter((item) => {
    return item.completed === true && item.category === "personal";
  });
  const businessTaskCompleted = tasks.filter((item) => {
    return item.completed === true && item.category === "business";
  });
  const handleInputCard = () => {
    setInputCard(!inputCard);
  };

  const handleRemoveItem = (id) => {
    dispatch(taskActions.removeTask(id));
  };

  const [filterOption, setFilterOption] = useState("all");
  const handleSelect = ({ target }) => {
    setFilterOption(target.value);
  };

  return (
    <>
      <div className="main-app">
        <div className="greet-user">
          
          What's up,
          <span className="user-name">
            
            {myName}
            <span className="username-edit">
              <FiEdit2 size={20} onClick={getUser}/>
            </span>
          </span>
        </div>
        <p className="categories-title"> CATEGORIES </p>
        <div className="categories-container">
          <Categories
            Categories={"Personal"}
            totalTasks={personalTask.length}
            completedTasks={personalTaskCompleted.length}
            categoryStyle={"personal"}
          />
          <Categories
            Categories={"Business"}
            totalTasks={businessTask.length}
            completedTasks={businessTaskCompleted.length}
            categoryStyle={"business"}
          />
        </div>
        <div className="filter-main-box">
          <h4 className="today-task-header"> TODAY 'S TASKS</h4>
          {tasks.length > 0 ? (
            <div className="filter">
              <select
                name="filter"
                value={filterOption}
                id="filter-option"
                onChange={handleSelect}
              >
                <option value="all"> All </option>
                <option value="completed"> Completed </option>
                <option value="uncompleted"> Uncompleted </option>
                <option value="personal"> Personal </option>
                <option value="business"> Business </option>
              </select>
            </div>
          ) : null}
        </div>
        {tasks.length > 0 ? (
          <FilterCard
            tasksObj={tasks}
            filterOption={filterOption}
            handleRemoveItem={handleRemoveItem}
          />
        ) : (
          <div className="no-tasks"> No Tasks for Today </div>
        )}
        <button className="add-button" onClick={handleInputCard}>
          <MdAdd size={30} color="white" />
        </button>
        {inputCard ? <InputCard handleInputCard={handleInputCard} /> : null}
      </div>
    </>
  );
}
