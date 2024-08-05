// src/components/Retirar.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap'; // Asegúrate de tener bootstrap instalado

const Retirar = () => {
    const [id, setId] = useState('');
    const [monto, setMonto] = useState(0);
    const [cuentaBancaria, setCuentaBancaria] = useState({
        id: 1,
        titular: 'Miguel Reyes',
        saldo: 5,
        fechaCreacion: '2024-08-05T00:00:00'
    });
    const [alert, setAlert] = useState(null);
    const [resultado, setResultado] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`http://localhost:8080/accounts/${id}/withdraw`, {
                id: Number(id),
                cuentaBancaria: cuentaBancaria,
                tipo: 'RETIRO', // Valor fijo para el tipo de operación
                monto: Number(monto),
                fecha: new Date().toISOString() // Fecha actual en formato ISO
            });

            setResultado(response.data); // Guarda el objeto devuelto por el endpoint
            setAlert({ type: 'success', message: 'Retiro realizado con éxito' });
            // Limpiar campos después de la operación
            setId('');
            setMonto(0);
        } catch (error) {
            console.error('Error al realizar el retiro:', error);
            setAlert({ type: 'danger', message: 'Error al realizar el retiro' });
        }
    };

    return (
        <Container>
            <h2 className="my-4">Retirar</h2>
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
                        value={cuentaBancaria.titular}
                        readOnly
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Saldo</Form.Label>
                    <Form.Control
                        type="number"
                        value={cuentaBancaria.saldo}
                        readOnly
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Fecha de Creación</Form.Label>
                    <Form.Control
                        type="text"
                        value={cuentaBancaria.fechaCreacion}
                        readOnly
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
                <Form.Group className="mb-3">
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control
                        type="text"
                        value="RETIRO" // Valor fijo
                        readOnly
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                        type="text"
                        value={new Date().toISOString()} // Fecha actual en formato ISO
                        readOnly
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Retirar
                </Button>
            </Form>
            {resultado && (
                <div className="mt-4">
                    <h3>Resultado del Retiro</h3>
                    <pre>{JSON.stringify(resultado, null, 2)}</pre>
                </div>
            )}
        </Container>
    );
};

export default Retirar;
