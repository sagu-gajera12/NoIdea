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
              Operational Hours - 8:00 am to 6:00 pm. (If you are purchasing
              this ticket then you don't need to purchase the SoU Entry ticket
              separately. SoU entry is included in this ticket.) This ticket
              does include Express entry (to avoid standing in a queue) to
              Viewing Gallery in addition to SoU entry, complimentary access to
              Light and Sound show, Valley of Flowers, Sardar Sarovar Dam
              Viewpoints and Bus Service
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
