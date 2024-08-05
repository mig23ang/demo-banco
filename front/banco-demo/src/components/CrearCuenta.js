import React, { useState } from 'react';
import axios from 'axios';

const CrearCuenta = () => {
    const [titular, setTitular] = useState('');
    const [saldo, setSaldo] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/accounts', {
                titular,
                saldo,
                fechaCreacion: new Date().toISOString()
            });
            alert('Cuenta creada con éxito');
        } catch (error) {
            console.error('Error al crear la cuenta:', error);
        }
    };

    return (
        <div>
            <h2>Crear Cuenta</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titular:</label>
                    <input type="text" value={titular} onChange={(e) => setTitular(e.target.value)} required />
                </div>
                <div>
                    <label>Saldo inicial:</label>
                    <input type="number" value={saldo} onChange={(e) => setSaldo(e.target.value)} required />
                </div>
                <button type="submit">Crear Cuenta</button>
            </form>
        </div>
    );
};

export default CrearCuenta;
