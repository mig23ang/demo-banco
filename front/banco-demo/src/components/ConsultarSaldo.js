import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap'; // Asegúrate de tener bootstrap instalado

const ConsultarSaldo = () => {
    const [id, setId] = useState('');
    const [saldo, setSaldo] = useState(null);
    const [alert, setAlert] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/accounts/${id}/balance`);
            setSaldo(response.data);
            setAlert({ type: 'success', message: 'Saldo consultado con éxito' });
        } catch (error) {
            console.error('Error al consultar el saldo:', error);
            setAlert({ type: 'danger', message: 'Error al consultar el saldo' });
        }
    };

    return (
        <Container className="my-4">
            <h2 className="mb-4">Consultar Saldo</h2>
            {alert && (
                <Alert variant={alert.type}>
                    {alert.message}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>ID de la cuenta:</Form.Label>
                    <Form.Control
                        type="number"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                        placeholder="Ingrese el ID de la cuenta"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Consultar Saldo
                </Button>
            </Form>
            {saldo !== null && (
                <div className="mt-4">
                    <h4>Saldo:</h4>
                    <div className="border p-3 rounded">
                        <strong>${saldo}</strong>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default ConsultarSaldo;
