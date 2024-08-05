// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CrearCuenta from './components/CrearCuenta';
import Depositar from './components/Depositar';
import ConsultarSaldo from './components/ConsultarSaldo';
import Retirar from './components/Retirar';
import NavigationBar from './components/NavigationBar'; // Asegúrate de tener este componente

const AppRouter = () => {
  return (
    <Router>
      <NavigationBar /> {/* Incluye el Navbar en el Router */}
      <Routes>
        <Route path="/" element={<CrearCuenta />} /> {/* Ruta por defecto */}
        <Route path="/crear" element={<CrearCuenta />} />
        <Route path="/depositar" element={<Depositar />} />
        <Route path="/consultar-saldo" element={<ConsultarSaldo />} />
        <Route path="/retirar" element={<Retirar />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
