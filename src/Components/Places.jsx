import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import BaseUrl from "./BaseUrl";
import SinglePlace from "./SinglePlace";
import Select from 'react-select';

let plaeObj = {
  stateName : "",
  cityName : "",
  placeName : ""
};

const Places = () => {
  const [filter, setFilter] = useState({
    "stateName": "",
    "cityName": "",
    "placeName": "",
  });

  
  const[places,setPlaces]=useState([]);
  const [curstate,setcurState] = useState("");
  const [statesss,setStates] = useState([]);
  let [cities,setCities] = useState([]);
  const [curCity,setCity] = useState("");

   useEffect(() => {
    plaeObj = {
      stateName : "",
      cityName : "",
      placeName : ""
    };

    const nochoce = {value : "" , label : "No Choice"};
    
    if(!statesss.includes(nochoce)) statesss.push(nochoce);

    for(let i = 0; i < states.length; i++){
      const items = {value : states[i],label : states[i]};
      statesss.push(items)
    }
    
    setStates(statesss);
    getData()
    
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
    cities = [];
    setcurState(value);
    setFilter({...filter,stateName:value.value});
    plaeObj.stateName = value.value;
    getData()
    console.log(cities);
    cities.push({value : "",label : "No Choice"})
    if(value.value != ""){
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
  }

  const SelectedCityOption = (value) => {
    setCity(value);
    setFilter({...filter,cityName:value.value});
    plaeObj.cityName = value.value;
    getData()
  } 

  const getData = () => {
    console.log(JSON.stringify(plaeObj));
      axios.post(`${BaseUrl}/place/search/1`, JSON.stringify(plaeObj), {
        headers: {
            'Content-Type': 'application/json'
        }}).then(
        (response) => {
           setPlaces(response.data.data)
        },
        (error) => {
          console.log(error);
        }
      );
  }
 

  const placeChaned = (e) => {
    setFilter({...filter,placeName:e.target.value})
    plaeObj.placeName = e.target.value;
    getData()
  }

  return (<div style={{ background: '#e9ebf0' }}>


    <form className="form-inline my-2 my-lg-0">
      <Row xs={2} md={4} style={{ padding:'30px', margin: '50px' }} >
        <Col><Select
                padding="50px"
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

      {places.length > 0 && places.map((place, index) => {
          return (<SinglePlace index={index} place={place}></SinglePlace>)
        })
      }

      {places.length == 0 && <div> no places found </div>}

    </Row>

  </div>)
}

export default Places;
