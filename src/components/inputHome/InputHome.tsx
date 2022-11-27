import React, {useState} from 'react';
import {
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { useAppDispatch } from '../../store/types.hooks';
import { v4 as uuidv4 } from 'uuid';
import { adicionarRecado } from '../../store/modules/recados';
import Swal from "sweetalert2";

export const InputHome: React.FC = () => {
  const [detail, setDetail] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();

  const handleSave = () => {
    if(!detail || !description ) {
      Swal.fire({
        title: "Existem campos vazios, favor preencher",
        icon: "warning",
        confirmButtonText: "Confirmar",
        timer: 3000,
      });
      return false
    }

    Swal.fire({
      title: "Sucesso!",
      text: "Recado cadastrado com sucesso.",
      icon: "success",
      confirmButtonText: "Confirmar",
      timer: 2000,
    });

    dispatch(adicionarRecado({
      id: uuidv4(),
      description,
      detail
    }))

    clearInput()
  }

  const clearInput = () => {
    setDetail('');
    setDescription('');
  }


  return (
    <>
      <Grid container spacing={10}>
        <Grid item xs={5}>
          <TextField
            value={detail}
            required
            label="Detalhamento"
            variant="standard"
            sx={{ mt: 5, ml:5 }}
            fullWidth
            onChange={(ev) => setDetail(ev.target.value)}
          />
        </Grid>

        <Grid item xs={5}>
          <TextField
            value={description}
            required
            label="Descrição"
            variant="standard"
            sx={{ mt: 5, ml: 5 }}
            fullWidth
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </Grid>

        <Grid item xs={2} sx={{ mt: 7 }}>
          <Button variant="contained" onClick={handleSave}>Adicnionar</Button>
        </Grid>
      </Grid>
    </>
  );
};
