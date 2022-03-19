import React from 'react'

const SingleOrder = (props) => {
  return (
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
              <td><button style={{height:'35px', width:'55px'}} className="button-1">cancel</button></td>
            </tr>
  )
}

export default SingleOrder