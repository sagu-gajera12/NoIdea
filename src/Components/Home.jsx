
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";

const Home = () => {

    let navigate=useNavigate();

    const routechange = () =>{
        console.log("yes");
            navigate("/places")

    }

    const images = [
        { url: "https://www.soutickets.in/assets/images/banner_home_img.jpg" },
        { url: "https://www.soutickets.in/assets/images/banner_home_img2.jpg" },
        { url: "https://www.soutickets.in/assets/images/banner_home_img3.jpg" },
      ];

  return <div>
    <SimpleImageSlider
        width={window.innerWidth}
        height={700}
        images={images}
        showBullets={true}
        showNavs={true}
        autoPlay={true}
      />
         <div className="container-fluid p-3">
            
            <Button onClick={routechange}>Book Ticket</Button>

         </div>

  </div>;
};

export default Home;
