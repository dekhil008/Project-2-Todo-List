import axios from 'axios'
import React,{useState} from 'react'
import { Link } from 'react-router-dom'



export default function Register() {
    const [email, setemail] = useState("dakhil.222@gmail.com")
    const [password, setpassword] = useState("5555")
    const [username, setusername] = useState("dakhil222")

    const registerFunc = (e) => {
        e.preventDefault()
        const newUser = {
            email,password,username,
        }

        axios.post("http://localhost:5000/users/register",newUser)
        .then((response) => {
            console.log("RESPONSE: " , response)
            console.log("DATA: " , response.data)
        })
        .catch((err) => {
            console.log("ERR: " , err)
        })

    }
    return (
        <div className='Register' >
            <form>
            <label htmlFor='email'>Email:</label>   
            <input type="email" placeholder='write email here ...' 
            onChange={(e)=>{
                setemail(e.target.value)
            }} 
            value={email}
            />
            <br/>
            <label htmlFor='password'>Password:</label>   
            <input type="password" placeholder='write password here ...'  
            onChange={(e)=>{
                setpassword(e.target.value)
            }} 
            value={password}

            />
            <br/>
            <label htmlFor='username'>Username:</label>   
            <input type="text" placeholder='write username  here ...' 
            onChange={(e)=>{
                setusername(e.target.value)
            }} 
            value={username}
            />
            <br/>
            <input type="submit" value="Register" onClick={(registerFunc)} />
            
            <Link to= "/Login">  Have An Account ?</Link>
            </form>
        </div>
    )
}
