import React from "react";

function UnidadProducto({prod, alGuardar, alQuitar}) {

    return (
        <>
        <h2>{prod.nombre}</h2>
        <p>{prod.descripcion}</p>
        {alGuardar && <button onClick={() => alGuardar(prod)}>Añadir</button>}
        {alQuitar && (
            <>
            <button>Unidades añadidas: {prod.cantidad}</button>
            <button>Precio parcial: {prod.cantidad*prod.precio}</button>
            <button onClick={() => alQuitar(prod)}>Quitar</button>
            </>
            )}
        </>    
    )
}

export default UnidadProducto;