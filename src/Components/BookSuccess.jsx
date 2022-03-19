import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../SuccesFull.css'
const BookSuccess = () => {

  let location=useLocation();

  console.log(location.state);
  const[drd,setDRD]=useState(location.state.detailsResponseDto);
  const[prd,setPRD]=useState(location.state.placeResponseDto);
  const[qrd,setQRD]=useState(location.state.qrResponseDto);

  useEffect(()=>{
    setDRD(location.state.detailsResponseDto);
    setPRD(location.state.placeResponseDto);
    setQRD(location.state.qrResponseDto);

  },[])

  





  return (

    <div style={{margin:'40px'}}><div className="container">
    <div id="logo">
    </div>
    <div className="main">
      <h1>Payment Succesfull</h1>
      <h2>Thank you for booking with us</h2>
      <p>{drd.bookingDate} at {drd.bookingTime}</p>
    </div>
    <div className="location">
      <img className="map" src={qrd.qrUrl} />
      <div className="dot pickup">
        <div className="inner" />
      </div>
      <div className="location__pickup">
        <h3>{prd.placeName}</h3>
        <span>({prd.startTime} - {prd.endTime})</span>
        <p>{prd.city} , {prd.state}</p>
      </div>
    </div>
    <h2 className="receipt__title">Booking Details</h2>
    <div className="receipt">
      <div className="receipt__grid1">
        <p>Adults</p>
        <p>Children</p>
        <p className="total">Total</p>
      </div>
      <div className="receipt__grid2">
        <p>{drd.adultQnt} X ₹{prd.priceAdult}</p>
        <p>{drd.childQnt} X ₹{prd.priceChild}</p>
        <p className="total">₹{drd.amount}</p>
      </div>
    </div>
    <div className="receipt__line" />
    <Button style={{marginBottom:'30px'}} onClick={window.print}>download</Button>
  </div></div>
  )
}

export default BookSuccess