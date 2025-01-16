import React from "react";

function PanelVuelo({item, handlerOcupar, handlerLiberar}){
    return( 
        <>
        <h2>Destino: {item["destination"]}</h2>
        <p>Fecha: {item.date}</p>
        <p>Hora: {item.time}</p>
        <p>Asientos: {item.seats}</p>
        <p>Asientos libres: {item["plazas disponibles"]}</p>
        <p>Asientos ocupados: {item["plazas ocupadas"]}</p>
        <button onClick={() => handlerOcupar(item.number)}>Reservar plaza</button>
        <button onClick={() => handlerLiberar(item.number)}>Liberar plaza</button>
        </>
    )

}

export default PanelVuelo;