// src/components/Depositar.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap'; // Importa los componentes de Bootstrap

const Depositar = () => {
    const [id, setId] = useState('');
    const [monto, setMonto] = useState(0);
    const [alert, setAlert] = useState(null);
    const [titular, setTitular] = useState('');
    const [saldo, setSaldo] = useState(0);
    const [fechaCreacion, setFechaCreacion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/accounts/${id}/deposit`, {
                id: Number(id),
                cuentaBancaria: {
                    id: Number(id),
                    titular: titular,
                    saldo: Number(saldo),
                    fechaCreacion: fechaCreacion
                },
                tipo: 'DEPOSITO', // Valor fijo
                monto: Number(monto),
                fecha: new Date().toISOString() // Fecha actual
            });
            setAlert({ type: 'success', message: 'Depósito realizado con éxito' });
            // Limpiar campos después de la operación
            setId('');
            setMonto(0);
            setTitular('');
            setSaldo(0);
            setFechaCreacion('');
        } catch (error) {
            console.error('Error al realizar el depósito:', error);
            setAlert({ type: 'danger', message: 'Error al realizar el depósito' });
        }
    };

    return (
        <Container>
            <h2 className="my-4">Depositar</h2>
            {alert && (
                <Alert variant={alert.type}>
                    {alert.message}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>ID de la cuenta</Form.Label>
                    <Form.Control
                        type="number"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Titular de la cuenta</Form.Label>
                    <Form.Control
                        type="text"
                        value={titular}
                        onChange={(e) => setTitular(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Saldo de la cuenta</Form.Label>
                    <Form.Control
                        type="number"
                        value={saldo}
                        onChange={(e) => setSaldo(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Fecha de creación</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={fechaCreacion}
                        onChange={(e) => setFechaCreacion(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Monto</Form.Label>
                    <Form.Control
                        type="number"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Depositar
                </Button>
            </Form>
        </Container>
    );
};

export default Depositar;
