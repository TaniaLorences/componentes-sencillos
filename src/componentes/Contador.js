import React, { useState } from 'react';

const Contador = () => {
    const [recuento, setRecuento] = useState(0);

    return (
        <div>
            <h1>{recuento}</h1>
            <button onClick={() => setRecuento(recuento + 1)}>Incrementar</button>
            <button onClick={() => setRecuento(recuento - 1)}>Decrementar</button>
        </div>
    );
};

export default Contador;

