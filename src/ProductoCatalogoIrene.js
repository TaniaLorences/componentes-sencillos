import React from "react";

function ProductoCatalogo({ item, handleAnadir }) {
  return (
    <li>
      <h2>{item.nombre}</h2>
      <p>{item.descripcion}</p>
      <button onClick={() => handleAnadir(item)}>Añadir</button>
    </li>
  );
}

export default ProductoCatalogo;
