import React from "react";

function ProductoUnitarioEnCarrito({prod, handlerAumentar, handlerDisminuir}){
    return(
        <>
        <h2>Producto: {prod.nombre}</h2>
        <p>Descripción: {prod.descripcion}</p>
        <p>Cantidad: {prod.cantidad}</p>
        <p>Precio/ud: {prod.precio} €</p>
        <p>Precio total unidades: {prod.cantidad*prod.precio}</p>
        <button onClick={() => handlerAumentar(prod)}>Añadir 1 ud.</button>     {/* OJOOO: Los onClick () => */}
        <button onClick={() => handlerDisminuir(prod)}>Quitar 1 ud.</button>
        </>
    )
}

export default ProductoUnitarioEnCarrito;