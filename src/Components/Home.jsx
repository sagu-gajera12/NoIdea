import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import Header from "./Header";
import Hero from "./Hero";
import "../Home.css";

const Home = () => {
  const images = [
    { url: "https://www.soutickets.in/assets/images/banner_home_img.jpg" },
    { url: "https://www.soutickets.in/assets/images/banner_home_img2.jpg" },
    { url: "https://www.soutickets.in/assets/images/banner_home_img3.jpg" },
  ];

  return (
    <div>
      {/* <SimpleImageSlider
        width={window.innerWidth}
        height={700}
        images={images}
        showBullets={true}
        showNavs={true}
        autoPlay={true}
      /> */}

      <div className="home">
        <Hero content={images}></Hero>
        <br></br>
        <br></br>
        <div style={{ background: "white-smoke" }}>
          <div className="container-fluid my-5" style={{ background: "" }}>
            <section id="steps">
              <div className="text-center mb-5">
                <h2 className="font-weight-bold display-4 ">
                  Hassle Free Booking
                </h2>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="bg-light position-relative px-3 my-5">
                    <div
                      className="font-weight-bold circle text-white rounded-circle d-flex align-items-center justify-content-center mx-auto position-relative border border-white"
                      style={{
                        width: "60px",
                        height: "60px",
                        top: "-30px",
                        borderWidth: "4px !important",
                        backgroundColor: "black",
                        fontSize:'30px'
                      }}
                    >
                      1
                    </div>
                    <div className="px-3 text-center pb-3">
                      <h4>Select The Place</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-light position-relative px-3 my-5">
                    <div
                      className="font-weight-bold circle text-white rounded-circle d-flex align-items-center justify-content-center mx-auto position-relative border border-white"
                      style={{
                        width: "60px",
                        height: "60px",
                        top: "-30px",
                        borderWidth: "4px !important",
                        backgroundColor: "black",
                        fontSize:'30px'
                      }}
                    >
                      2
                    </div>
                    <div className="px-3 text-center pb-3">
                      <h4>Fill the Details and Do Payment</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-light position-relative px-3 my-5">
                    <div
                      className="font-weight-bold circle text-white rounded-circle d-flex align-items-center justify-content-center mx-auto position-relative border border-white"
                      style={{
                        width: "60px",
                        height: "60px",
                        top: "-30px",
                        borderWidth: "4px !important",
                        backgroundColor: "black",
                        fontSize:'30px'
                      }}
                    >
                      3
                    </div>
                    <div className="px-3 text-center pb-3">
                      <h4>Download the Ticket</h4>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
