import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../MyOrder.css'
import SingleOrder from './SingleOrder';
import BaseUrl from "./BaseUrl"

const MyOrder = () => {
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
    axios.get(`${BaseUrl}/secure/myorders`).then(
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
              <th>OrderId#</th>
              <th>PaymentID</th>
              <th>Place</th>
              <th>Visit Date</th>
              <th>Visitors Count</th>
              <th>Total Amount</th>
              <th>Payment Receipt</th>
              <th>Cancel Payment</th>
            </tr>
          </thead>
          <tbody>

{  ordersDetails.map((order,index)=>{

  return <SingleOrder order={order}></SingleOrder>
})              }

          </tbody>
        </table>
      </div>
    </div>
  </div>

  )
}

export default MyOrder