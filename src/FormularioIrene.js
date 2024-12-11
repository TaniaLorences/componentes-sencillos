import React, {useState} from 'react';

const MENSAJE_INICIAL = "Te damos la bienvenida, "

function Formulario(){
    const [nombre, setNombre] = useState("");
   
    const [mensaje, setMensaje] = useState(MENSAJE_INICIAL);

    const crearMensaje= (e) => {
        e.preventDefault();
        setMensaje(MENSAJE_INICIAL+ nombre +"!");
        /* OTRA FORMA: setMensaje(MENSAJE_INICIAL+ e.target[0].value +"!");*/
    }
    return(
        <>
            <h1>{mensaje}</h1>
            <form onSubmit={e=>crearMensaje(e)}>
                <input type="text" onChange={(e)=> setNombre(e.target.value)}></input>
                <input type="submit" value="Enviar"></input>
            </form>
        </>
    );

};

export default Formulario;