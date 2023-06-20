import React from 'react';
import "./App.css";
import {BrowserRouter, Routes,Route} from "react-router-dom"
import {Login} from "./Routes.js"
import { SignUp } from './Routes.js';


const App = ()=> {
  return (
   <BrowserRouter>
        <Routes>

          <Route path= "/login" element = {<Login />}/>
          <Route path= "/sign-up" element = {<SignUp />}/>


        </Routes>
   </BrowserRouter>
  );
}

export default App ;
