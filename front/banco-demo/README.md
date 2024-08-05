# Proyecto Banco Demo

Este proyecto es una aplicación de demostración para un sistema bancario que incluye un backend en Spring Boot y un frontend en React.

## Descripción del Proyecto

El sistema permite gestionar cuentas bancarias, realizar depósitos y retiros, y consultar saldos. El backend está desarrollado en Spring Boot y expone endpoints para realizar operaciones sobre las cuentas bancarias. El frontend, construido con React, proporciona una interfaz de usuario para interactuar con el backend.

## Backend - Spring Boot

### Requisitos

- Java 17 o superior
- Maven 3.8.1 o superior

### Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/mig23ang/demo-banco.git
   cd demo-banco-backend
   mvn clean install
   mvn spring-boot:run
   cd demo-banco-frontend
   ```

npm install
npm start


````bash
###curl
```bash
crear
curl -X POST "http://localhost:8080/accounts" -H "Content-Type: application/json" -d '{
"id": 1,
"titular": "Miguel Reyes",
"saldo": 0,
"fechaCreacion": "2024-08-05T00:00:00"
}'
curl -X POST "http://localhost:8080/accounts/1/deposit" -H "Content-Type: application/json" -d '{
"tipo": "DEPOSITO",
"monto": 20,
"fecha": "2024-08-05T00:00:00"
}'
curl -X GET "http://localhost:8080/accounts/1/balance"

curl -X POST "http://localhost:8080/accounts/1/withdraw" -H "Content-Type: application/json" -d '{
"tipo": "RETIRO",
"monto": 20,
"fecha": "2024-08-05T00:00:00"
}'

curl -X POST "http://localhost:8080/accounts/1/deposit" -H "Content-Type: application/json" -d '{
  "tipo": "DEPOSITO",
  "monto": 20,
  "fecha": "2024-08-05T00:00:00"
}'
curl -X POST "http://localhost:8080/accounts/1/deposit" -H "Content-Type: application/json" -d '{
  "tipo": "DEPOSITO",
  "monto": 20,
  "fecha": "2024-08-05T00:00:00"
}'

`````
