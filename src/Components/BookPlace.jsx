import React, { useEffect, useState } from "react";
import BaseUrl from "./BaseUrl";
import { useLocation, useParams } from 'react-router-dom';

import axios from "axios";

import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Button } from "bootstrap";

const BookPlace = (props) => {

    const location = useLocation();

    const intialOrder = {
        placeId: location.state.placeId,
        adultQnt: 0,
        childQnt: 0,
        visitDate: "2/5/2022"
    }

    const [placeId, setPlaceId] = useState(location.state.placeId);
    const [place, setPlace] = useState({});
    const [order, setOrder] = useState(intialOrder);
    const [price, setPrice] = useState(0);
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        console.log(placeId)
        axios.get(`${BaseUrl}/place/${placeId}`).then(
            (response) => {
                console.log(response);
                setPlace(response.data.data)
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    const placeOrder = () => {

        console.log(order);

        //login condition......

        // login page...

        // with token send request...

        // response send to booking review page

    }

    const chanegeDataA = (e) => {
        setOrder({ ...order, adultQnt: e.target.value })
    }
    const chanegeDataC = (e) => {
        setOrder({ ...order, childQnt: e.target.value })
    }


    return (
        <div>
            <p>Place Name : {place.placeName}</p>
            <p>Place Description : {place.placeDescription}</p>
            <p>Open Time: {place.startTime}</p>
            <p>Close Time: {place.endTime}</p>
            <p>City : {place.city}</p>
            <p>State : {place.state}</p>
            <p>Adult Price : {place.priceAdult}</p>
            <p>Child Price : {place.priceChild}</p>

            <label>
                Adult Qauntity:
                <input type="number" value={order.adultQnt} onChange={chanegeDataA} />
            </label>
            <label>
                Child Qauntity:
                <input type="number" value={order.childQnt} onChange={chanegeDataC} />
            </label>
            <label>Price: {price}</label>
            <label>Visit Date</label>
            <DatePicker
                selected={startDate}
                onChange={date => setOrder({ ...order, visitDate: date.toString })}
            />
            <button onClick={placeOrder}  >Submit</button>

        </div>
    )
}

export default BookPlace