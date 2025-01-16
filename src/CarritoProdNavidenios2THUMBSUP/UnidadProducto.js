import React from "react";

function UnidadProducto({prod, alGuardar, alQuitar}) {

    return(
        <>
        <h2>{prod.nombre}</h2>
        <p>{prod.descripcion}</p>
        {alGuardar && <button onClick={() => alGuardar(prod)}>Añadir al carrito</button>}
        {alQuitar && (
            <>
            <button>Ver cantidad: {prod.cantidad}</button>
            <button>Precio: {prod.precio*prod.cantidad}</button>
            <button onClick={() => alQuitar(prod)}>Eliminar producto</button>
            </>)}
        </>
    )

}

export default UnidadProducto;
