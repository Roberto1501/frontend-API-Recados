import React, { useEffect, useState } from 'react';
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
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { UpdateRecado } from '../redux/store/features/editRecado';

function Home() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const[statusRecado,setStatusRecado] = useState("")
    const [newDescription, setNewDescription] = useState("");
    const [openEdit, setOpenEdit] = useState(false);
    const [erro, setErro] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [recadoToEdit, setRecadoToEdit] = useState(null);  // Novo estado

    const handleClose = () => setOpen(false); 
    const handleOpen = () => setOpen(true);

    const dispatch = useDispatch();
    const recados = useSelector(state => state.recados?.data);
    let userId = window.localStorage.getItem('user');

    const handleRecadoCreation = (event) => {
        event.preventDefault();
        userId = userId.replace(/"/g, '');

        dispatch(createRecado({userId, title, description,statusRecado}))
            .then(unwrapResult)
            .then((response) => {
                console.log(response);
                setRefresh(!refresh)
                setOpen(false);
                setTitle("");
                setDescription("")
            })
            .catch((error) => {
                console.error(error);
                setErro(error);
            });
    }

    function EditRecado() {
        if (!recadoToEdit) return; // se não há recado para editar, retorne

        userId = userId.replace(/"/g, '');
        const id = recadoToEdit._id;
        const title = newTitle;
        const description = newDescription;

        dispatch(UpdateRecado({ userId, id, title, description,statusRecado }))
            .then(unwrapResult)
            .then((response) => {
                console.log(response);
                setRefresh(!refresh)
                setOpenEdit(false);  // fecha o modal de edição
                setRecadoToEdit(null);  // limpa o recado selecionado
               
            })
            .catch((error) => {
                console.error(error);
                setErro(error);
            });
    }

    function OpenEditModal (recado) {
        setNewTitle(recado._title);
        setNewDescription(recado._description);
        setRecadoToEdit(recado);
        setOpenEdit(true);
    }

    useEffect(() => {
        if (userId) {
            const parsedUserId = userId.replace(/"/g, '');
            dispatch(recadosUsuario(parsedUserId))
            .then(unwrapResult)
            .then((response) => {
                console.log(recados)
            })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [userId, dispatch, refresh]);

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

                <Modal
    open={openEdit}
    onClose={() => setOpenEdit(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    style={{display:"flex", position:"absolute", top:"50%", left: "50%", transform:"translate(-50%, -50%)"}}
>
    <Box sx={{ backgroundColor: "white", width: "100%" }}>
        <div style={{display:"flex", justifyContent: "flex-end"}}>
            <Button onClick={() => setOpenEdit(false)}>
                X
            </Button>
        </div>

        <Typography id="modal-modal-title" variant="h6" component="h2">
            Edite o recado
        </Typography>

        <TextField
            value={newTitle}
            onChange={(e)=> setNewTitle(e.target.value)}
            id="outlined-basic" label="title" variant="outlined" fullWidth style={{ marginTop: 16 }}
        />

        <TextField 
            value={newDescription}
            onChange={(e)=> setNewDescription(e.target.value)}
            id="outlined-basic" label="description" variant="outlined" fullWidth style={{ marginTop: 16 }}
        />

        <TextField 
            value={statusRecado}
            onChange={(e)=> setStatusRecado(e.target.value)}
            id="outlined-basic" label="status" variant="outlined" fullWidth style={{ marginTop: 16 }}
        />

        <Button onClick={EditRecado} variant="contained" color="primary" fullWidth style={{ marginTop: 16 }}>
            Atualizar
        </Button>
        {erro && <div>{erro}</div>}
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
                        {recados.filter(recado => recado._statusRecado === 'visivel').map((recado, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {recado._title}
                                    </TableCell>
                                    <TableCell>{recado._description}</TableCell>
                                    <TableCell>{recado._statusRecado}</TableCell>
                                    <TableCell>
                                        
                                        <Button onClick={() => OpenEditModal(recado)}>
                                            <ModeEditIcon />
                                        </Button>
                                    </TableCell>
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
