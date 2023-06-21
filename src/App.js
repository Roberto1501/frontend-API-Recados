import React from 'react';
import "./App.css";
import {BrowserRouter, Routes,Route} from "react-router-dom"
import {Login} from "./Routes.js"
import { SignUp } from './Routes.js';
import HomePage from './pages/Home';


const App = ()=> {
  return (
   <BrowserRouter>
        <Routes>
          
          <Route path= "/" element = {<Login />}/>
          <Route path= "/sign-up" element = {<SignUp />}/>
          <Route path = "/home" element ={<HomePage />} />


        </Routes>
   </BrowserRouter>
  );
}

export default App ;
