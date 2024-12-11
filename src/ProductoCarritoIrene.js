import React from "react";

function ProductoCarrito({ item }) {
  return (
    <li>
      <h2><span>{item.instancias} - </span>{item.nombre}</h2>
      <p>{item.descripcion}</p>
    </li>
  );
}

export default ProductoCarrito;
