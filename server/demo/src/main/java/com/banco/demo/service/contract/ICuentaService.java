package com.banco.demo.service.contract;

import com.banco.demo.dao.entities.CuentaBancariaEntity;
import com.banco.demo.dao.entities.TransaccionEntity;

import java.math.BigDecimal;

public interface ICuentaService {

    /**
     * Crea una nueva cuenta bancaria con saldo inicial de 0.
     *
     * @param cuenta La cuenta bancaria a crear.
     * @return La cuenta bancaria creada.
     */
    CuentaBancariaEntity crearCuenta(CuentaBancariaEntity cuenta);

    /**
     * Realiza una consignación (depósito) en una cuenta bancaria.
     *
     * @param id El ID de la cuenta bancaria.
     * @param transaccion La transacción que contiene el monto a consignar.
     * @return La cuenta bancaria actualizada con el nuevo saldo.
     */
    CuentaBancariaEntity depositar(Long id, TransaccionEntity transaccion);


    /**
     * Realiza un retiro en una cuenta bancaria.
     *
     * @param id    El ID de la cuenta bancaria.
     * @param transaccion El monto a retirar.
     * @return La cuenta bancaria actualizada con el nuevo saldo.
     */
    CuentaBancariaEntity retirar(Long id, TransaccionEntity transaccion);

    /**
     * Consulta el saldo de una cuenta bancaria.
     *
     * @param id El ID de la cuenta bancaria.
     * @return El saldo actual de la cuenta bancaria.
     */
    BigDecimal consultarSaldo(Long id);
}
