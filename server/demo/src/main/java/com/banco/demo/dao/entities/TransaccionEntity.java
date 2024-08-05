package com.banco.demo.dao.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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
    private Tipo tipo;

    @DecimalMin(value = "0.01", message = "El monto debe ser positivo")
    private BigDecimal monto;

    private LocalDateTime fecha;

}