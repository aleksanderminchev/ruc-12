import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignIn from "./SignIn";
import Signup from "./Signup";
import UpdateAccount from "./UpdateAccount";
import Actors from "./Actors";
import ViewMovie from "./ViewMovie";
import Home from "./Home";
import HomeLoggedin from "./HomeLoggedin";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return(
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<SignIn />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/update' element={<UpdateAccount />}></Route>
            <Route path='/actors' element={<Actors />}></Route>
            <Route path='/viewmovie' element={<ViewMovie />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/homeloggedin' element={<HomeLoggedin />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;