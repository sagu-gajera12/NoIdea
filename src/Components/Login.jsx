import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import BaseUrl from './BaseUrl';

const Login = ({setToken}) => {

  console.log(setToken);

    const[phone,setPhone]=useState({});
    const[flag,setFlag]=useState(false);
    let navigate=useNavigate();

    const submit=()=>{
        console.log("submit")
        axios.post(`${BaseUrl}/auth/mobile`, phone).then(
            (response) => {

                console.log(response);
                setFlag(true);

            },
            (error) => {
              console.log(error);
            }
          );
  

    }

    const verify=()=>{

        console.log("verify")
        var form_data=new FormData();
        form_data.append("username",phone.mobile);
        form_data.append("password",phone.otp);

        axios.post(`${BaseUrl}/loginrequest`, form_data).then(
            (response) => {

                console.log(response.data.token);
                let token=response.data.token;
                if(token!=null)
                {
                localStorage.setItem('token',token);
                setToken(token)
                navigate("/home")
                }else{
                    alert("wrong otp");
                }
                setFlag(true);

            },
            (error) => {
              console.log(error);
            }
          );
  

    }


  return (<>
    <div>Login</div>

    <input name='phone' onChange={(e)=>{
        setPhone({mobile:e.target.value});
        console.log(phone)
    }} ></input>
    <Button onClick={submit}>submit</Button>

  { flag &&   <div><input name='otp' onChange={(e)=>{
        setPhone({...phone,otp:e.target.value});
        console.log(phone)
    }} ></input>

    <Button onClick={verify}>submit</Button></div>
  }
</>
  )
}

export default Login