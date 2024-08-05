package com.banco.demo.controller;

import com.banco.demo.dao.entities.CuentaBancariaEntity;
import com.banco.demo.dao.entities.Tipo;
import com.banco.demo.dao.entities.TransaccionEntity;
import com.banco.demo.service.contract.ICuentaService;
import com.banco.demo.service.impl.CuentaServiceImpl;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.math.BigDecimal;

@RestController
@RequestMapping("/accounts")
@CrossOrigin(origins = "http://localhost:3000")
public class CuentaController {

    private static Logger LOG = org.slf4j.LoggerFactory.getLogger(CuentaServiceImpl.class);
    @Autowired
    private ICuentaService cuentaService;

    @PostMapping
    public ResponseEntity<CuentaBancariaEntity> crearCuenta(@Valid @RequestBody CuentaBancariaEntity cuenta) {
        LOG.info("Inicia crear cuenta CuentaController crearCuenta ", cuenta);
        try {
            CuentaBancariaEntity cuentaCreada = cuentaService.crearCuenta(cuenta);
            LOG.info("Finaliza crear cuenta CuentaController crearCuenta ", cuenta);
            return new ResponseEntity<>(cuentaCreada, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            LOG.error("Error al crear cuenta CuentaController crearCuenta ", e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{id}/deposit")
    public ResponseEntity<CuentaBancariaEntity> depositar(@PathVariable Long id, @RequestBody TransaccionEntity transaccion) {
        LOG.info("Inicia depositar cuenta CuentaController depositar ", id, transaccion);
        try {
            if (transaccion.getTipo() != Tipo.DEPOSITO) {
                throw new IllegalArgumentException("El tipo de transacción debe ser DEPOSITO");
            }
            CuentaBancariaEntity cuentaActualizada = cuentaService.depositar(id, transaccion);
            LOG.info("Finaliza depositar cuenta CuentaController depositar ", id, transaccion);
            return new ResponseEntity<>(cuentaActualizada, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            LOG.error("Error al depositar cuenta CuentaController depositar ", e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/{id}/withdraw")
    public ResponseEntity<CuentaBancariaEntity> retirar(@PathVariable Long id, @RequestBody TransaccionEntity transaccion) {
        LOG.info("Inicia retirar cuenta CuentaController retirar ", id, transaccion);
        try {
            if (transaccion.getTipo() != Tipo.RETIRO) {
                throw new IllegalArgumentException("El tipo de transacción debe ser RETIRO");
            }
            CuentaBancariaEntity cuentaActualizada = cuentaService.retirar(id, transaccion);
            LOG.info("Finaliza retirar cuenta CuentaController retirar ", id, transaccion);
            return new ResponseEntity<>(cuentaActualizada, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            LOG.error("Error al retirar cuenta CuentaController retirar ", e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/{id}/balance")
    public ResponseEntity<BigDecimal> consultarSaldo(@PathVariable Long id) {
        LOG.info("Inicia consultar saldo CuentaController consultarSaldo ", id);
        try {
            BigDecimal saldo = cuentaService.consultarSaldo(id);
            LOG.info("Finaliza consultar saldo CuentaController consultarSaldo ", id);
            return new ResponseEntity<>(saldo, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            LOG.error("Error al consultar saldo CuentaController consultarSaldo ", e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
