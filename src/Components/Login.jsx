import axios from "axios";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import BaseUrl from "./BaseUrl";

const Login = ({ setToken }) => {
  console.log(setToken);

  const [phone, setPhone] = useState({});
  const [flag, setFlag] = useState(false);
  const [isOtpOpen, setOtpOpen] = useState(false);
  const [isOtpResnd, setResdOtp] = useState(false);
  let navigate = useNavigate();

  const submit = () => {
    console.log("submit");
    axios.post(`${BaseUrl}/auth/mobile`, phone).then(
      (response) => {
        console.log(response);
        setFlag(true);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const submitIt = (e) => {
    e.preventDefault();
    if (!isOtpOpen) {
      // send Otp..

      console.log(phone.mobile.length);
      if(phone.mobile==undefined||phone.mobile.length!=10)
      {
        alert("Enter correct  Mobile Number");
        return ;
      }
      axios.post(`${BaseUrl}/auth/mobile`, phone).then(
        (response) => {

          if(response.data.data == "otp send successfully"){
            alert('otp send successfully')
            setFlag(true);
         }else{
           alert('otp not send try again')
         }

          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

      setOtpOpen(true);

      setTimeout(() => {
        setResdOtp(true);
        console.log("DSAda");
      }, 5000);
    } else {
      var form_data = new FormData();
      form_data.append("username", phone.mobile);
      form_data.append("password", phone.otp);

      axios.post(`${BaseUrl}/loginrequest`, form_data).then(
        (response) => {
          console.log(response.data.token);
          let token = response.data.token;
          if (token != null) {
            setToken(token);
            localStorage.setItem("token", token);
            navigate("/home");
          } else {
            alert("wrong otp");
          }
        },
        (error) => {
          console.log(error);
        }
      );

      console.log("done...");
    }
  };

  const resendOtp = () => {
    console.log("otp resnd");
  };

  const verify = () => {
    console.log("verify");
    var form_data = new FormData();
    form_data.append("username", phone.mobile);
    form_data.append("password", phone.otp);

    axios.post(`${BaseUrl}/loginrequest`, form_data).then(
      (response) => {
        console.log(response.data.token);
        let token = response.data.token;
        if (token != null) {
          localStorage.setItem("token", token);
          setToken(token);
          navigate("/home");
        } else {
          alert("wrong otp");
        }
        setFlag(true);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
    <div style={{height:'90vh', borderRadius:'10px',display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Card style={{padding:'0px', width:'500px'}} >
      <div style={{ padding: "5px 20px", background: "#ff8414", color:'white' }}>
          <h2 style={{margin:'0px'}}> 
            Login
          </h2>
        </div>
        <div style={{ padding: "10px 20px" }}>
          <div className="form-group">

            <input
              name="phone"
              onChange={(e) => {
                setPhone({ mobile: e.target.value });
                console.log(phone);
              }}
              type="text"
              className="form-control"
              placeholder="Enter Mobile Number"
            />
          
          </div>
          <br />

          {isOtpOpen && (
            <div>
              <input
              type="text"
              className="form-control"
              placeholder="Enter OTP"
                name="otp"
                onChange={(e) => {
                  setPhone({ ...phone, otp: e.target.value });
                  console.log(phone);
                }}
              ></input>
            </div>
          )}

          {!isOtpOpen && (
            
              <Button
                style={{ background: "#ff8414", border: "0px" }}
                onClick={submitIt}
              >
                Send Otp
              </Button>
            
          )}<div style={{display:'flex',justifyContent:'space-around',padding:'20px 20px 0px 20px'}}>
          {isOtpOpen && <Button
                style={{ background: "#ff8414", border: "0px" }}
                onClick={submitIt}
              >
                Login
              </Button>}
          {isOtpResnd && <Button
                style={{ background: "#ff8414", border: "0px" }}
                onClick={resendOtp}
              >
                Send Otp
              </Button>}</div>
        </div>
      </Card>
      </div>
    </>
  );
};

export default Login;
