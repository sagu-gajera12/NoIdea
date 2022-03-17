import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BaseUrl from "./BaseUrl";
import SinglePlace from "./SinglePlace";
const Places = () => {
  const [filter, setFilter] = useState({
    "stateName": "",
    "cityName": "ah",
    "placeName": "",
  });

  console.log(JSON.stringify(filter));

  let places = [
    {
      "placeId": 1,
      "placeName": "kakariya",
      "placeDescription": "dfsdf fdsf",
      "startTime": "09:00:00",
      "endTime": "12:00:00",
      "city": "ahmedabad",
      "state": "Gujarat",
      "latitude": "545.6",
      "longitude": "556.56",
      "priceAdult": "50",
      "priceChild": "25",
      "picUrl": "sd/fds"
    },
    {
      "placeId": 1,
      "placeName": "kakariya",
      "placeDescription": "dfsdf fdsf",
      "startTime": "09:00:00",
      "endTime": "12:00:00",
      "city": "ahmedabad",
      "state": "Gujarat",
      "latitude": "545.6",
      "longitude": "556.56",
      "priceAdult": "50",
      "priceChild": "25",
      "picUrl": "sd/fds"
    },
    {
      "placeId": 1,
      "placeName": "kakariya",
      "placeDescription": "dfsdf fdsf",
      "startTime": "09:00:00",
      "endTime": "12:00:00",
      "city": "ahmedabad",
      "state": "Gujarat",
      "latitude": "545.6",
      "longitude": "556.56",
      "priceAdult": "50",
      "priceChild": "25",
      "picUrl": "sd/fds"
    }
  ]

  useEffect(() => {

    let temp = JSON.stringify({
      "stateName": "",
      "cityName": "ah",
      "placeName": "",
    })
    console.log(temp);
    var raw = JSON.stringify({
      "stateName": "",
      "cityName": "ah",
      "placeName": ""
    });
    var data = JSON.stringify({
      stateName: "",
      cityName: "ah",
      placeName: ""
    });
    console.log(JSON.stringify(filter), filter);
    var form_data = new FormData();
    form_data.append('username', "8944512151");
    form_data.append('password', "803726");
    //form_data.append('placeName',"");

    axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        config.headers.authorization = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4OTQ0NTEyMTUxIiwiZXhwIjoxNjUwMTM0ODY5LCJpYXQiOjE2NDc1NDI4Njl9.8qhq27vFEyFSoA1dr_IJ8F7nz8poEMm25RPpOpVkb37ODc1YYIPNGFvk6IoOf4OoNx5_dLkekuSn6XQt6kS8kw";
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    let i=1;

    axios.get(`${BaseUrl}/place/search/${i}`, {
        "stateName": "s",
        "cityName": "s",
        "placeName": "s",
      }).then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );



  }, []);

  

  return (<div style={{ background: '#e9ebf0' }}>Places


    <form class="form-inline my-2 my-lg-0">
      <Row xs={2} md={4} style={{ padding: '10px' }} >
        <Col><input className="form-control mr-sm-2" type="search" placeholder="State" aria-label="Search" /></Col>
        <Col> <input className="form-control mr-sm-2" type="search" placeholder="City" aria-label="Search" /></Col>
        <Col>   <input className="form-control mr-sm-2" type="search" placeholder="Place" aria-label="Search" /></Col>
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
