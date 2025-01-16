import React from "react";
import { useState } from "react";

function Contador2(){

    const [clics, setClics] = useState(0)
    
    const handleClic = () => {
        setClics(clics+1)
    }

    return(
        <>
        <h1>Has hecho clic {clics} veces</h1>
        <button onClick={handleClic}>Haz clic aquí</button>
        </>
    )
}

export default Contador;