import React, { useState } from 'react';
import axios from 'axios';

const ConsultarSaldo = () => {
    const [id, setId] = useState('');
    const [saldo, setSaldo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/accounts/${id}/balance`);
            setSaldo(response.data);
        } catch (error) {
            console.error('Error al consultar el saldo:', error);
        }
    };

    return (
        <div>
            <h2>Consultar Saldo</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID de la cuenta:</label>
                    <input type="number" value={id} onChange={(e) => setId(e.target.value)} required />
                </div>
                <button type="submit">Consultar Saldo</button>
            </form>
            {saldo !== null && <div>Saldo: {saldo}</div>}
        </div>
    );
};

export default ConsultarSaldo;
