import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BaseUrl from "./BaseUrl";
import "../BookTicket.css";
import { AiOutlineClose } from "react-icons/ai";
import moment from "moment";
import { now } from "moment";
import Modal from "react-modal";
import { Button } from "react-bootstrap";

const BookTicket = (props) => {
  let location = useLocation();
  let navigate = useNavigate();
  console.log(location.state);
  let placeId = location.state;
  console.log(props.setToken);
  const [place, setPlace] = useState({});
  const [modalIsOpen, setModelIsOpen] = useState(false);
  const [isOtpOpen, setOtpOpen] = useState(false);
  const [isOtpResnd, setResdOtp] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0px",
      paddingBottom: "20px",
      width: "400px",
      borderRadius: "20px"
    },
  };

  useEffect(() => {
    if (placeId == undefined) {
      navigate("/places");
    }

    if (localStorage.getItem("token") != null) {
      axios.interceptors.request.use(
        function (config) {
          config.headers.authorization = `Bearer ${localStorage.getItem(
            "token"
          )}`;
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );
    }
    console.log("useeffict");

    axios.get(`${BaseUrl}/place/${placeId}`).then(
      (response) => {
        console.log(response.data.data);
        setPlace(response.data.data);
      },
      (error) => {}
    );
  }, []);

  const [child, setChild] = useState(0);
  const DecreasedChild = () => {
    let temp = child;
    temp--;
    if (temp >= 0) {
      setChild(temp);
      setPrice(adult * place.priceAdult + temp * place.priceChild);
    }
  };
  const IncreasedChild = () => {
    let temp = child;
    temp++;
    setChild(temp);
    setPrice(adult * place.priceAdult + temp * place.priceChild);
  };
  const [adult, setAdult] = useState(0);
  const DecreasedAdult = () => {
    let temp = adult;
    temp--;
    if (temp >= 0) {
      setAdult(temp);
      setPrice(temp * place.priceAdult + child * place.priceChild);
    }
  };
  const IncreasedAdult = () => {
    let temp = adult;
    temp++;
    setAdult(temp);
    setPrice(temp * place.priceAdult + child * place.priceChild);
  };
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(moment(new Date()).format("DD-MM-YYYY"));
  const placeOrder = () => {
    let token = localStorage.getItem("token");
    if (token == null) {
      setModelIsOpen(true);
    } else {
      let orders = {
        placeId: placeId,
        adultQnt: adult,
        childQnt: child,
        visitDate: date,
      };

      console.log(orders);
      axios.interceptors.request.use(
        function (config) {
          config.headers.authorization = `Bearer ${localStorage.getItem(
            "token"
          )}`;
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );

      console.log();

      if (
        placeId == undefined ||
        (orders.adultQnt <= 0 && orders.childQnt <= 0)
      ) {
        alert("please fill all details");
        return;
      }

      axios.post(`${BaseUrl}/secure/order`, orders).then(
        (response) => {
          console.log(response);
          let data = response.data.data;
          if (response.data.status == "success") {
            navigate("/bookingreview", { state: data });
          } else {
            alert("some thing went wrong try again");
          }
        },
        (error) => {}
      );
    }
  };
  const [phone, setPhone] = useState({});
  const submitIt = () => {
    if (!isOtpOpen) {
      // send Otp..

      // console.log(phone.mobile.length);
      if (phone.mobile == undefined || phone.mobile.length != 10) {
        alert("Enter correct  Mobile Number");
        return;
      }

      axios.post(`${BaseUrl}/auth/mobile`, phone).then(
        (response) => {
          if (response.data.data == "otp send successfully") {
            alert("otp send successfully");
            setOtpOpen(true);
          } else {
            alert("otp not send try again");
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
            props.setToken(token);
            localStorage.setItem("token", token);
            setModelIsOpen(false);
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

  const closeModal = () => {
    setModelIsOpen(false);
  };

  return (
    <>
      <div
        className="container"
        style={{
          width: "600px",
          marginTop: "30px",
          marginBottom: "30px",
          textAlign: "left",
          paddingTop: "50px",
        }}
      >
        <div className="input-row">
          <h1 style={{ fontSize: "", color: "#423F3E" }} id="placeName">
            Statue of unity
          </h1>
        </div>
        <div className="input-row">
          <div>
            <input
              placeholder="Select your date"
              type="date"
              name="checkIn"
              id="datepicker"
              defaultValue={moment(new Date()).format("DD-MM-YYYY")}
              min={moment(new Date()).format("YYYY-MM-DD")}
              className="calendar"
              onChange={(e) => {
                setDate(moment(e.target.value).format("DD-MM-YYYY"));
              }}
            />
            <i
              style={{ color: "#423F3E" }}
              className="fas fa-calendar-check icon"
            />
          </div>
          <div className="input">
            <b>Timings:&nbsp;&nbsp;</b>
            {place.startTime}-{place.endTime}
          </div>
        </div>
        <div className="input-row">
          <div className="title">
            <h2 style={{ marginTop: "1em" }} className="label">
              Adults
            </h2>
            <p className="description">People 18 years - above.</p>
          </div>
          <div id="priceAdult">
            <p id="AdultValue" style={{ color: "#423F3E" }}>
              {place.priceAdult}/ticket
            </p>
          </div>
          <div className="input" style={{ color: "#423F3E" }}>
            <button
              className="minus circle-button"
              aria-label="Decrease by one"
              onClick={DecreasedAdult}
            >
              <svg
                width={16}
                height={2}
                viewBox="0 0 16 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  y1={1}
                  x2={16}
                  y2={1}
                  stroke="#423F3E"
                  strokeWidth={2}
                  className="icon"
                />
              </svg>
            </button>
            <div className="number">{adult}</div>
            <button
              className="plus circle-button"
              aria-label="Increase by one"
              onClick={IncreasedAdult}
            >
              <svg
                style={{ margin: "10px" }}
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
              >
                <line
                  x1={8}
                  y1="4.37114e-08"
                  x2={8}
                  y2={16}
                  stroke="#423F3E"
                  strokeWidth={2}
                />
                <line y1={8} x2={16} y2={8} stroke="#423F3E" strokeWidth={2} />
              </svg>
            </button>
          </div>
        </div>
        <div className="input-row">
          <div className="title">
            <h2 style={{ marginTop: "1em" }} className="label">
              Children
            </h2>
            <p className="description">People under 18 years old.</p>
          </div>
          <div id="priceChild">
            <p id="ChildValue" style={{ color: "#423F3E" }}>
              {place.priceChild}/ticket
            </p>
          </div>
          <div className="input" style={{ color: "#423F3E" }}>
            <button
              className="minus circle-button"
              aria-label="Decrease by one"
              onClick={DecreasedChild}
            >
              <svg
                width={16}
                height={2}
                viewBox="0 0 16 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  y1={1}
                  x2={16}
                  y2={1}
                  stroke="#423F3E"
                  strokeWidth={2}
                  className="icon"
                />
              </svg>
            </button>
            <div className="number">{child}</div>
            <button
              className="plus circle-button"
              aria-label="Increase by one"
              onClick={IncreasedChild}
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="plus"
              >
                <line
                  x1={8}
                  y1="4.37114e-08"
                  x2={8}
                  y2={16}
                  stroke="#423F3E"
                  strokeWidth={2}
                />
                <line y1={8} x2={16} y2={8} stroke="#423F3E" strokeWidth={2} />
              </svg>
            </button>
          </div>
        </div>
        <div className="input-row">
          <h2 style={{ marginTop: "1em" }} className="label">
            Grand Total
          </h2>
          <div className="input" id="total">
            {price}
          </div>
        </div>
        <div className="input-row" style={{ justifyContent: "center" }}>
          <Button
            style={{
              background: "linear-gradient(to left,#ff8414,#ff613a)",
              border: "0px",
              fontSize: "20px",
            }}
            type="button"
            onClick={placeOrder}
          >
            <b>Book Now</b>
          </Button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        contentLabel="Example Modal"
      >
        <div style={{ padding: "5px 20px", background: "#ff8414", color:'white' }}>
          <h2 style={{margin:'0px'}}> 
            Login
            <button style={{ fontSize:'25px', float: "right", backgroundColor: 'rgba(255, 0, 0, 0)', border:'0px',color:'white' }} onClick={closeModal}>
              <AiOutlineClose></AiOutlineClose>
            </button>
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
      </Modal>
    </>
  );
};

export default BookTicket;
