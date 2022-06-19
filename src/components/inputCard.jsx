import React from "react";
import { useState, useRef, useEffect } from "react";
import "./main.css";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaChevronUp } from "react-icons/fa";

import { taskActions } from "../store/taskSlice";
import { useDispatch } from "react-redux";

import uuid from "react-uuid";

export default function InputCard(props) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [time1, setTime1] = useState("04:00");
  const [time2, setTime2] = useState("22:00");
  const [category, setCategory] = useState("business");
  const textInputRef = useRef(null);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTime1 = (e) => {
    const value = e.target.value;
    setTime1(value);
  };
  const handleTime2 = (e) => {
    const value = e.target.value;
    setTime2(value);
  };
  const formatTime = (hours) => {
    let hr = parseInt(hours.slice(0, 2), 10);
    let sec = parseInt(hours.slice(3, 5), 10);

    const newTime = new Date();
    newTime.setHours(hr, sec);
    let todoHour = newTime.getUTCHours() + 1;
    let todomins = newTime.getUTCMinutes();
    let ampm = todoHour >= 12 ? "pm" : "am";
    todoHour = todoHour < 10 ? "0" + todoHour : todoHour;
    todomins = todomins < 10 ? "0" + todomins : todomins;
    todoHour = todoHour > 12 ? todoHour % 12 : todoHour;
    let timeString = `${todoHour}:${todomins} ${ampm}`;
    return timeString;
  };

  const todoTime = `${formatTime(time1)} - ${formatTime(time2)}`
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let id = uuid();
    let taskOj = {
      taskName: inputValue,
      category,
      id,
      completed: false,
      disabled: false,
      time: todoTime
    };
    dispatch(taskActions.addTask(taskOj));

    props.handleInputCard();
  };
  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  return (
    <div className="input-card">
      <form onSubmit={handleSubmit}>
        <AiOutlineCloseCircle
          color="grey"
          onClick={props.handleInputCard}
          className="close-icon"
          size={40}
        />
        <input
          type="text"
          name="input-task"
          value={inputValue}
          onChange={handleInput}
          placeholder="What's our Task"
          ref={textInputRef}
          maxLength={15}
          required
        />
        <div id="input-buttons">
          <p className="select-category">Select Category</p>
          <div>
            <label>
              <input
                type="radio"
                value="business"
                checked={category === "business"}
                onChange={handleChange}
              />
              Business
            </label>
            <label>
              <input
                type="radio"
                value="personal"
                checked={category === "personal"}
                onChange={handleChange}
              />
              Personal
            </label>

            <div className="time-container">
              <h5 className="time-header">Select Time</h5>
              <label htmlFor="time1">From</label>
              <input
                type="time"
                id="time1"
                value={time1}
                onChange={handleTime1}
                min="04:00"
              />
              <label htmlFor="time2">To</label>
              <input
                type="time"
                id="time2"
                value={time2}
                onChange={handleTime2}
                max="22:00"
              />
            </div>
          </div>
        </div>
        <button type="submit" value="submit">
          New task <FaChevronUp />
        </button>
      </form>
    </div>
  );
}
