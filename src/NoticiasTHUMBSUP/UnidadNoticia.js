import React from "react";

function UnidadNoticia({noti, alGuardar}){
return (
    <>
    <h2>{noti.title}</h2>
    <p>{noti.body}</p>
    {/* Para que solo aparezca el botón Guardar noticia si se le pasa alGuardar */}
    {alGuardar && <button onClick={() => alGuardar(noti)}>Guardar noticia</button>} 
    </>
)

}

export default UnidadNoticia;