import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';
import Places from './Components/Places';
import BookTicket from './Components/BookTicket';
import Login from './Components/Login';
import BookingReview from './Components/BookingReview';
import { useState } from 'react';
import SuccessFull from './Components/BookSuccess';
import BookSuccess from './Components/BookSuccess';
import MyOrder from './Components/MyOrder';
import MyCancel from './Components/MyCancel';
import Footer from './Components/Footer';
function App() {

  const[token,setToken]=useState();

  const setTokens=(t)=>{
      setToken(t);
  }

  

  return (
    <div className="App">
    <Router>
    <Header token={token} setToken={setTokens}></Header>
    <Routes>
    <Route path='/' element={<Home token={token} setToken={setTokens}></Home>}></Route>
         <Route path='/home' element={<Home token={token} setToken={setTokens}></Home>}></Route>
         <Route path='/places' element={<Places></Places>}></Route>
          <Route path='/bookticket' element={<BookTicket setToken={setTokens} ></BookTicket>}></Route>
          <Route path='/login' element={<Login setToken={setTokens}></Login>}></Route>
          <Route path='/bookingreview' element={<BookingReview></BookingReview>}></Route>
          <Route path='/place/booksuccess' element={<BookSuccess></BookSuccess>}></Route>
          <Route path='/myorder' element={<MyOrder></MyOrder>}></Route>
          <Route path='/mycancel' element={<MyCancel></MyCancel>}></Route>
          <Route path='/logout' element={<Home></Home>}></Route>
         {/*<Route path='/touristattractions' element={}></Route>
         <Route path='/howtoreach' element={}></Route> */}

    </Routes>

    </Router>
    <div>
      <Footer></Footer>
    </div>
    </div>
  );
}

export default App;
