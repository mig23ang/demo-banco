package com.banco.demo.service.impl;

import com.banco.demo.dao.entities.CuentaBancariaEntity;
import com.banco.demo.dao.entities.Tipo;
import com.banco.demo.dao.entities.TransaccionEntity;
import com.banco.demo.dao.repositories.CuentaBancariaReposiroty;
import com.banco.demo.dao.repositories.TransaccionRepository;
import com.banco.demo.service.contract.ICuentaService;
import com.banco.demo.utlis.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class CuentaServiceImpl implements ICuentaService {

    private static Logger LOG = org.slf4j.LoggerFactory.getLogger(CuentaServiceImpl.class);

    @Autowired
    private CuentaBancariaReposiroty cuentaBancariaRepository;

    @Autowired
    private TransaccionRepository transaccionRepository;

    @Override
    public CuentaBancariaEntity crearCuenta(CuentaBancariaEntity cuenta) {
        LOG.info("Inicia crear cuenta CuentaServiceImpl crearCuenta ", cuenta);
        if (cuenta.getSaldo() != null && cuenta.getSaldo().compareTo(BigDecimal.ZERO) != 0) {
            throw new IllegalArgumentException("El saldo inicial debe ser 0.");
        }
        if (cuenta.getTitular() == null || cuenta.getTitular().length() < 1 || cuenta.getTitular().length() > 100) {
            throw new IllegalArgumentException("El titular debe tener entre 1 y 100 caracteres.");
        }
        LOG.info("Finaliza crear cuenta CuentaServiceImpl crearCuenta ", cuenta);
        return cuentaBancariaRepository.save(cuenta);
    }


    @Override
    @Transactional
    public CuentaBancariaEntity depositar(Long id, TransaccionEntity transaccion) {
        LOG.info("Inicia depositar cuenta CuentaServiceImpl depositar ", id, transaccion);
        if (transaccion.getTipo() != Tipo.DEPOSITO) {
            throw new IllegalArgumentException("El tipo de transacción debe ser DEPOSITO");
        }

        CuentaBancariaEntity cuenta = cuentaBancariaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cuenta bancaria no encontrada"));

        BigDecimal nuevoSaldo = cuenta.getSaldo().add(transaccion.getMonto());
        cuenta.setSaldo(nuevoSaldo);

        cuentaBancariaRepository.save(cuenta);

        transaccion.setCuentaBancaria(cuenta); // No es necesario establecer esta propiedad si no se requiere en la base de datos
        transaccion.setFecha(LocalDateTime.now());
        transaccionRepository.save(transaccion);

        LOG.info("Finaliza depositar cuenta CuentaServiceImpl depositar ", id, transaccion);
        return cuenta;
    }

    @Override
    @Transactional
    public CuentaBancariaEntity retirar(Long id, TransaccionEntity transaccion) {
        LOG.info("Inicia retirar cuenta CuentaServiceImpl retirar ", id, transaccion);
        if (transaccion.getTipo() != Tipo.RETIRO) {
            throw new IllegalArgumentException("El tipo de transacción debe ser RETIRO");
        }

        CuentaBancariaEntity cuenta = cuentaBancariaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cuenta bancaria no encontrada"));

        BigDecimal nuevoSaldo = cuenta.getSaldo().subtract(transaccion.getMonto());
        if (nuevoSaldo.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Saldo insuficiente para el retiro");
        }
        cuenta.setSaldo(nuevoSaldo);

        cuentaBancariaRepository.save(cuenta);

        transaccion.setCuentaBancaria(cuenta);
        transaccion.setFecha(LocalDateTime.now());
        transaccionRepository.save(transaccion);

        LOG.info("Finaliza retirar cuenta CuentaServiceImpl retirar ", id, transaccion);
        return cuenta;
    }


    @Override
    public BigDecimal consultarSaldo(Long id) {
        LOG.info("Inicia consultar saldo CuentaServiceImpl consultarSaldo ", id);
        CuentaBancariaEntity cuenta = cuentaBancariaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cuenta no encontrada."));
        LOG.info("Finaliza consultar saldo CuentaServiceImpl consultarSaldo ", id);
        return cuenta.getSaldo();
    }
}
