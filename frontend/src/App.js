import React, { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import Todo from "./components/Todo";
import Add from "./components/Add";
import Register from "./components/Register";
import Login from "./components/Login";



export default function App() {
  const [tasks, setTasks] = useState([]);

  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [username, setusername] = useState("")

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // should bring data using axios
    // from backend (GET /tasks)
    axios
      .get(`http://localhost:5000/tasks`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        setTasks(response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const postNewTodo = (body) => {
    // console.log("func postNewTodo from APP");
    // {"title":"task 5","isCompleted": false}
    axios
      .post(`http://localhost:5000/tasks`, body)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        // setTasks(response.data);
        getData();
        // change react hooks state using spread operator
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      //     (`http://localhost:5000/tasks/${id}`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        getData();
        // change react hooks state using spread operator
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const toggleTodo = (id, newStatus) => {
    axios
      .put(`http://localhost:5000/tasks/${id}/${newStatus}`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        getData();
        // change react hooks state using spread operator
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const deleteTasks = () => {
    axios
      .delete(`http://localhost:5000/tasks`)
      //     (`http://localhost:5000/tasks/${id}`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        getData();
        // change react hooks state using spread operator
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const filterData = (status) => {
    // should bring data using axios
    // from backend (GET /tasks)
    axios
      .get(`http://localhost:5000/filter?isCompleted=${status}`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        setTasks(response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };
  const mapOverTasks = tasks.map((taskObj, i) => (
    <Todo
      key={taskObj._id}
      task={taskObj}
      deleteTodo={deleteTodo}
      toggleTodo={toggleTodo}
    />
  ));
  return (
    <div className="App">
      <p>app</p>

      
      <nav>
      <Link to="/Home">Home</Link>{" | "}

      <Link to="/Login">Login</Link> {" | "}
      
      <Link to="/Register">Register</Link>
    
      </nav>
      <br />

        


      <Routes>

        <Route path="/home" element={
        <div className="Home">     
      {/* click on button should bring all Data */}
      <button onClick={getData}>GET TASKS</button>
      <button onClick={deleteTasks}>DELETE Completed tasks </button>
      <button
        onClick={() => {
          filterData(true);
        }}
      >
        GET DONE
      </button>
      <button
        onClick={() => {
          filterData(false);
        }}
      >
        GET PENDING
      </button>
      

      {<Add createFunc={postNewTodo} />}
      {mapOverTasks}
      </div>} />

        <Route path="login" element={ <Login
        setisLoggedIn={setisLoggedIn}
        setusername={setusername}
        />} />
        <Route path="register" element={<Register/>} />
        
      </Routes>


      
    </div>
  );
}