import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap';

import { useNavigate } from "react-router-dom";


const OrderSuccess = (props) => {
   
    const [orderDetails,setorderDetails] = useState(props.details);

    useEffect(()=>{
        setorderDetails(props.details);
    },[])

  return (
    <Col>

        <div>
            <img src={orderDetails.qrResponseDto.qrUrl} width="500px" height="500px"></img>
        </div>
    
     
    </Col>
  )
}

export default OrderSuccess