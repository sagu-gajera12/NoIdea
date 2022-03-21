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
  const [cancelResponse,setCancelResponse] = useState({});
  const [isCancelInfo,setCancelInfo] = useState(false);

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
         setCancelInfo(true);
         setCancelResponse(response.data.data)
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
              <td>{props.index + 1}</td>
              <td>{props.order.orderId}</td>
              <td>{props.order.paymentId}</td>
              <td>{props.order.placeResponseDto.placeName}</td>
              <td>{props.order.visitDate}</td>
              <td> Adult: {props.order.adultQnt} Child: {props.order.childQnt}</td>
              <td>₹{props.order.amount}</td>
              <td>
                {props.order.completed &&  <b>Completed</b>}
                {!props.order.completed &&  <b>Not Completed</b>}
              </td>
              <td>
              {
                !props.order.completed && 
                <div>
                  <span style={{cursor:'pointer',fontSize: '30px'}} onClick={()=>{
                      alert('booking not completed try to again booking')
                    }} className="bi bi-receipt" />
                </div>
              
              }
              {
                props.order.completed && 
                <div>
                  <span style={{cursor:'pointer',fontSize: '30px'}} onClick={()=>{
                     console.log("dummy");
                    }} className="bi bi-receipt" />
                </div>
              
              }
              </td>
              <td>
              {
                props.order.completed && props.order.canCancel && !props.order.cancelled &&
                <button style={{height:'35px', width:'55px'}} className="button-1" onClick={openCancelModel} >cancel</button>
              }
              {
                (!props.order.completed || !props.order.canCancel || props.order.cancelled) &&
                <button disabled style={{height:'35px', width:'55px'}} className="button-2" onClick={openCancelModel} >cancel</button>
              }
              </td>
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
        {
          !isCancelInfo &&
          <div>
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
        </div>
        }
        {
          isCancelInfo &&

          <div>

            <h2>Cancel Information</h2><br/>
            <label>cancelId</label><br/>
            <p>{cancelResponse.cancelId}</p>
            <label>refundMode</label><br/>
            <p>{cancelResponse.refundMode}</p>
            { 
              cancelResponse.refundMode == "Account" && 
              <div>
                <label>accountNumber</label><br/>
                <p>{cancelResponse.accountNumber}</p>
                <label>ifscCode</label><br/>
                <p>{cancelResponse.ifscCode}</p>
              </div>
            }
            { 
              cancelResponse.refundMode == "upi" && 
              <div>
                <label>upiId</label><br/>
                <p>{cancelResponse.upiId}</p>
              </div>
            }
            <label>refundAmount</label><br/>
             <p>{cancelResponse.refundAmount}</p>
             <label>adultQntCancel</label><br/>
             <p>{cancelResponse.adultQntCancel}</p>
             <label>childQntCancel</label><br/>
             <p>{cancelResponse.childQntCancel}</p>
             <label>cancelCharge</label><br/>
             <p>{cancelResponse.cancelCharge}</p>
             <label>status</label><br/>
             <p>{cancelResponse.status}</p><br/>
             <label>Note:</label> <b> Refund Will procceed upto 48 hours</b> <br/>
             <button onClick={closeModal} >Close</button>
          </div>

        }
      </Modal>
 

    </div>
    </>
  )
}

export default SingleOrder