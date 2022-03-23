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

    <div style={{margin:'40px',color:'black'}}><div className="bookcontainer">
    <div id="logo">
    </div>
    <div className="bookmain" style={{margin:'0',}}>
      <h1 className='bookh1' style={{background:'linear-gradient(to left,#ff8414,#ff613a)', color:'white' , paddingTop:'15px'}}>Payment Succesfull</h1>
      <h2 className='bookh2'>Thank you for booking with us</h2>
      <p style={{fontSize:'14px'}}>{drd.bookingDate} at {drd.bookingTime}</p>
    </div>
    <div style={{display:'flex', justifyContent:'space-around' ,alignItems:'center'}} className="">
      
      <div style={{textAlign:'left'}} className="">
        <h2  className='bookh2'>{prd.placeName}</h2>
        <h3 className='bookh3'>({prd.startTime} - {prd.endTime})</h3>
        <p>{prd.city} , {prd.state}</p>
      </div>
      <div>
      <img className="map" src={qrd.qrUrl} />
      </div>
    </div>

    <div style={{margin:'30px', color:'black'}} className="">
        <h2 className="receipt__title bookh2">Booking Details</h2>
        <div className='receipt'>
      <div  className="receipt__grid1 text-left">
        <p className='bookp'>Adults</p>
        <p className='bookp'>Children</p>
        <hr></hr>
        <p className="total bookp">Total</p>
      </div>
      <div className="receipt__grid2 text-center">
        <p className='bookp'>{drd.adultQnt} X ₹{prd.priceAdult}</p>
        <p className='bookp'>{drd.childQnt} X ₹{prd.priceChild}</p>
        <hr></hr>
        <p className="total bookp">₹{drd.amount}</p>
      </div>
      </div>
    </div>
    <Button style={{background:'#ff8414', border:'0px',fontSize:'20px', marginBottom:'30px'}} onClick={window.print}>Download</Button>
  </div></div>
  )
}

export default BookSuccess