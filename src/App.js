import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';
import Places from './Components/Places';
function App() {
  return (
    <div className="App">
    <Router>
    <Header></Header>
    <Routes>
      
         <Route path='/home' element={<Home></Home>}></Route>
         <Route path='/places' element={<Places></Places>}></Route>
         {/* <Route path='/booktickes' element={}></Route>
         <Route path='/touristattractions' element={}></Route>
         <Route path='/howtoreach' element={}></Route> */}

    </Routes>
    </Router>
    </div>
  );
}

export default App;
