import axios from 'axios'
import React, {useState} from 'react'

export default function Login() {
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
            </form>
            
        </div>
    )
}
