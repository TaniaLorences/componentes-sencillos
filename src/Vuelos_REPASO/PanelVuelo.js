import React from "react";

function PanelVuelo({item, handlerOcupar, handlerLiberar}){
    return(
        <> 
            <h2>Destino: {item["destino"]}</h2>
            <p>Fecha: {item.date}</p>
            <p>Hora: {item.time}</p>
            <p>Asientos totales: {item.seats}</p>
            <p>Plazas ocupadas: {item["plazas ocupadas"]}</p>
            <p>Plazas disponibles: {item["plazas disponibles"]}</p>
            <button onClick={() => handlerLiberar(item.number)}>Liberar plaza</button>
            <button onClick={() => handlerOcupar(item.number)}>Reservar plaza</button>
        </>
    )
}

export default PanelVuelo;