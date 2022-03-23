// import React, { useEffect, useState } from "react";

// import { useLocation, useNavigate } from "react-router-dom";

// import { Button, Card, Col, Container, Row } from "react-bootstrap";
// import axios from "axios";
// import BaseUrl from "./BaseUrl";
// import "../BookingReview.css";
// import { findDOMNode } from "react-dom";

// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = () => {
//       resolve(true);
//     };
//     script.onerror = () => {
//       resolve(false);
//     };
//     document.body.appendChild(script);
//   });
// }

// const BookingReview = (props) => {
//   let location = useLocation();
//   const [data, setData] = useState(location.state);
//   const [finaldata, setFinalData] = useState({});

//   const intial = {
//     orderId: data.orderId,
//     paymentId: "dsad_DSAddsdsdsa",
//   };

//   let navigate = useNavigate();

//   const [bookInfo, setBookInfo] = useState({});
//   const [bookConfirm, setBookConfirm] = useState(intial);

//   useEffect(() => {
//     setData(location.state);
//     setBookConfirm(intial);
//     axios.interceptors.request.use(
//       function (config) {
//         config.headers.authorization = `Bearer ${localStorage.getItem(
//           "token"
//         )}`;
//         return config;
//       },
//       function (error) {
//         return Promise.reject(error);
//       }
//     );

//     let i = data.bookingId;
//     axios.get(`${BaseUrl}/secure/booking/${i}`).then(
//       (response) => {
//         console.log(response.data.data);
//         let temp1 = response.data.data.detailsResponseDto;
//         let temp2 = response.data.data.placeResponseDto;
//         setFinalData({
//           ...finaldata,
//           adultQnt: temp1.adultQnt,
//           childQnt: temp1.childQnt,
//           priceAdult: temp2.priceAdult,
//           priceChild: temp2.priceChild,
//           amount: temp1.amount,
//           placeName: temp2.placeName,
//           city: temp2.city,
//           state:temp2.state,
//           startTime: temp2.startTime,
//           endTime: temp2.endTime,
//         });
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   }, []);

//   const displayRazorpay = async (data) => {
//     const res = await loadScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//     );

//     if (!res) {
//       alert("Oops! something went wrong");
//       return;
//     }
//     const options = {
//       key: "rzp_test_9B8AXwdinhrVTx",
//       currency: "INR",
//       amount: data.price,
//       order_id: data.orderId,
//       description: "Pay your amount here.",
//       handler: function (response) {
//         console.log(response.razorpay_order_id);
//         console.log(response.razorpay_payment_id);
//         console.log(response.razorpay_signature);
//         intial.orderId = response.razorpay_order_id;
//         intial.paymentId = response.razorpay_payment_id;
//         confirmBook();
//       },
//     };
//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   const confirmBook = () => {
//     axios.interceptors.request.use(
//       function (config) {
//         config.headers.authorization = `Bearer ${localStorage.getItem(
//           "token"
//         )}`;
//         return config;
//       },
//       function (error) {
//         return Promise.reject(error);
//       }
//     );
//     console.log(bookConfirm);
//     axios
//       .post(`${BaseUrl}/secure/confirm`, JSON.stringify(bookConfirm), {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then(
//         (response) => {
//           console.log(response);
//           navigate("/place/booksuccess", { state: response.data.data });
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//   };

//   const confirmorder = () => {
//     displayRazorpay(data);
//   };

//   return (
//     <>
//       <div className="wrapper">
//         <div className="content">
//           <div className="header">
//             <div className="d-flex-row flex-1 p-top30">
//               <div className="pro-details">
//                 <div className="pro-detail-list">
//                   <div className="pro-title">Pease Confirm Booking details</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="billing-details">
//             <div className="billing-details-content">
//               <div className="bil-title">Billing Details</div>
//               <table>
//                 <tbody>
//                   <tr>
//                     <td>Adult</td>
//                     <td className="right-t">{finaldata.adultQnt} X ₹{finaldata.priceAdult}</td>
//                   </tr>
//                   <tr>
//                     <td> children</td>
//                     <td className="right-t">{finaldata.childQnt} X ₹{finaldata.priceChild}</td>
//                   </tr>
//                   <tr></tr>
//                   <tr className="br-top">
//                     <td>Amount Payable</td>
//                     <td className="right-t">₹{finaldata.amount}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="list-content">
//             <div className="list-content-item d-flex-row">
//               <div className="list-icon d-flex">
//                 <i className="material-icons" style={{ paddingRight: "80%" }}>
//                   destination
//                 </i>
//               </div>
//               <div className="list-name d-flex flex-1">{finaldata.placeName}</div>
//             </div>
//             <div className="list-content-item d-flex-row">
//               <div className="list-icon d-flex">
//                 <i className="material-icons">place</i>
//               </div>
//               <div className="list-name d-flex flex-1">{finaldata.city} , {finaldata.state}</div>
//             </div>
//             <div className="list-content-item d-flex-row">
//               <div className="list-icon d-flex">
//                 <i className="material-icons">watch_later</i>
//               </div>
//               <div className="list-name d-flex flex-1">{finaldata.startTime} - {finaldata.endTime}</div>
//             </div>
//           </div>
//           <div className="position">
//             <Button className="btn" onClick={confirmorder}>
//               submit
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BookingReview;





import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import BaseUrl from "./BaseUrl";
import "../BookingReview.css";
import { findDOMNode } from "react-dom";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const BookingReview = (props) => {
  let location = useLocation();
  const [data, setData] = useState(location.state);
  const [finaldata, setFinalData] = useState({});

  const intial = {
    orderId: data.orderId,
    paymentId: "dsad_DSAddsdsdsa",
  };

  let navigate = useNavigate();

  const [bookInfo, setBookInfo] = useState({});
  const [bookConfirm, setBookConfirm] = useState(intial);

  useEffect(() => {

    console.log(data)

    if(data==undefined)
    {
      navigate('/places')
    }

    setData(location.state);
    setBookConfirm(intial);
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

    let i = data.bookingId;
    axios.get(`${BaseUrl}/secure/booking/${i}`).then(
      (response) => {
        console.log(response.data.data);
        let temp1 = response.data.data.detailsResponseDto;
        let temp2 = response.data.data.placeResponseDto;
        setFinalData({
          ...finaldata,
          adultQnt: temp1.adultQnt,
          childQnt: temp1.childQnt,
          priceAdult: temp2.priceAdult,
          priceChild: temp2.priceChild,
          amount: temp1.amount,
          placeName: temp2.placeName,
          city: temp2.city,
          state:temp2.state,
          startTime: temp2.startTime,
          endTime: temp2.endTime,
          visitDate : temp1.visitDate
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const displayRazorpay = async (data) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Oops! something went wrong");
      return;
    }
    const options = {
      key: "rzp_test_9B8AXwdinhrVTx",
      currency: "INR",
      amount: data.price,
      order_id: data.orderId,
      description: "Pay your amount here.",
      handler: function (response) {
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_signature);
        intial.orderId = response.razorpay_order_id;
        intial.paymentId = response.razorpay_payment_id;
        confirmBook();
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const confirmBook = () => {
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
    console.log(bookConfirm);
    axios
      .post(`${BaseUrl}/secure/confirm`, JSON.stringify(intial), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          console.log(response);
          if(response.data.status == "success"){
            navigate("/place/booksuccess", { state: response.data.data });
          }else{
            alert('Ticket not booked try again..')
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const confirmorder = () => {
    displayRazorpay(data);
  };

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <div className="header">
            <div className="d-flex-row flex-1 p-top30">
              <div className="pro-details">
                <div className="pro-detail-list">
                  <div className="pro-title">Pease Confirm Booking details</div>
                </div>
              </div>
            </div>
          </div>
          <div className="billing-details">
            <div className="billing-details-content">
              <div className="bil-title">Billing Details</div>
              <table>
                <tbody>
                  <tr>
                    <td>Adult</td>
                    <td className="right-t">{finaldata.adultQnt} X ₹{finaldata.priceAdult}</td>
                  </tr>
                  <tr>
                    <td> children</td>
                    <td className="right-t">{finaldata.childQnt} X ₹{finaldata.priceChild}</td>
                  </tr>
                  <tr></tr>
                  <tr className="br-top">
                    <td>Amount Payable</td>
                    <td className="right-t">₹{finaldata.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="list-content">
            <div className="list-content-item d-flex-row">
              <div className="list-icon d-flex">
                <i className="material-icons" style={{ paddingRight: "80%" }}>
                  destination
                </i>
              </div>
              <div className="list-name d-flex flex-1">{finaldata.placeName}</div>
            </div>
            <div className="list-content-item d-flex-row">
              <div className="list-icon d-flex">
                <i className="material-icons">place</i>
              </div>
              <div className="list-name d-flex flex-1">{finaldata.city} , {finaldata.state}</div>
            </div>
            <div className="list-content-item d-flex-row">
              <div className="list-icon d-flex">
                <i className="material-icons">date_range</i>
              </div>
              <div className="list-name d-flex flex-1"> Date : {finaldata.visitDate}</div>
            </div>
            <div className="list-content-item d-flex-row">
              <div className="list-icon d-flex">
                <i className="material-icons">watch_later</i>
              </div>
              <div className="list-name d-flex flex-1">Time :  {finaldata.startTime} - {finaldata.endTime}</div>
            </div>
            
          </div>
          <div className="position">
            <Button className="btn" onClick={confirmorder}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingReview;
