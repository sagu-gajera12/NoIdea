import React from "react";

const SingleCancelOrder = (props) => {
  return (
    <>
      <tr>
      <td>{props.order.cancelId}</td>
      <td>{props.order.bookingId}</td>
        <td>{props.order.refundMode}</td>
        <td>{props.order.refundMode=='upi'&&<>{props.order.upiId}</>}
        {props.order.refundMode=='Account'&&<>{props.order.accountNumber}({props.order.ifscCode})</>}
        </td>
        <td>{props.order.adultQntCancel}</td>
        <td>{props.order.childQntCancel}</td>
        <td>₹{props.order.cancelCharge}</td>
        <td>
        {props.order.refundAmount}
        </td>
        <td> 
         {props.order.status}
        </td>
      </tr>
    </>
  );
};

export default SingleCancelOrder;
