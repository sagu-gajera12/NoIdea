import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BaseUrl from "./BaseUrl";
import DropdownList from "react-widgets/DropdownList";
import SinglePlace from "./SinglePlace";

const Places = () => {
  const [filter, setFilter] = useState({
    stateName:"",
    cityName:"",
    placeName:""
  });

  const [places, setPlaces] = useState([]);

  console.log(JSON.stringify(filter));

  useEffect(() => {
    console.log(JSON.stringify(filter), filter);
    axios.post(`${BaseUrl}/place/search/1`, JSON.stringify(filter),{headers: {
      "Content-Type": "application/json"}
    }).then(
          (response) => {
            console.log(response);
            setPlaces(response.data.data)
          },
          (error) => {
            console.log(error);
          }
        );
  }, []);

  let state = [ "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttarakhand",
                "Uttar Pradesh",
                "West Bengal",
                "Andaman and Nicobar Islands",
                "Chandigarh",
                "Dadra and Nagar Haveli",
                "Daman and Diu",
                "Delhi",
                "Lakshadweep",
                "Puducherry"]

  return (<div style={{ background: '#e9ebf0' }}>Places


    <form class="form-inline my-2 my-lg-0">
      <Row xs={2} md={4} style={{ padding: '10px',margin:'10px' }} >
        <Col><input className="form-control mr-sm-2" type="search" placeholder="State" aria-label="Search" onChange={(e)=>setFilter({...filter,stateName : e.target.value})}/></Col>
        <Col> <input className="form-control mr-sm-2" type="search" placeholder="City" aria-label="Search" onChange={(e)=>setFilter({...filter,cityName : e.target.value})}/></Col>
        <Col>   <input className="form-control mr-sm-2" type="search" placeholder="Place" aria-label="Search" onChange={(e)=>setFilter({...filter,placeName : e.target.value})}/></Col>
        <Col>  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button></Col>
      </Row>
    </form>

    <Row xs={1} sm={1} md={2} style={{ padding: '20px' }}>
      {
        places.map((place, index) => {
          return (<SinglePlace place={place}></SinglePlace>)
        })
      }

    </Row>

  </div>)
}

export default Places;
