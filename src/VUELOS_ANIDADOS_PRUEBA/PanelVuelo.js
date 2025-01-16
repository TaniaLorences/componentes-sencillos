import React from "react";

function PanelVuelo({vuelo: flight, handlerOcupar, handlerLiberar}){

    return(
        <>
        <h2>Destino: {flight.destination}</h2>
        <p>Fecha: {flight.date}</p>
        <p>Time: {flight.time}</p>
        <p>N.º vuelo: {flight.number}</p>
        <p>N.º asientos: {flight.seats}</p>
        <p>Plazas disponibles: {flight.plazas_disponibles}</p>
        <p>Plazas ocupadas: {flight.plazas_ocupadas}</p>
        <button onClick={() => handlerOcupar(flight.number)}>Reservar 1 plaza</button>
        <button onClick={() => handlerLiberar(flight.number)}>Liberar 1 plaza</button>
        </>

    )
}

export default PanelVuelo;