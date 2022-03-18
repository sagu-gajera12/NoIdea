import React, { useEffect, useState } from 'react'

import { useNavigate } from "react-router-dom";

import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import axios from 'axios';
import BaseUrl from './BaseUrl';

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}


const BookingReview = (props) => {
    
    const intial = {
        orderId:"order_J8GFrhAa2Mlcyv",
        paymentId:"dsad_DSAddsdsdsa"
    };

    let navigate = useNavigate();

    const [bookInfo,setBookInfo] = useState({});
    const [bookConfirm,setBookConfirm] = useState(intial);
    

    useEffect(() => {
        setBookConfirm(intial)
        axios.interceptors.request.use(
            function (config) {
              config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
              return config;
            },
            function (error) {
              return Promise.reject(error); 
            }
          );
      
         let i = 1;   
        axios.get(`${BaseUrl}/secure/booking/${i}`).then(
            (response) => {
                console.log(response);
                
            },
            (error) => {
                console.log(error);
            }
        );

    }, []);

    const displayRazorpay = async (data) => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert("Oops! something went wrong");
            return
        }

        const options = {
            key: 'rzp_test_9B8AXwdinhrVTx',
            currency: "INR",
            amount: "625.0",
            order_id: "order_J8GFrhAa2Mlcyv",
            description: 'Pay your amount here.',
            handler: function (response) {
                console.log(response.razorpay_order_id);
                console.log(response.razorpay_payment_id);
                console.log(response.razorpay_signature);
                intial.orderId = response.razorpay_order_id;
                intial.paymentId = response.razorpay_payment_id;
                confirmBook();

            },
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()

    }

    const confirmBook = () => {
        axios.interceptors.request.use(
            function (config) {
              config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
              return config;
            },
            function (error) {
              return Promise.reject(error); 
            }
          );
          console.log(bookConfirm);  
        axios.post(`${BaseUrl}/secure/confirm`,JSON.stringify(bookConfirm),{headers: {
            "Content-Type": "application/json"}
          }).then(
            (response) => {
                console.log(response);
                navigate("/place/booksuccess", { details: response.data.data });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const confirmorder = () => {

        displayRazorpay(null);
        
    }

  return (
    <Col>
     

     <button onClick={confirmorder} >Confirm</button>
     
    </Col>
  )
}

export default BookingReview