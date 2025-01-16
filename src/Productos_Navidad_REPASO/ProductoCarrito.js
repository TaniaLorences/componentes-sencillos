import React from "react";

function ProductoCarrito({prod, handlerAumentar, handlerDisminuir}){
    return(
        <>
        
        <h2>Producto: {prod.nombre}</h2>
        <p>Descripción: {prod.descripcion}</p>
        <p>Cantidad: {prod.cantidad}</p>
        <p>Precio/ud: {prod.precio} €</p>
        <p>Precio todas unidades: {prod.precio*prod.cantidad} €</p>
        <button onClick={() => handlerAumentar(prod)}>Añadir 1 unidad</button>
        <button onClick={() => handlerDisminuir(prod)}>Quitar 1 unidad</button>
        </>
    )
}

export default ProductoCarrito;