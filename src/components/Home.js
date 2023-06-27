import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { recadosUsuario } from '../redux/store/features/recadosSlice';
import { createRecado } from '../redux/store/features/createRecado';
import styles from "../styles/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { unwrapResult } from '@reduxjs/toolkit'


function Home() {
    const dispatch = useDispatch();
    const recados = useSelector(state => state.recados?.data);

    // Recupera o ID do usuário do localStorage
    let userId = window.localStorage.getItem('user');

    const [open, setOpen] = useState(false);
    const [title,setTitle]= useState("");
    const [description, setDescription] = useState("");
    const handleClose = () => setOpen(false); 
    const handleOpen = () => setOpen(true);
    const [erro, setErro]= useState("");
    const [refresh, setRefresh] = useState(false)




    const handleRecadoCreation = (event)=>{

    event.preventDefault()
     userId = userId.replace(/"/g, '');

  dispatch(createRecado({userId,title, description}))
  .then(unwrapResult)
      .then((response) => {
        console.log(response); 
        setRefresh(!refresh)
        setOpen(false)

      })
      .catch((error) => {
        console.error(error);
        setErro(error)
      });
    }

    useEffect(() => {
        if (userId) {
            // Remove as aspas extras do ID do usuário
            const parsedUserId = userId.replace(/"/g, '');
            dispatch(recadosUsuario(parsedUserId))
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [userId, dispatch,refresh]);

    if (!Array.isArray(recados)) {
        return null;
    }

    return (
        <React.Fragment>
            <div className={styles.normalFlex}>
                <div style={{display:"flex", margin: "2rem"}}>
                    <div>
                        Adicionar recado
                    </div>
                    <Button onClick={handleOpen}>
                        +
                    </Button>
                </div>

                    
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{display:"flex", position:"absolute", top:"50%", left: "50%", transform:"translate(-50%, -50%)"}}
                >
                    <Box sx={{ backgroundColor: "white", width: "100%" }}>
                        
                        <div style={{display:"flex", justifyContent: "flex-end"}}>
                                <Button onClick={handleClose}>
                                    X
                                </Button>
                        </div>
                       
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Adicione o recado
                        </Typography>
                        <TextField
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}
                         id="outlined-basic" label="title" variant="outlined" fullWidth style={{ marginTop: 16 }} />
                        <TextField 
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}

                        id="outlined-basic" label="description" variant="outlined" fullWidth style={{ marginTop: 16 }} />
                        <Button onClick={handleRecadoCreation} variant="contained" color="primary" fullWidth style={{ marginTop: 16 }}>
                            enviar
                            </Button>
                            {erro}
                    </Box>
                </Modal>
        
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
