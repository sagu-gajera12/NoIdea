import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

const SinglePlace = (props) => {
    console.log(props);
  return (
    <Col>
     
     <Card style={{height:'200px'}}>
     <Row>
     <Col xs={4}  md={4}>
       <Card.Img  src='https://www.soutickets.in/assets/images/banner_home_img.jpg'></Card.Img>        
     </Col>
     <Col xs={8} md={8}>
     <Card.Title>{props.place.placeName}</Card.Title>
     <Card.Text>{props.place.placeDescription}</Card.Text>
     <Button>Booking</Button>
     </Col>

     </Row>
     </Card>
     
    </Col>
  )
}

export default SinglePlace