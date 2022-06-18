import * as React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { TextField, Button, Grid } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


export default function CheckboxList({nombre, agregarTarea, deleteTarea, updateTarea }) {
  const [checked, setChecked] = React.useState([0]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nombreUpdate, setNombreUpdate] = useState('')
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let nombre = {
      nombre: data.get('nombre')
    }
    agregarTarea(nombre)
    console.log(nombre);

  };
  const hanleDelete = (value) => () => {
    deleteTarea(value)
    console.log(value);
  }
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleUpdate = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const nombre = data.get('nombre')
    updateTarea(nombreUpdate,nombre)
  }
  const valor = (nom) => () =>{
    setNombreUpdate(nom)
    handleOpen()

  } 

  return (
    <>
      <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
        <Grid container component="form" onSubmit={handleSubmit} spacing={2} justifyContent="center" alignItems="center" >
          <Grid item xs={8}>
            <TextField id="outlined-basic" name="nombre" label="Agregar una nueva tarea" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <Button endIcon={<CheckCircleOutlineIcon />} sx={{ height: '54.7px' }} type="submit"
              fullWidth variant="contained" >Enviar</Button>
          </Grid>
        </Grid>
        {nombre.map((value, index) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={index}
              secondaryAction={
                <>
                  <Button onClick={hanleDelete(value.nombre)} endIcon={<DeleteOutlineIcon />} variant="outlined">Eliminar</Button>
                  <Button sx={{ marginLeft: '10px' }} endIcon={<DeleteOutlineIcon />} variant="outlined" onClick={valor(value.nombre)} >Editar</Button>
                </>

              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value.nombre}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={handleUpdate} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ingrese el nombre de la tarea
          </Typography>
          <TextField id="standard-basic" name="nombre" variant="standard" fullWidth sx={{marginTop: '10px'}}/>

          <Button endIcon={<CheckCircleOutlineIcon />} sx={{ height: '50px', width: '150px', float:'right', marginTop: '10px' }}  type="submit"
             variant="contained" >Enviar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
