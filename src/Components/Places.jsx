import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import BaseUrl from "./BaseUrl";
import SinglePlace from "./SinglePlace";
const Places = () => {
  const [filter, setFilter] = useState({
    "stateName": "",
    "cityName": "",
    "placeName": "",
  });

  console.log(JSON.stringify(filter));

  const[places,setPlaces]=useState([]);

   useEffect(() => {

    let i=1;

    axios.post(`${BaseUrl}/place/search/1`, filter).then(
          (response) => {
            console.log(response);
            console.log(response.data.data);
             setPlaces(response.data.data)
          },
          (error) => {
            console.log(error);
          }
        );



  }, []);

  const DoFilter = (e) =>{
    let i=1;
    console.log("do filter")
    e.preventDefault();
    axios.post(`${BaseUrl}/place/search/1`, filter).then(
          (response) => {
            console.log(response);
            console.log(response.data.data);
             setPlaces(response.data.data)
          },
          (error) => {
            console.log(error);
          }
        );


  }



  

  return (<div style={{ background: '#e9ebf0' }}>


    <form class="form-inline my-2 my-lg-0">
      <Row xs={2} md={4} style={{ padding:'25px', margin: '25px' }} >
        <Col><input className="form-control mr-sm-2" type="search" placeholder="State" aria-label="Search"  onChange={(e)=>{
          setFilter({...filter,stateName:e.target.value})
        }}/></Col>
        <Col> <input className="form-control mr-sm-2" type="search" placeholder="City" aria-label="Search" onChange={(e)=>{
          setFilter({...filter,cityName:e.target.value})
        }}/></Col>
        <Col>   <input className="form-control mr-sm-2" type="search" placeholder="Place" aria-label="Search" onChange={(e)=>{
          setFilter({...filter,placeName:e.target.value})
        }}/></Col>
        <Col>  <Button className="btn btn-success my-2 my-sm-0" type="submit" onClick={DoFilter}>Search</Button></Col>
      </Row>
    </form>

    <Row style={{ padding: '20px', justifyContent:'center'}} >

      {
        places.map((place, index) => {
          return (<SinglePlace index={index} place={place}></SinglePlace>)
        })
      }

    </Row>

  </div>)
}

export default Places;
