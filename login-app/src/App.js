import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignIn from "./SignIn";
import Signup from "./Signup";
import UpdateAccount from "./UpdateAccount";
import Actors from "./Actors";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return(
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<SignIn />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/update' element={<UpdateAccount />}></Route>
            <Route path='/actors' element={<Actors />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;