import './App.css';
import React from 'react';
import Contador from './componentes/Contador';
import Formulario from './componentes/Formulario';
import ToggleVisibilidad from './componentes/ToggleVisibilidad';
import ListaTareas from './componentes/ListaTareas';
import BuscadorProductos from './componentes/BuscadorProductos';

function App() {
  return (
    <div>
      <ul>
      <h1>Ejercicios de React</h1>
      <li><h2>Ejercicio 1: Componente Contador</h2></li>
      <Contador />
      <li><h2>Ejercicio 2: Formulario simple</h2></li>
      <Formulario />
      <li><h2>Ejercicio 3: Toggle de visibilidad</h2></li>
      <ToggleVisibilidad />
      <li><h2>Ejercicio 4: Lista de tareas</h2></li>
      <ListaTareas />
      <li><h2>Ejercicio 5: Buscador de productos</h2></li>
      <BuscadorProductos />
      </ul>
    </div>
  );
}

export default App;

