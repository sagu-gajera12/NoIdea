import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" style={{}} to="/home" >
              Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{}} to="/bookticket" >
              Book Ticket
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{}} to="/touristattractions" >
              Tourist Attractions
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{}} to="/howtoreach" >
              How To Reach
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  );
};

export default Header;
