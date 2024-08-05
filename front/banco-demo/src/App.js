import logo from './logo.svg';
import './App.css';
import CrearCuenta from './components/CrearCuenta';
import Depositar from './components/Depositar';
import Retirar from './components/Retirar';
import ConsultarSaldo from './components/ConsultarSaldo';

function App() {
  return (
    <div className="App">
    <h1>Banco Demo</h1>
    <CrearCuenta />
    <Depositar />
    <Retirar />
    <ConsultarSaldo />
</div>
  );
}

export default App;
