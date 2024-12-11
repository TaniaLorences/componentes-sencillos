import React, {useState} from 'react';

function Contador(){

    const [numero, setNumero] = useState(0);

    return (
        /* Lo siguiente es jsx */
        <> 
            <h1>{numero}</h1>
            <button onClick={e=> setNumero(numero-1)}>Decrementar</button>
            <button onClick={e=> setNumero(numero+1)}>Incrementar</button>
        </>
    );
}
export default Contador;