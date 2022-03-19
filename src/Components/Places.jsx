import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import BaseUrl from "./BaseUrl";
import SinglePlace from "./SinglePlace";
import Select from 'react-select';

const Places = () => {
  const [filter, setFilter] = useState({
    "stateName": "",
    "cityName": "",
    "placeName": "",
  });


  const[places,setPlaces]=useState([]);
  const [curstate,setcurState] = useState("");
  const [statesss,setStates] = useState([]);
  const [cities,setCities] = useState([]);
  const [curCity,setCity] = useState("");

   useEffect(() => {
    for(let i = 0; i < states.length; i++){
      const items = {value : states[i],label : states[i]};
      statesss.push(items)
    }
    setStates(statesss);

    
  }, []);



  const states = [
    "Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
    "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal",
    "West Bengal"
  ];

  const SelectedstateOption = (value) => {
    setcurState(value);
    setFilter({...filter,stateName:value.value});
    getData()
    axios.get(`${BaseUrl}/place/states/${value.value}`).then(
      (response) => {
        for(let i = 0; i < response.data.data.length; i++){
          const items = {value : response.data.data[i],label : response.data.data[i]};
          cities.push(items)
        }
        setCities(cities);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  const SelectedCityOption = (value) => {
    setCity(value);
    setFilter({...filter,cityName:value.value});
    filterList();
  } 

  const getData = () => {
    setTimeout(()=>{
      axios.post(`${BaseUrl}/place/search/1`, filter).then(
        (response) => {
           setPlaces(response.data.data)
        },
        (error) => {
          console.log(error);
        }
      );
    },2000);
    console.log(filter);
    
  }
  
  const filterList = () => {
    getData()
  }

  const placeChaned = (e) => {
    setFilter({...filter,placeName:e.target.value})
    getData()
  }

  return (<div style={{ background: '#e9ebf0' }}>


    <form className="form-inline my-2 my-lg-0">
      <Row xs={2} md={4} style={{ padding:'25px', margin: '25px' }} >
        <Col><Select
                value={curstate}
                defaultValue=""
                onChange={SelectedstateOption}
                options={statesss}
          /></Col>
        <Col><Select
                value={curCity}
                defaultValue=""
                onChange={SelectedCityOption}
                options={cities}
          /></Col>
        <Col>   <input className="form-control mr-sm-2" type="search" placeholder="Place" aria-label="Search" onChange={placeChaned}/></Col>
        {/* <Col>  <Button className="btn btn-success my-2 my-sm-0" type="submit" onClick={DoFilter}>Search</Button></Col> */}
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
