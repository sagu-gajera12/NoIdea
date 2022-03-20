import axios from 'axios';
import React, { useState } from 'react'

import Modal from "react-modal";
import Select from 'react-select'
import BaseUrl from './BaseUrl';


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

const SingleOrder = (props) => {

  const cancelBookingjs = {
    bookingId:"",
    adultQnt:0,
    childQnt:0,
    accountNo:"",
    ifscCode:"",
    upiId:"",
    refundMode:""
  }

  const options = [
    { value: 'Account', label: 'Get Payment in Account'},
    { value: 'upi', label: 'Get Payment from Upi' },
  ]

  const [modalIsOpen,setmodalIsOpen] = useState(false)
  const [refundMethod,setrefundMethod] = useState('Get Payment in Account')
  const [isAccount,setRefundAccount] = useState(false)
  const [isUpi,setRefundUpi] = useState(false)
  const [cancelBook,setCancelBooking] = useState(cancelBookingjs);

  const closeModal = () => {
    setmodalIsOpen(false);
  }

  const openCancelModel = () => {
    setCancelBooking({...cancelBook,bookingId : props.order.bookingId})
    setmodalIsOpen(true);
  }

  const modeTypeChange = (value) => {
    
    setCancelBooking({...cancelBook,refundMode : value.value})
    if(value.value == "Account"){
      setRefundAccount(true);
      setRefundUpi(false);
    }else if(value.value == "upi"){
      setRefundUpi(true);
      setRefundAccount(false);
    }
    setrefundMethod(value.value)
    console.log(value.value);
  }

  const cancelNow = () => {
    axios.post(`${BaseUrl}/secure/cancel`, JSON.stringify(cancelBook), {
      headers: {
          'Content-Type': 'application/json'
      }}).then(
      (response) => {
         console.log(response.data.data)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <>
    <tr>
              <td>{props.order.orderId}</td>
              <td>{props.order.paymentId}</td>
              <td>{props.order.city}</td>
              <td>{props.order.visitDate}</td>
              <td> {props.order.childQnt+props.order.adultQnt}</td>
              <td>₹{props.order.amount}</td>
              <td><span style={{cursor:'pointer',fontSize: '30px'}} onClick={()=>{
                  console.log("dummy");
              }} className="bi bi-receipt" /></td>
              <td><button style={{height:'35px', width:'55px'}} className="button-1" onClick={openCancelModel} >cancel</button></td>
    </tr>
    <div>
    <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        contentLabel="Example Modal"
      >
        <h2>Cancel Order</h2>
        <br />
        <button onClick={closeModal} >Close</button>
        <br />
        <br />
       <label>Select Refund Mode : </label>
       <Select 
        onChange={modeTypeChange}
        value={refundMethod}
        options={options} />
        <br />
        <br />
        {
          isAccount && 
          <div>
            <label>Account Number : </label>
            <input type="text" onChange={(e) => {setCancelBooking({...cancelBook,accountNo : e.target.value})}} ></input>
            <br/>
            <label>IFSC Code : </label>
            <input type="text" onChange={(e) => {setCancelBooking({...cancelBook,ifscCode : e.target.value})}} ></input>
          </div>
        }
        {
          isUpi && 
          <div>
            <label>Upi Id : </label>
            <input type="text" onChange={(e) => {setCancelBooking({...cancelBook,upiId : e.target.value})}} ></input>
            <br/>
          </div>
        }
        <br />
        <br />
          <div>
            <label>Adult Quantity : </label>
            <input type="number" onChange={(e) => {setCancelBooking({...cancelBook,adultQnt : e.target.value})}} ></input>
            <br/>
          </div>
          <div>
            <label>Child Quantity : </label>
            <input type="number" onChange={(e) => {setCancelBooking({...cancelBook,childQnt : e.target.value})}} ></input>
            <br/>
          </div>

        <button onClick={cancelNow} > Cancel Now </button>

      </Modal>
 

    </div>
    </>
  )
}

export default SingleOrder