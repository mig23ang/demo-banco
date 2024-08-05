import React, { useState } from 'react';
import axios from 'axios';

const Depositar = () => {
    const [id, setId] = useState('');
    const [monto, setMonto] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/accounts/${id}/deposit`, {
                id: Number(id),
                cuentaBancaria: { id: Number(id) },
                tipo: 'DEPOSITO',
                monto: Number(monto),
                fecha: new Date().toISOString()
            });
            alert('Depósito realizado con éxito');
        } catch (error) {
            console.error('Error al realizar el depósito:', error);
        }
    };

    return (
        <div>
            <h2>Depositar</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID de la cuenta:</label>
                    <input type="number" value={id} onChange={(e) => setId(e.target.value)} required />
                </div>
                <div>
                    <label>Monto:</label>
                    <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} required />
                </div>
                <button type="submit">Depositar</button>
            </form>
        </div>
    );
};

export default Depositar;
