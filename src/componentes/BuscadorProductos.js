import React, { useState } from 'react';

const productos = [
    { id: 1, nombre: 'Queso' },
    { id: 2, nombre: 'Pan' },
    { id: 3, nombre: 'Leche' },
    { id: 4, nombre: 'Agua' },
    { id: 5, nombre: 'Fruta' }
];

const BuscadorProductos = () => {
    const [busqueda, setBusqueda] = useState('');

    return (
        <div>
            <input 
                type="text" 
                value={busqueda} 
                onChange={(e) => setBusqueda(e.target.value)} 
                placeholder="Buscar producto" 
            />
            <ul>
                {productos
                    .filter(producto => 
                        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
                    )
                    .map(producto => (
                        <li key={producto.id}>{producto.nombre}</li>
                    ))}
            </ul>
        </div>
    );
};

export default BuscadorProductos;
