import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap'; // Asegúrate de tener bootstrap instalado

const Depositar = () => {
    const [id, setId] = useState('');
    const [monto, setMonto] = useState(0);
    const [alert, setAlert] = useState(null);
    const [resultado, setResultado] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`http://localhost:8080/accounts/${id}/deposit`, {
                tipo: 'DEPOSITO', // Asegúrate de que el tipo sea DEPOSITO
                monto: Number(monto),
                // La fecha será asignada automáticamente en el backend
            });

            setResultado(response.data); // Guarda el objeto devuelto por el endpoint
            setAlert({ type: 'success', message: 'Depósito realizado con éxito' });
            // Limpiar campos después de la operación
            setId('');
            setMonto(0);
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
            {resultado && (
                <div className="mt-4">
                    <h3>Resultado del Depósito</h3>
                    <pre>{JSON.stringify(resultado, null, 2)}</pre>
                </div>
            )}
        </Container>
    );
};

export default Depositar;
