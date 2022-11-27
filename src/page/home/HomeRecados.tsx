import { Box, Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState, useEffect } from "react";
import { InputHome } from "../../components/inputHome/InputHome";
import TopBar from "../../components/top-bar/TopBar";
import TableBody from '@mui/material/TableBody';
import { useAppDispatch, useAppSelector } from '../../store/types.hooks';
import { adicionarTodosRecados, atualizarRecado, buscarTodosRecados, deletarRecado } from '../../store/modules/recados';
import { buscarUsuarioPorEmail } from '../../store/modules/users';
import Modals from "../../components/modal/Modal";
import { setShowModal } from "../../store/modules/config/ConfigSlice";
import { useNavigate } from 'react-router-dom';



export const HomeRecados: React.FC = () => {
  const navigate = useNavigate()
  const userLogged = useAppSelector((state) => state.userLogged);
  const userRedux = useAppSelector((state) => buscarUsuarioPorEmail(state, userLogged));
  const recadosRedux = useAppSelector(buscarTodosRecados);


  const dispatch = useAppDispatch();

  useEffect(() => {
    if(userRedux?.recados){
      dispatch(adicionarTodosRecados(userRedux.recados))   
    }
  }, [userRedux?.recados, dispatch])

  
  useEffect(() => {
    if(!userLogged){
      navigate('/')
    }
  }, [userLogged])


  const handleUpdate = (id: string) => {
    dispatch(setShowModal({open: true, type:'Editar', id: id}))
  }

  const handleDelete = (id: string) => {
    dispatch(setShowModal({open: true, type:'Apagar', id: id}))
  }
  return (
    <>
      <TopBar />
      <Box 
      component={Paper}  
      elevation={5} 
      sx={{ 
        display: "flex", 
        flexDirection:'column',  
        width: '97vw', height:'80vh' , 
        marginLeft:'1.5%', 
        marginTop:'2%'
      }}
      >

      <InputHome />


      <TableContainer sx={{marginTop:'2%', width:'95vw', marginLeft:'1.1%'}} component={Paper} elevation={5}>
          <Table>
                <TableHead >
                  <TableRow sx={{bgcolor:'#a9a9a9'}}>
                    <TableCell sx={{color:'white', fontSize:25, fontWeight:900}}> # ID</TableCell>
                    <TableCell align="center" sx={{color:'white', fontSize:25, fontWeight:900}}>Descrição</TableCell>
                    <TableCell align="center" sx={{color:'white', fontSize:25, fontWeight:900}}>Detalhamento</TableCell>
                    <TableCell align="center" sx={{color:'white', fontSize:25, fontWeight:900}}>Ações</TableCell>
                  </TableRow>
                </TableHead>  

                <TableBody>
                  { recadosRedux.map((recado, index) => (

                    <TableRow key={recado.id}>
                      <TableCell>
                        {index+1}
                      </TableCell>
                      <TableCell align="center">{recado.description}</TableCell>
                      <TableCell align="center">{recado.detail}</TableCell>
                      <TableCell align="center">
              
                          <Button 
                          onClick={() => handleUpdate(recado.id)}
                          variant='contained'
                          color="primary"                     
                          >Editar</Button>
                 
                          <Button 
                          onClick={() => handleDelete(recado.id)}
                          variant='contained'
                          color="error"  
                          sx={{ml:2}}                       
                          >Apagar</Button>
       
                      </TableCell>
                    </TableRow>

                  ))}
                </TableBody>
          </Table>
      </TableContainer>
      </Box>

      <Modals />

    </>
  );
};
function uuidv4(): string {
  throw new Error("Function not implemented.");
}

