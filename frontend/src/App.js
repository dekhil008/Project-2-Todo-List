import React from 'react'
import axios from "axios"
import "./App.css"

export default function App() {
  const getData = ()=>{
    axios.get("http://localhost:5000/tasks")
    .then((response)=>{
     // console.log("RESPONSE: ", response)
      console.log("DATA: ", response.data)

    })
    .catch((err)=>{
      console.log("ERR: " , err)
    })
  }
  return (
    <div className='App'>
      <p>app a new project</p>
      <button onClick={getData}>GET TASKS </button>
      
    </div>
  )
}
