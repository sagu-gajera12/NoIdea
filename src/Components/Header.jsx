import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import '../Header.css'
import { FiMenu } from 'react-icons/fi'
const Header = ({token,setToken}) => {

  useEffect(()=>{
    if(localStorage.getItem('token')!=null)
    {
           setToken(localStorage.getItem('token'));
    }
  })


  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-white bg-dark sticky-top" >
    
      <div className="container-fluid" >
      <h1 style={{fontSize:'35px',marginLeft:'40px'}}  className="navbar-brand text-white" ><i class="fa-solid fa-map-location-dot"></i></h1>
        <button style={{background:'white'}}  className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <FiMenu></FiMenu>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto font-bold" style={{fontSize:'19px'}}>
            <li className="nav-item">
              <Link className="nav-link" style={{color:'white', padding:'10px 20px'}} to="/home" >
              Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{color:'white', padding:'10px 20px'}} to="/places" >
              Book Ticket
              </Link>
            </li>
          {token==null && <li className="nav-item">
            <Link className="nav-link" style={{color:'white', padding:'10px 20px'}} to="/login" >
            Login
            </Link>
          </li>}
          {token!=null && <li className="nav-item">
            <Link className="nav-link" style={{color:'white', padding:'10px 20px'}} to="/myorder" >
            My Order
            </Link>
          </li>}
          {token!=null && <li className="nav-item">
            <Link className="nav-link" style={{color:'white', padding:'10px 20px'}} to="/mycancel" >
            Cancelled Order
            </Link>
            
          </li>}
          {token!=null && <li className="nav-item">
            <Link className="nav-link" style={{color:'white', padding:'10px 20px'}} to="/logout" onClick={()=>{
              setToken(null);
              localStorage.clear();
            }} >
            Logout
            </Link>
            
          </li>}
          </ul>
        </div>
      </div>
    </nav>
  </div>
  );
};

export default Header;


// import React,{useEffect,useRef, useState} from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import '../Header.css'
// // import logo from '../images/logo.png'
// // import { GiHamburgerMenu } from 'react-icons/gi';
// const  Header =({openMenu,token,setToken})=> {
//     const [active,setActive] = useState(1);
//     const headerRef = useRef(null);
//     useEffect(() => {

//       if(localStorage.getItem('token')!=null)
//     {
//            setToken(localStorage.getItem('token'));
//     }

//         window.addEventListener('scroll', () => {
//             headerRef.current.classList.toggle("sticky", window.scrollY > 0);
//         })
//     }, [])
//     return (
//         <nav className="header" ref={headerRef}>
//             <NavLink to="/">
//             <div className="logo">
//                 {/* <img src={logo}></img> */}
//             </div>
//             </NavLink>
//             <div className="link">
//                 <li className={active===1?"active-nav":""} onClick={()=>{setActive(1)}}><NavLink to="/home">home</NavLink></li>
//                 <li className={active===2?"active-nav":""} onClick={()=>{setActive(2)}}><NavLink to="/place">Places</NavLink></li>
//               {token==null &&  <li className={active===1?"active-nav":""} onClick={()=>{setActive(3)}}><NavLink to="/login">Login</NavLink></li>}
//               {token!=null &&  <li className={active===2?"active-nav":""} onClick={()=>{setActive(4)}}><NavLink to="/myOrder">My Order</NavLink></li>}
//               {token!=null && <li className={active===4?"active-nav":""} onClick={()=>{setActive(5)}}><NavLink to="/mycancel">Cancel Order</NavLink></li>}
//               {token!=null &&  <li className={active===4?"active-nav":""} onClick={()=>{setActive(6)}}><NavLink to="/logout">LogOut</NavLink></li>  }
//             </div>
//             {/* <div className="hamburgur" onClick={()=>{openMenu()}}><GiHamburgerMenu size="2rem" color="white"></GiHamburgerMenu></div> */}
//         </nav>
//     )
// }

// export default Header
