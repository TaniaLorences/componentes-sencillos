import React, { useState } from 'react';

const ListaTareas = () => {
    const [tarea, setTarea] = useState('');
    const [tareas, setTareas] = useState([]);

    const agregarTarea = (e) => {
        e.preventDefault();
        if (tarea) {
            setTareas([...tareas, { texto: tarea, completada: false }]);
            setTarea('');
        }
    };

    const toggleCompleta = (index) => {
        const nuevasTareas = [...tareas];
        nuevasTareas[index].completada = !nuevasTareas[index].completada;
        setTareas(nuevasTareas);
    };

    return (
        <div>
            <form onSubmit={agregarTarea}>
                <input 
                    type="text" 
                    value={tarea} 
                    onChange={(e) => setTarea(e.target.value)} 
                    placeholder="Nueva tarea" 
                />
                <button type="submit">Agregar</button>
            </form>
            <ul>
                {tareas.map((t, index) => (
                    <li key={index}>
                        <input 
                            type="checkbox" 
                            checked={t.completada} 
                            onChange={() => toggleCompleta(index)} 
                        />
                        <span style={{ textDecoration: t.completada ? 'line-through' : 'none' }}>
                            {t.texto}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaTareas;
