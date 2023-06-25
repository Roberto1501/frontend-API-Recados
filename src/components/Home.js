import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { recadosUsuario } from '../redux/store/features/recadosSlice';
import styles from "../styles/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Home() {
    const dispatch = useDispatch();
    const recados = useSelector(state => state.recados?.data);

    // Recupera o ID do usuário do localStorage
    const userId = window.localStorage.getItem('user');


    useEffect(() => {
      if (userId) {
          // Remove as aspas extras do ID do usuário
          const parsedUserId = userId.replace(/"/g, '');
          
          dispatch(recadosUsuario(parsedUserId))
              .catch((error) => {
                  console.log(error);
              });
      }
  }, [userId, dispatch]);

    if (!Array.isArray(recados)) {
        return null;
    }

    return (
        <React.Fragment>
            <div className={styles.normalFlex}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Título</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recados.map((recado, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {recado._title}
                                    </TableCell>
                                    <TableCell>{recado._description}</TableCell>
                                    <TableCell>{recado._status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </React.Fragment>
    );
}

export default Home;
