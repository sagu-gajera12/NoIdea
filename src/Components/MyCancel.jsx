import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BaseUrl from './BaseUrl';
import SingleCancelOrder from './SingleCancelOrder';
import SingleOrder from './SingleOrder';

const MyCancel = () => {

    const [ordersDetails,setOrderDetails] = useState([]);
  useEffect(()=>{



    if(localStorage.getItem('token')!=null)
    {
      axios.interceptors.request.use(
        function (config) {
          config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
          return config;
        },
        function (error) {
          return Promise.reject(error); 
        }
      );
    axios.get(`${BaseUrl}/secure/mycancel`).then(
        (response) => {
            console.log(response.data.data);
            setOrderDetails(response.data.data)
        },
        (error) => {
            console.log(error);
        }
    );
    }else{

    }
    
  },[])

  return (
<div className="container-xl">
    <div className="table-responsive">
      <div className="table-wrapper">
        <table className="table table table-hover">
          <thead>
            <tr>
               <th>Cancel Id</th>
               <th>Booking Id</th>
              <th>Refund Mode</th>
              <th>Account No/ UPI ID</th>
              <th>adult Qnt</th>
              <th>child Qnt</th>
              <th>Cancellation Charges</th>
              <th>Refund Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>

{  ordersDetails.map((order,index)=>{

  return <SingleCancelOrder order={order}></SingleCancelOrder>
})              }

          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default MyCancel