import React, { useState } from 'react';

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setMensaje(`¡Te damos la bienvenida, ${nombre}!`);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    placeholder="Introduce tu nombre" 
                />
                <button type="submit">Enviar</button>
            </form>
            {mensaje && <h2>{mensaje}</h2>}
        </div>
    );
};

export default Formulario;
