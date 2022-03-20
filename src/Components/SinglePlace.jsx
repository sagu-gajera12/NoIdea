import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SinglePlace = (props) => {

  let navigate=useNavigate();

  const routechange= ()=>{
           navigate("/bookticket",{state:props.place.placeId})
  }
  
  console.log(props);
  return (<>
    <Col xs={12} md={8} style={{margin:'10px'}}>
      <Card style={{padding:'10px'}}>
        <Row style={{padding:'10px'}}>
          <Col xs={12} md={4}>
            <Card.Img src={props.place.picUrl}></Card.Img>
          </Col>
          <Col xs={12} md={8} style={{textAlign:'left'}}>
            <Card.Title>{props.place.placeName}</Card.Title>
            <Card.Text>
              {props.place.placeDescription}
            </Card.Text>
            <Button onClick={routechange}>Booking</Button>
          </Col>
        </Row>
      </Card>
    </Col>
    
    </>
  );
};

export default SinglePlace;
