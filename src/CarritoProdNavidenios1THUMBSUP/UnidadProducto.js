import React from "react";

function UnidadProducto({prod, alGuardar, alQuitar}) {
    return(
        <>
        <h2>{prod.nombre}</h2>
        <p>{prod.descripcion}</p>
        {alGuardar && <button onClick={() => alGuardar(prod)}>Añadir producto</button>}
        {alQuitar && <button onClick={() => alQuitar(prod)}>Quitar el producto del carrito</button>}
        </>
    )
}

export default UnidadProducto;