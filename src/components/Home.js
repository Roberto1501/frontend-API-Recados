import React from 'react';
import { recadosUsuario } from '../redux/store/features/recadosSlice';
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit'



function Home() {
    const dispatch = useDispatch();
    const userId = useSelector(state=> state.usuario.data);
    useEffect(()=> console.log(userId),[])
    useEffect(()=>{
          dispatch(recadosUsuario(userId))
          .then(unwrapResult)
          .then((response) => {
        console.log(response); 
      })
      .catch((error) => {
        console.error(error);
      });
    },[])
  
  return (
    <React.Fragment>
      <div className={`${styles.noramlFlex}`}>
          <h1>Home</h1>

      </div>
    </React.Fragment>
  );
}

export default Home;
