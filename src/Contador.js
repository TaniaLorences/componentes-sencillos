import React from 'react';
import { useState } from 'react';

function Contador() {
  
  const [clics, setClics] = useState(0)
  
  const handleContador = () => {
    setClics(clics +1)
  }

  return(
    <>
    <h1>Has hecho clic {clics} veces</h1>
    <button onClick={handleContador}>Pulsa aquí para sumar</button>
    </>
  );

}
      
export default Contador;