import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap';

const CrearCuenta = () => {
    const [id, setId] = useState('');
    const [titular, setTitular] = useState('');
    const [saldo, setSaldo] = useState(0);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [cuentaCreada, setCuentaCreada] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/accounts', {
                id: id,
                titular: titular,
                saldo: saldo,
                fechaCreacion: new Date().toISOString()
            });
            setCuentaCreada(response.data);
            setMensaje('Cuenta creada con éxito');
            setError('');
            // Limpiar campos después de la creación exitosa
            setId('');
            setTitular('');
            setSaldo(0);
        } catch (error) {
            setError('Error al crear la cuenta');
            setMensaje('');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Crear Cuenta</h2>
            {mensaje && <Alert variant="success">{mensaje}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formId" className="mb-3">
                    <Form.Label>ID</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Ingrese el ID" 
                        value={id} 
                        onChange={(e) => setId(e.target.value)} 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formTitular" className="mb-3">
                    <Form.Label>Titular</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Ingrese el nombre del titular" 
                        value={titular} 
                        onChange={(e) => setTitular(e.target.value)} 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formSaldo" className="mb-3">
                    <Form.Label>Saldo inicial</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Ingrese el saldo inicial" 
                        value={saldo} 
                        onChange={(e) => setSaldo(e.target.value)} 
                        required 
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Crear Cuenta</Button>
            </Form>
            {cuentaCreada && (
                <div className="mt-4">
                    <h3>Detalles de la Cuenta Creada</h3>
                    <p><strong>ID:</strong> {cuentaCreada.id}</p>
                    <p><strong>Titular:</strong> {cuentaCreada.titular}</p>
                    <p><strong>Saldo:</strong> {cuentaCreada.saldo}</p>
                    <p><strong>Fecha de Creación:</strong> {new Date(cuentaCreada.fechaCreacion).toLocaleString()}</p>
                </div>
            )}
        </div>
    );
};

export default CrearCuenta;
