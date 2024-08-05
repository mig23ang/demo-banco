package com.banco.demo.service.impl;

import com.banco.demo.dao.entities.CuentaBancariaEntity;
import com.banco.demo.dao.repositories.CuentaBancariaReposiroty;
import com.banco.demo.service.contract.ICuentaService;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class CuentaServiceImpl implements ICuentaService {

    @Autowired
    private CuentaBancariaReposiroty cuentaBancariaRepository;

    @Override
    public CuentaBancariaEntity crearCuenta(CuentaBancariaEntity cuenta) {
        if (cuenta.getSaldo() != null && cuenta.getSaldo().compareTo(BigDecimal.ZERO) != 0) {
            throw new IllegalArgumentException("El saldo inicial debe ser 0.");
        }
        if (cuenta.getTitular() == null || cuenta.getTitular().length() < 1 || cuenta.getTitular().length() > 100) {
            throw new IllegalArgumentException("El titular debe tener entre 1 y 100 caracteres.");
        }
        cuenta.setFechaCreacion(LocalDateTime.now());
        return cuentaBancariaRepository.save(cuenta);
    }

    @Override
    public CuentaBancariaEntity depositar(Long id, @NotNull BigDecimal monto) {
        if (monto.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("El monto de la consignación debe ser positivo.");
        }

        CuentaBancariaEntity cuenta = cuentaBancariaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cuenta no encontrada."));

        cuenta.setSaldo(cuenta.getSaldo().add(monto));
        return cuentaBancariaRepository.save(cuenta);
    }

    @Override
    public CuentaBancariaEntity retirar(Long id, @NotNull BigDecimal monto) {
        if (monto.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("El monto del retiro debe ser positivo.");
        }

        CuentaBancariaEntity cuenta = cuentaBancariaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cuenta no encontrada."));

        if (cuenta.getSaldo().compareTo(monto) < 0) {
            throw new IllegalArgumentException("Saldo insuficiente para el retiro.");
        }

        cuenta.setSaldo(cuenta.getSaldo().subtract(monto));
        return cuentaBancariaRepository.save(cuenta);
    }

    @Override
    public BigDecimal consultarSaldo(Long id) {
        CuentaBancariaEntity cuenta = cuentaBancariaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cuenta no encontrada."));
        return cuenta.getSaldo();
    }
}
