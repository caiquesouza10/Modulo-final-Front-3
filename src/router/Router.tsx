import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastrar from '../page/cadastro/Cadastrar';
import { HomeRecados } from '../page/home/HomeRecados';
import  Login from '../page/login/Login';



function AppRoutes(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/home" element={<HomeRecados />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
