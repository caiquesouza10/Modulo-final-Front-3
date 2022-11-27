import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../store/types.hooks';
import { buscarTodosRecados, deletarTodos } from '../../store/modules/recados';
import { atualizar } from '../../store/modules/users';
import { clearUserLogged } from '../../store/modules/users/userLogged';
import { useNavigate } from 'react-router-dom';

// import { selectorUsuario } from '../../store/modules/usuario/UsuarioSlice';

const TopBar: React.FC = () => {
  const userLogged = useAppSelector((state) => state.userLogged);
  const recadosRedux = useAppSelector(buscarTodosRecados);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const updatedUser = () => {

    dispatch(atualizar({ id: userLogged, changes: { recados: recadosRedux }}))


    dispatch(clearUserLogged());
    dispatch(deletarTodos());
    navigate('/');
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:'center', fontSize:30, fontStyle:"italic", fontWeight:"900"  }}>
            Bem vindo a pagina de recados
          </Typography>
          <Button color="inherit" sx={{fontWeight:"900"}} onClick={updatedUser}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopBar;
