package com.banco.demo.dao.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransaccionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cuenta_bancaria_id")
    private CuentaBancariaEntity cuentaBancaria;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "El tipo de transacción es obligatorio")
    private TipoTransaccion tipo;

    @DecimalMin(value = "0.01", message = "El monto debe ser positivo")
    private BigDecimal monto;

}

enum TipoTransaccion {
    DEPOSITO,
    RETIRO
}