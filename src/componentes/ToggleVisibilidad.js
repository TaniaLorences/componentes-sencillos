import React, { useState } from 'react';

const ToggleVisibilidad = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <button onClick={() => setVisible(!visible)}>
                {visible ? 'Ocultar' : 'Mostrar'} Mensaje
            </button>
            {visible && <p>¡Ahora sí se ve!</p>}
        </div>
    );
};

export default ToggleVisibilidad;
