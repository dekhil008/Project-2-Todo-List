import axios from 'axios'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'

export default function Login(props) {
    const [email, setemail] = useState("dakhil@gmail.com")
    const [password, setpassword] = useState("123456")

    const loginFunc = (e) => {
        e.preventDefault()
        const userInfo = {
            email,
            password,
        }
        axios.post("http://localhost:5000/users/login", userInfo)
        .then((response) => {
            console.log("RESPONSE: ",response)
            console.log("DATA: " , response.data)
            props.setisLoggedIn(true)
            props.setusername(response.data.username)
        })
        .catch((err) => {
            console.log("ERR: ", err)
        })

    }
    
    return (
        <div className='Login'>
            <form>
            <label htmlFor=''>Email</label>
            <input onChange={(e) => {
                setemail(e.target.value)
            }} 
            value={email} type="text" placeholder='write your email here ..'/>
            <br/>
            <label htmlFor=''>password</label>
            <input onChange={(e) => {
                setpassword(e.target.value)
            }} 
            value={password} type="password" placeholder='write your password here ..' />
            <br/>
            <input type="submit"  value="Login" onClick={loginFunc}/>

            <Link to= "/Register"> Don't Have An Account ?</Link>
            </form>

            
        </div>
    )
}
