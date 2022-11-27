import { Box, Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { configSliceSelectAll, setShowModal } from "./../../store/modules/config/ConfigSlice";
import { useEffect, useState } from "react";
import { atualizarRecado, buscarTodosRecados, deletarRecado } from "../../store/modules/recados";
import Swal from "sweetalert2";

const Modals: React.FC = () => {
  const dispatch = useDispatch();
  const { showModal } = useSelector(configSliceSelectAll);
  const recadosRedux = useSelector(buscarTodosRecados);
  const [open, setOpen] = useState(true);
  const [detail, setDetail] = useState('');
  const [description, setDescription] = useState('');
  
  ///dsfsfsfsdfsdf

  useEffect(() => {
    if (showModal.open) setOpen(showModal.open);
  }, [showModal.open]);

  useEffect(() => {
    if (showModal.type === 'Editar') {
      const buscaRecado = recadosRedux.find((recado) => recado.id === showModal.id)!

      setDetail(buscaRecado.detail)
      setDescription(buscaRecado.description)

    };
  }, [showModal.type]);

  function handleClose(): void {
    setOpen(false);
    dispatch(setShowModal({open: false, type: null}))
  }

  function handleEdit():void {
    dispatch(atualizarRecado({ id: showModal.id,  changes: {description, detail}}))
    handleClose()
  }

  function handleApagar(): void {
    dispatch(deletarRecado(showModal.id))
    handleClose()
  }

  return (
    <>
      { showModal.type === 'Editar' && (<Modal
        open={open}
        onClose={handleClose}
        sx={{ display: "flex", justifyContent: "center", mt: "10%" }}
      >
        <Paper elevation={5} sx={{display: "flex", flexDirection:'column', width: "900px", height: "400px" }}>
          <Box>
            <TextField
              required
              label="Detalhamento"
              variant="filled"
              sx={{ mt: '10%', ml: '5%', width:'28vw'}}
              fullWidth
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              onClick={() => setDetail('')}
            />
          </Box>
          <Box>
            <TextField
              required
              label="Descrição"
              variant="filled"
              sx={{ mt: '5%', ml: '5%', width:'28vw'}}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onClick={() => setDescription('')}
            />
          </Box>
          
          <Box sx={{display:'flex', mt: '10%', ml: '70%'}}>
            <Button onClick={handleClose} variant="contained" sx={{mr:3}}>Cancelar</Button>
            <Button onClick={handleEdit} variant="contained" color="success">Salvar</Button>
          </Box>
        </Paper>
      </Modal>) }

    { showModal.type === 'Apagar' && (<Modal
        open={open}
        onClose={handleClose}
        sx={{ display: "flex", justifyContent: "center", mt: "10%" }}
      >
        <Paper elevation={5} sx={{display: "flex", flexDirection:'column', width: "800px", height: "400px" }}>
          <Box>
           <Typography variant="h3" sx={{ mt: 15, fontSize:50, fontStyle:"italic", fontWeight:"900", textAlign:'center' }}>
              Realmente deseja excluir este recado ?
           </Typography>
          </Box>
          
          <Box sx={{display:'flex', mt: '15%', ml: '70%'}}>
            <Button onClick={handleClose} variant="contained" sx={{mr:3}}>Cancelar</Button>
            <Button onClick={handleApagar} variant="contained" color="error">Apagar</Button>
          </Box>
        </Paper>

      </Modal>) }
    </>
  );
};

export default Modals;
