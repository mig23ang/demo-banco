package com.banco.demo.dao.repositories;

import com.banco.demo.dao.entities.CuentaBancariaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CuentaBancariaReposiroty extends JpaRepository<CuentaBancariaEntity, Long> {
}
