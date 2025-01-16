import React, { useEffect, useState } from "react";
import NuevoVuelo from "./NuevoVuelo";
import PanelVuelo from "./PanelVuelo";

function Vuelos() {
    const [vuelos, setVuelos] = useState([]);
    const [vueloSeleccionado, setVueloSeleccionado] = useState(null);

    const cargarVuelos = async () => {
        try {
            const response = await fetch("/vuelos.json");
            const data = await response.json();
            const datosAplanados = data.flatMap(destination =>
                destination.flights.map(f => ({
                    ...f,
                    destination: destination.destination,
                    plazas_ocupadas: 0,
                    plazas_disponibles: f.seats
                }))
            );
            setVuelos(datosAplanados);
        } catch (error) {
            console.log("Error al cargar los vuelos", error);
        }
    };

    useEffect(() => {
        cargarVuelos();
    }, []);

    const aniadirVuelo = (destination, date, time, number, seats) => {
        const vueloExistente = vuelos.some(f => f.number === number);

        if (!vueloExistente) {
            const nuevoVuelo = {
                destination,
                date,
                time,
                number,
                seats: Number(seats),
                plazas_ocupadas: 0,
                plazas_disponibles: Number(seats)
            };
            setVuelos([...vuelos, nuevoVuelo]);
        }
    };

    const eliminarVuelo = (id) => {
        const vuelosActualizados = vuelos.filter(f => f.number !== id);
        setVuelos(vuelosActualizados);
        if (vueloSeleccionado && vueloSeleccionado.number === id) {
            setVueloSeleccionado(null);
        }
    };

    const ocuparPlaza = (id) => {
        const vuelosActualizados = vuelos.map(f => 
            f.number === id && f.plazas_disponibles > 0
                ? { ...f, plazas_disponibles: f.plazas_disponibles - 1, plazas_ocupadas: f.plazas_ocupadas + 1 }
                : f
        );
        setVuelos(vuelosActualizados);
        setVueloSeleccionado(vuelosActualizados.find(f => f.number === id));
    };

    const liberarPlaza = (id) => {
        const vuelosActualizados = vuelos.map(f =>
            f.number === id && f.plazas_ocupadas > 0
                ? { ...f, plazas_disponibles: f.plazas_disponibles + 1, plazas_ocupadas: f.plazas_ocupadas - 1 }
                : f
        );
        setVuelos(vuelosActualizados);
        setVueloSeleccionado(vuelosActualizados.find(f => f.number === id));
    };

    return (
        <>
            <h1>Listado de vuelos</h1>
            <ul>
                {vuelos.map(f => (
                    <li key={f.number}>
                        <h2>Destino: {f.destination}</h2>
                        <p>Fecha: {f.date}</p>
                        <p>Hora: {f.time}</p>
                        <p>N.º vuelo: {f.number}</p>
                        <p>N.º asientos: {f.seats}</p>
                        <button onClick={() => setVueloSeleccionado(f)}>Seleccionar vuelo</button>
                        <button onClick={() => eliminarVuelo(f.number)}>Eliminar vuelo</button>
                    </li>
                ))}
            </ul>

            <NuevoVuelo handler={aniadirVuelo} />

            {vueloSeleccionado && (
                <PanelVuelo 
                    key={vueloSeleccionado.number} 
                    vuelo={vueloSeleccionado} 
                    handlerOcupar={ocuparPlaza} 
                    handlerLiberar={liberarPlaza} 
                />
            )}
        </>
    );
}

export default Vuelos;

