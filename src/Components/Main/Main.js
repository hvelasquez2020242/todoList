import React from 'react'
import Login from '../Login/Login'
import Registro from '../Registro/Registro';
import Navigation from '../Navigation/Navigation';
import Tareeas from '../Tareas/Tareas'

import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

export const Main = () => {

    return (
        <>
         <Navigation/>

            <Routes>
                <Route path="/login" element={<Login /> } />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/lista"  element={<Tareeas />}></Route>
            </Routes>

        </>

    )
}