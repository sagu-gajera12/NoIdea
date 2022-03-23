import axios from "axios";
import React, { useState } from "react";

import Modal from "react-modal";
import Select from "react-select";
import BaseUrl from "./BaseUrl";
import "../SingleOrder.css";
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "",
    background: "",
    padding: "",
  },
};

const SingleOrder = (props) => {
  let navigate = useNavigate();

  const cancelBookingjs = {
    bookingId: "",
    adultQnt: 0,
    childQnt: 0,
    accountNo: "",
    ifscCode: "",
    upiId: "",
    refundMode: "",
  };

  const options = [
    { value: "Account", label: "Get Payment in Account" },
    { value: "upi", label: "Get Payment from Upi" },
  ];

  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [refundMethod, setrefundMethod] = useState("Get Payment in Account");
  const [isAccount, setRefundAccount] = useState(false);
  const [isUpi, setRefundUpi] = useState(false);
  const [cancelBook, setCancelBooking] = useState(cancelBookingjs);
  const [cancelResponse, setCancelResponse] = useState({});
  const [isCancelInfo, setCancelInfo] = useState(false);

  const closeModal = () => {
    setmodalIsOpen(false);
  };

  const openCancelModel = () => {
    setCancelBooking({ ...cancelBook, bookingId: props.order.bookingId });
    setmodalIsOpen(true);
  };

  const modeTypeChange = (value) => {
    setCancelBooking({ ...cancelBook, refundMode: value.value });
    if (value.value == "Account") {
      setRefundAccount(true);
      setRefundUpi(false);
    } else if (value.value == "upi") {
      setRefundUpi(true);
      setRefundAccount(false);
    }
    setrefundMethod(value.value);
    console.log(value.value);
  };

  const cancelNow = (e) => {
    e.preventDefault();
    console.log(cancelBook);

    axios
      .post(`${BaseUrl}/secure/cancel`, JSON.stringify(cancelBook), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          setCancelInfo(true);
          setCancelResponse(response.data.data);
          console.log(response.data.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const SuccessRecipe = (e) => {
    axios
      .get(`${BaseUrl}/secure/booking/success/${props.order.bookingId}`)
      .then(
        (response) => {
          navigate("/place/booksuccess", { state: response.data.data });
        },
        (e) => {}
      );
  };

  return (
    <>
      <tr>
        <td>{props.index + 1}</td>
        <td>{props.order.orderId}</td>
        <td>{props.order.paymentId}</td>
        <td>{props.order.placeResponseDto.placeName}</td>
        <td>{props.order.visitDate}</td>
        <td>
          {" "}
          Adult: {props.order.adultQnt} Child: {props.order.childQnt}
        </td>
        <td>₹{props.order.amount}</td>
        <td>
          {props.order.completed && <b>Completed</b>}
          {!props.order.completed && <b>Not Completed</b>}
        </td>
        <td>
          {!props.order.completed && (
            <div>
              <span
                style={{ cursor: "pointer", fontSize: "30px" }}
                onClick={() => {
                  alert("booking not completed try to again booking");
                }}
                className="bi bi-receipt"
              />
            </div>
          )}
          {props.order.completed && (
            <div>
              <span
                style={{ cursor: "pointer", fontSize: "30px" }}
                onClick={SuccessRecipe}
                className="bi bi-receipt"
              />
            </div>
          )}
        </td>
        <td>
          {props.order.completed &&
            props.order.canCancel &&
            !props.order.cancelled && (
              <button
                style={{ height: "35px", width: "55px" }}
                className="button-1"
                onClick={openCancelModel}
              >
                cancel
              </button>
            )}
          {(!props.order.completed ||
            !props.order.canCancel ||
            props.order.cancelled) && (
            <button
              disabled
              style={{ height: "35px", width: "55px" }}
              className="button-2"
              onClick={openCancelModel}
            >
              cancel
            </button>
          )}
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
          {!isCancelInfo && (
            <div className="main" style={{ marginTop: "5%" }}>
              <form id="cancelForm">
                <div style={{ textAlign: "right", padding: "10px" }}>
                  {" "}
                  <button id="close">close</button>{" "}
                </div>
                <h1 className="cancel">Cancel Booking</h1>
                <fieldset>
                  <legend>
                    <div className="number">1</div> Refund Info:
                  </legend>
                  <label htmlFor="selectOption">Choose Refund mode:</label>
                  <br />
                  <Select
                    id="selectOption"
                    onChange={modeTypeChange}
                    value={refundMethod}
                    options={options}
                  />
                  <br />
                  {isAccount && (
                    <div>
                      <label htmlFor="AccountNumber">Account Number:</label>
                      <br />
                      <input
                        className="inputField"
                        type="text"
                        id="AccountNumber"
                        name="user_account"
                        onChange={(e) => {
                          setCancelBooking({
                            ...cancelBook,
                            accountNo: e.target.value,
                          });
                        }}
                      />
                      <br />
                      <label htmlFor="Code">IFSC Code</label>
                      <br />
                      <input
                        className="inputField"
                        type="text"
                        id="Code"
                        name="user_code"
                        onChange={(e) => {
                          setCancelBooking({
                            ...cancelBook,
                            ifscCode: e.target.value,
                          });
                        }}
                      />
                      <br />
                    </div>
                  )}
                  {isUpi && (
                    <div>
                      <label>Upi Id : </label>
                      <br />
                      <input
                        className="inputField"
                        type="text"
                        name="user_account"
                        onChange={(e) => {
                          setCancelBooking({
                            ...cancelBook,
                            upiId: e.target.value,
                          });
                        }}
                      ></input>
                      <br />
                    </div>
                  )}
                </fieldset>
                <fieldset>
                  <legend>
                    <div className="number">2</div> Ticket Info:
                  </legend>
                  <label htmlFor="adult">Adult Qauntity:</label>
                  <br />
                  <input
                    className="inputField"
                    type="number"
                    id="adult"
                    name="user_account"
                    onChange={(e) => {
                      setCancelBooking({
                        ...cancelBook,
                        adultQnt: e.target.value,
                      });
                    }}
                  />
                  <br />
                  <label htmlFor="child">child Qauntity</label>
                  <br />
                  <input
                    className="inputField"
                    type="number"
                    id="child"
                    name="user_code"
                    onChange={(e) => {
                      setCancelBooking({
                        ...cancelBook,
                        childQnt: e.target.value,
                      });
                    }}
                  />
                  <br />
                </fieldset>
                <input
                  className="cancelOrder"
                  type="submit"
                  defaultValue="Cancel order"
                  onClick={cancelNow}
                />
              </form>
            </div>
          )}
          {isCancelInfo && (
            <>
              <div style={{ height: "500px", width: "550px" }}>
                <div className="invoice-card" style={{ height: "500px", width: "450px" }}>
                  <div className="invoice-title">
                    <div id="main-title">
                      <h2>Cancelled Receipt</h2>
                    </div>
                    <div id="main-title">
                      <h4>Cancel ID</h4>
                      <h4>9</h4>
                    </div>
                    { 
              cancelResponse.refundMode == "upi" &&    <div id="main-title">
                      <h4>UPI ID</h4>
                      <h4>{cancelResponse.upiId}</h4>
                    </div>}
                    { 
              cancelResponse.refundMode == "Account" &&  <div id="main-title">
                      <h4>Account No</h4>
                      <h4>{cancelResponse.accountNumber}</h4>
                    </div>}
                    <div id="main-title">
                      <h4>Status</h4>
                      <h4>In-Progress</h4>
                    </div>
                  </div>
                  <div className="invoice-details">
                    <table className="invoice-table">
                      <thead>
                        <tr>
                          <td />
                          <td id="qauntity">QUANTITY</td>
                          <td>PRICE</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="row-data">
                          <td>Adult</td>
                          <td id="unit">{cancelResponse.adultQntCancel}</td>
                          <td>{props.order.placeResponseDto.priceAdult* cancelResponse.adultQntCancel}</td>
                        </tr>
                        <tr className="row-data">
                          <td>child</td>
                          <td id="unit">{cancelResponse.childQntCancel}</td>
                          <td>{props.order.placeResponseDto.priceChild* cancelResponse.childQntCancel}</td>
                        </tr>
                        <tr className="calc-row">
                          <td colSpan={2}>Cancellation Charges</td>
                          <td>{cancelResponse.cancelCharge}</td>
                        </tr>
                        <tr className="calc-row">
                          <td colSpan={2}>Total</td>
                          <td>{cancelResponse.refundAmount}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="invoice-footer">
                    <button className="btn3 btn" id="later" onClick={closeModal}>
                      Close
                    </button>
                    <button className="btn3 btn">Print</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};

export default SingleOrder;
