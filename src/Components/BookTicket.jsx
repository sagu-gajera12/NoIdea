import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BaseUrl from "./BaseUrl";
import "../BookTicket.css";
import moment from "moment";
import { now } from "moment";
import Modal from "react-modal";

const BookTicket = (props) => {
  let location = useLocation();
  let navigate = useNavigate();
  console.log(location.state);
  let placeId = location.state;
 console.log(props.setToken);
  const [place, setPlace] = useState();
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
    },
  };

  useEffect(() => {
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
  const [date, setDate] = useState();
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

      axios.post(`${BaseUrl}/secure/order`, orders).then(
        (response) => {
          console.log(response.data.data);
          let data = response.data.data;
          navigate("/bookingreview", { state: data });
        },
        (error) => {}
      );
    }
  };
  const[phone,setPhone]=useState({});
  const submitIt = () => {
    if (!isOtpOpen) {
      // send Otp..

      axios.post(`${BaseUrl}/auth/mobile`, phone).then(
        (response) => {

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

      var form_data=new FormData();
        form_data.append("username",phone.mobile);
        form_data.append("password",phone.otp);

        axios.post(`${BaseUrl}/loginrequest`, form_data).then(
            (response) => {

                console.log(response.data.token);
                let token=response.data.token;
                if(token!=null)
                {
                  props.setToken(token);
                localStorage.setItem('token',token);
                navigate("/home")
                }else{
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
      <div className="container">
        <div className="input-row">
          <h2 id="placeName">Statue of unity</h2>
        </div>
        <div className="input-row">
          <div>
            <input
              placeholder="Select your date"
              type="date"
              name="checkIn"
              id="datepicker"
              defaultValue
              min={moment(new Date()).format("YYYY-MM-DD")}
              className="calendar"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <i className="fas fa-calendar-check icon" />
          </div>
          <div className="input">
            <b>Timings:&nbsp;&nbsp;</b>
            {/* {place.startTime}-{place.endTime} */}
          </div>
        </div>
        <div className="input-row">
          <div className="title">
            <h2 className="label">Adults</h2>
            <p className="description">People 18 years old and above.</p>
          </div>
          <div id="priceAdult">
            {/* <p id="AdultValue">{place.priceAdult}/tickets</p> */}
          </div>
          <div className="input">
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
                  stroke="#89aa02"
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
                  stroke="#89aa02"
                  strokeWidth={2}
                />
                <line y1={8} x2={16} y2={8} stroke="#89aa02" strokeWidth={2} />
              </svg>
            </button>
          </div>
        </div>
        <div className="input-row">
          <div className="title">
            <h2 className="label">Children</h2>
            <p className="description">People under 18 years old.</p>
          </div>
          <div id="priceChild">
            {/* <p id="ChildValue">{place.priceChild}/tickets</p> */}
          </div>
          <div className="input">
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
                  stroke="#89aa02"
                  strokeWidth={2}
                  className="icon"
                />
              </svg>
            </button>
            <div className="number dim">{child}</div>
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
                  stroke="#89aa02"
                  strokeWidth={2}
                />
                <line y1={8} x2={16} y2={8} stroke="#89aa02" strokeWidth={2} />
              </svg>
            </button>
          </div>
        </div>
        <div className="input-row">
          <h2 className="label">Grand Total</h2>
          <div className="input" id="total">
            {price}
          </div>
        </div>
        <div className="input-row">
          <button
            type="button"
            className="input bookbutton"
            onClick={placeOrder}
          >
            <b>Book Now</b>
          </button>
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
        <h2>Login</h2>
        <button onClick={closeModal}>close</button>
        <label> Enter Mobile: </label>
        <input name='phone' onChange={(e)=>{
        setPhone({mobile:e.target.value});
        console.log(phone)
    }} ></input>
        <br />

        {isOtpOpen && (
          <div>
            <label>Enter Otp</label>
            <input name='otp' onChange={(e)=>{
        setPhone({...phone,otp:e.target.value});
        console.log(phone)
    }} ></input>
          </div>
        )}

        {!isOtpOpen && (
          <div>
            <button onClick={submitIt}>send otp</button>
          </div>
        )}
        {isOtpOpen && <button onClick={submitIt}>Login</button>}
        {isOtpResnd && <button onClick={resendOtp}>resend otp</button>}
      </Modal>
    </>
  );
};

export default BookTicket;
