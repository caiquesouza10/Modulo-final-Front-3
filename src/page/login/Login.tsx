import React, {useState} from "react";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Botao } from "../../components/botao/Botao";
import Input from "../../components/Input/Inputs";
import { Imagemlado } from "../../components/imgLado/ImagemLado";
import { useNavigate } from 'react-router-dom';
import { InputName } from '../cadastro/Cadastrar';
import { buscarTodosUsuarios } from '../../store/modules/users';
import { useAppDispatch, useAppSelector } from '../../store/types.hooks';
import { createUserLogged } from '../../store/modules/users/userLogged';
import Swal from "sweetalert2";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.growdev.com.br/">
        Growdev
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default function Logar() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const usersRedux = useAppSelector(buscarTodosUsuarios);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const changeInput = (key: InputName, value: string) => {
    
    switch(key) {
      case 'email':
        setEmail(value);
      break;

      case 'password':
        setPassword(value);
      break;

      default:
    }
  }

  const handleClick = () => {
    if(!verifyInputs()) {
      return
    }

    dispatch(createUserLogged(email))
    clearInput();
    setTimeout(() => {
        navigate('/home')
    }, 1000);
  }

  const clearInput = () => {
    setEmail('');
    setPassword('');
  }

  const verifyInputs = (): boolean => {
    if(!email || !password) {
      Swal.fire({
        title: "Existem campos vazios, favor preencher",
        icon: "warning",
        confirmButtonText: "Confirmar",
        timer: 3000,
      });
      return false
    }

    // addOne = email já existir substitui, se não existir adiciona
    const userFound = usersRedux.find((user) => user.email === email && user.password === password);

    if(!userFound) {
      Swal.fire({
        title: "Usuario não encontrado! Verifique!!!",
        icon: "warning",
        confirmButtonText: "Confirmar",
        timer: 3000,
      });
      return false;
    }

    Toast.fire({
      icon: 'success',
      title: 'Logado com sucesso',
      timer: 2000,
    })
    return true
  }

  return (
    <Grid container sx={{width:'100vw', height:'100vh',}}>
      <Imagemlado />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
      >
        <Box
          sx={{
            mt: '35%',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mt: 7, fontSize:30, fontStyle:"italic", fontWeight:"900" }}>
            LOGAR NO SISTEMA
          </Typography>

          <Box component="form" sx={{ mt: 2}}>
            
            <Grid item xs={12} width='30vw'>
              <Input label="E-mail" type="email" name='email' onChange={changeInput} value={email}/>
            </Grid>

            <Grid item xs={12} width='30vw'>
              <Input label="Senha" type="password" name='password' onChange={changeInput} value={password}/>
            </Grid>

            <Botao tipoBotao="button" onClick={handleClick}>
              Logar
            </Botao>

            <Grid container>
              <Grid item>
                <Link variant="body2" onClick={() => navigate('/cadastrar')}>
                  Não tem uma conta? Inscrever-se
                </Link>
              </Grid>
            </Grid>

            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
