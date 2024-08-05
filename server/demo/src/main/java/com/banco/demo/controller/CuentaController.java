package com.banco.demo.controller;

import com.banco.demo.dao.entities.CuentaBancariaEntity;
import com.banco.demo.service.contract.ICuentaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.math.BigDecimal;

@RestController
@RequestMapping("/accounts")
public class CuentaController {

    @Autowired
    private ICuentaService cuentaService;

    @PostMapping
    public ResponseEntity<CuentaBancariaEntity> crearCuenta(@Valid @RequestBody CuentaBancariaEntity cuenta) {
        try {
            CuentaBancariaEntity cuentaCreada = cuentaService.crearCuenta(cuenta);
            return new ResponseEntity<>(cuentaCreada, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{id}/deposit")
    public ResponseEntity<CuentaBancariaEntity> depositar(@PathVariable Long id, @RequestParam BigDecimal monto) {
        try {
            CuentaBancariaEntity cuentaActualizada = cuentaService.depositar(id, monto);
            return new ResponseEntity<>(cuentaActualizada, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{id}/withdraw")
    public ResponseEntity<CuentaBancariaEntity> retirar(@PathVariable Long id, @RequestParam BigDecimal monto) {
        try {
            CuentaBancariaEntity cuentaActualizada = cuentaService.retirar(id, monto);
            return new ResponseEntity<>(cuentaActualizada, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}/balance")
    public ResponseEntity<BigDecimal> consultarSaldo(@PathVariable Long id) {
        try {
            BigDecimal saldo = cuentaService.consultarSaldo(id);
            return new ResponseEntity<>(saldo, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
