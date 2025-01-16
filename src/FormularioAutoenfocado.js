import React, { useRef, useEffect } from 'react';

function FormularioAutoenfocado() {

  // Creamos una referencia usando `useRef`. Esta referencia se usará para acceder
  // directamente al campo de entrada del formulario.
  const referenciaMia = useRef(null);

  // Usamos el hook `useEffect` para ejecutar una acción cuando el componente se monte.
  useEffect(() => {
    // Accedemos al elemento referenciado por `referenciaMia` y llamamos al método `focus()`.
    // Esto coloca automáticamente el foco en el campo de texto cuando el componente se renderiza por primera vez.
    referenciaMia.current.focus();
  }, []); // El array vacío `[]` asegura que esto ocurra solo una vez, al montar el componente.

  // Retornamos el JSX que define el formulario.
  return (
    <form>

      <input // Este es el campo de entrada de texto donde el usuario introducirá su nombre. Se asocia la referencia `referenciaMia` a este campo utilizando el atributo `ref`.
        type="text" 
        ref={referenciaMia} // Asignamos la referencia al input
        placeholder="Introduce tu nombre" // Texto que aparece cuando el campo está vacío.
      />

      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormularioAutoenfocado;

