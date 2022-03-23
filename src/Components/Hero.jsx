import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import arrow from '../images/arrow.png'
import "../Home.css";

function Hero({ content }) {
  const [number, setNumber] = useState(1);

  console.log(content);

  useEffect(() => {
    setTimeout(
      () => setNumber((prevIndex) => (prevIndex === 5 ? 1 : prevIndex + 1)),
      4000
    );
    return () => {};
  }, [number]);

  let navigate = useNavigate();

  const routechange = () => {
    console.log("yes");
    navigate("/places");
  };

  return (
    <>
      <div className="hero-main">
        <div className={number === 1 ? "hero hero-01 active" : "hero hero-01"}>
          <div className="heading-hero">Statue Of unity</div>
          <div id="scroll"></div>
          <Button onClick={routechange}>Book Ticket</Button>
        </div>
        <div className={number === 2 ? "hero hero-02 active" : "hero hero-02"}>
          <div className="heading-hero">Baroda Museum</div>

          <div id="scroll"></div>
          <Button onClick={routechange}>Book Ticket</Button>
        </div>
        <div className={number === 3 ? "hero hero-03 active" : "hero hero-03"}>
          <div className="heading-hero">Diu Fort</div>

          <div id="scroll"></div>
          <Button onClick={routechange}>Book Ticket</Button>
        </div>
        <div className={number === 4 ? "hero hero-04 active" : "hero hero-03"}>
          <div className="heading-hero">Kutch Museum</div>

          <div id="scroll"></div>
          <Button onClick={routechange}>Book Ticket</Button>
        </div>
        <div className={number === 5 ? "hero hero-05 active" : "hero hero-03"}>
          <div className="heading-hero">Laxmi Vilas Palace</div>

          <div id="scroll"></div>
          <Button onClick={routechange}>Book Ticket</Button>
        </div>
      </div>
    </>
  );
}

export default Hero;
