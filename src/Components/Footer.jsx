import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <>

      <Row className="bg-dark" style={{padding:'10px' , color:'white'}}>
        
          

          <div>
            <a href="" className="m-3 text-reset fa-2x">
              <FaFacebookSquare></FaFacebookSquare>
            </a>
            <a href="" className=" m-3 text-reset fa-2x">
              <FaTwitterSquare></FaTwitterSquare>
            </a>
            <a href="" className=" m-3 text-reset fa-2x">
              <FaInstagramSquare></FaInstagramSquare>
            </a>
            <a href="" className=" m-3 text-reset fa-2x">
              <BsLinkedin></BsLinkedin>
            </a>
          </div>
      </Row>
      <Row style={{background:'black' , color:'white', fontSize:'17px'}}>
        <Col md={4} style={{padding:'20px 50px', textAlign:'left',color:'white'}}>
          <p style={{color:'whitesmoke', fontSize:'16px',paddingTop:'15px'}}>

            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </Col>

        <Col md={4} style={{padding:'17px'}}>
          <ul className="list-unstyled " style={{lineHeight:'2.5',color:'white'}}>
            <li>
              <a className="text-white" href="#!">Privacy Policy</a>
            </li>
            <li>
              <a className="text-white" href="#!">Refund Policy</a>
            </li>
            <li>
              <a className="text-white" href="#!">Cancellation Charge</a>
            </li>
            <li>
              <a className="text-white" href="#!">About us</a>
            </li>
          </ul>
        </Col>
        <Col md={4} style={{padding:'17px'}}>
        <ul className="list-unstyled text-decoration-none " style={{lineHeight:'2.5'}}>
            <li>
              <a className="text-decoration-none text-white"  href="#!">Privacy Policy</a>
            </li>
            <li>
              <a className="text-white" href="#!">Refund Policy</a>
            </li>
            <li>
              <a className="text-white" href="#!">Cancellation Charge</a>
            </li>
            <li>
              <a className="text-white" href="#!">About us</a>
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
      <div className='text-center p-4 bg-dark text-white' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)',fontSize:'18px' }}>
        © 2022 Copyright:
        <a className='text-reset fw-bold ' href='https://mdbootstrap.com/'>
            <span> </span>ghumegaindia.in
        </a>
      </div>
      </Row>
    </>
  );
};

export default Footer;
