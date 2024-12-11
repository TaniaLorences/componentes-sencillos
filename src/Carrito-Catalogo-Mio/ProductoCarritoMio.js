import React from "react";

function ProductoCarritoMio({item}){
return(
    <li>
        <h2><span>{item.instancias} - </span>{item.nombre}</h2>
        <p>{item.descripcion}</p>
    </li>

)
}

export default ProductoCarritoMio;