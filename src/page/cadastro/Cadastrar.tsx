import React, { useState } from "react";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Botao } from "../../components/botao/Botao";
import Input from "../../components/Input/Inputs";
import { Imagemlado } from "../../components/imgLado/ImagemLado";
import { useNavigate } from 'react-router-dom';
import { adicionar, buscarTodosUsuarios } from '../../store/modules/users';
import { useAppDispatch, useAppSelector } from '../../store/types.hooks';
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
      <Link color="inherit" href="https://www.growdev.com.br/" target='_blank'>
        Growdev
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export type InputName = 'name' | 'email' | 'password' | 'repassword';

export default function Cadastrar() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const usersRedux = useAppSelector(buscarTodosUsuarios);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const changeInput = (key: InputName, value: string) => {
    
    switch(key) {
      case 'name':
        setName(value);
      break;

      case 'email':
        setEmail(value);
      break;

      case 'password':
        setPassword(value);
      break;

      case 'repassword':
        setRepassword(value);
      break;

      default:
    }
  }

  const handleSave = () => {
    if(!verifyInputs()) {
      return
    }

    // addOne = email já existir substitui, se não existir adiciona
    const userFound = usersRedux.find((user) => user.email === email);

    if(userFound) {
      Swal.fire({
        title: "Já existe esse usuário!!",
        icon: "warning",
        confirmButtonText: "Confirmar",
        timer: 2000,
      });
      return;
    }

    dispatch(adicionar({
      name,
      email,
      password,
      recados: []
    }))

    clearInput();
    Swal.fire({
      title: "Sucesso!",
      text: "Usuario cadastro com sucesso",
      icon: "success",
      confirmButtonText: "Confirmar",
      timer: 2000,
    });
    setTimeout(() => {
      navigate('/home')
  }, 3000);
  }

  const clearInput = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRepassword('');
  }

  const verifyInputs = (): boolean => {
    if(!name || !email || !password || !repassword) {
      Swal.fire({
        title: "Existem campos vazios, favor preencher",
        icon: "warning",
        confirmButtonText: "Confirmar",
        timer: 3000,
      });
      return false
    }

    
    if(!email || !email.match(regexEmail)){
      Swal.fire({
        title: "E-mail preenchido incorretamente!!",
        icon: "warning",
        confirmButtonText: "Confirmar",
        timer: 3000,
      });
      return false
    }



    if(password !== repassword) {
      Swal.fire({
        title: "Por favor preencha as senhas corretamente!!",
        icon: "warning",
        confirmButtonText: "Confirmar",
        timer: 3000,
      });
      return false
    }

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
          <Typography component="h1" variant="h5" sx={{ mt: 1, fontSize:30, fontStyle:"italic", fontWeight:"900" }} >
            CADASTRAR NO SISTEMA
          </Typography>

          <Box component="form" sx={{ mt: 1 }}>

            <Grid item xs={12} width="30vw">
              <Input label="Nome" name='name' value={name} onChange={changeInput} type='text'/>
            </Grid>

            <Grid item xs={12} width="30vw">
              <Input label="E-mail" type="email" name='email' value={email} onChange={changeInput} />
            </Grid>

            <Grid item xs={12} width="30vw">
              <Input label="Senha" type="password" name='password' value={password} onChange={changeInput} />
            </Grid>

            <Grid item xs={12} width="30vw">
              <Input label="Repete Senha" type="password" name='repassword' value={repassword} onChange={changeInput}/>
            </Grid>

            <Botao tipoBotao="button" onClick={handleSave}>
              Cadastrar
            </Botao>

            <Grid container>
              <Grid item>
                <Link variant="body2" onClick={() => navigate('/')}>
                  Ja tem uma conta ? Voltar para pagina de Login
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
