import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">Banco Demo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/crear">Crear Cuenta</Nav.Link>
                    <Nav.Link as={Link} to="/depositar">Depositar</Nav.Link>
                    <Nav.Link as={Link} to="/consultar-saldo">Consultar Saldo</Nav.Link>
                    <Nav.Link as={Link} to="/retirar">Retirar</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
