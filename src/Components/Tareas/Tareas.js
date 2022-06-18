import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TodoList from '../todoList/todoList'

export const Tareeas = () => {
  const [tarea, setTarea] = useState([])


  useEffect(() => {
    getData()
  }, [])
  function getData() {
    let tareas = localStorage.getItem('tareas')
    console.log(tareas);
    if (tareas === 'undefined') {
      console.log('quien sos');
    }else{
      if(localStorage.getItem('tareas')){
          setTarea(JSON.parse(localStorage.getItem('tareas')))
      console.log(tarea);
      }
    }

  }

  const agregarTarea = (nombre) => {
    setTarea([...tarea, nombre])
    localStorage.setItem('tareas', JSON.stringify([...tarea, nombre]))
  }
  const deleteTarea = (nombre) => {
    const newTareas = tarea.filter((a) => a.nombre !== nombre)
    setTarea(newTareas)
    localStorage.setItem('tareas', JSON.stringify(newTareas))
  }
  const updateTarea = (nomb1, nombre) => {
    const newTarea = tarea.map((tareass) => {
      if (tareass.nombre === nomb1) {
        return {
          ...tareass,
          nombre: nombre
        }
      }
      return tareass
    })
    setTarea(newTarea);
    localStorage.setItem('tareas', JSON.stringify(newTarea))

  }

  return (
    <>
      <Grid container direction="column-reverse" justifyContent="center" alignItems="center" sx={{ marginTop: '110px' }}>
        <TodoList nombre={tarea} agregarTarea={agregarTarea} deleteTarea={deleteTarea} setTarea={setTarea} getData={getData} updateTarea={updateTarea}></TodoList>
      </Grid>

    </>
  )
}
export default Tareeas;
