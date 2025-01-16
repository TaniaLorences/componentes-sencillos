import React, {useState} from 'react';
import Saludo from './SaludosIrene.js';

function Toggle(){

    const[flag, setFlag] = useState(true);

    return (
        <>
        {flag&&<Saludo nombre="Irene"/>}
        <button onClick={e=>setFlag(!flag)}>Toggle</button>
        </>
    )
}

export default Toggle;