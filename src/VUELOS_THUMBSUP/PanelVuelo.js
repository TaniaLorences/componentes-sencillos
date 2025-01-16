import React from 'react';
import './PanelVuelos.css'

function PanelVuelo({item, handlerIncrementar, handlerDecrementar})
{

    return(
    <div className='flight-details cards'> 
        <div className='header'>
            <h3>{item["destino"]}</h3>   {/* OJOOOOOOO: Se accede así a la variable que hemos añadido nosotros */}
         </div>
         <div class="card-body">
        <ul>
            <li> <strong>Date</strong> :{item.date}</li>
            <li> Time :{item.time}</li>
            <li> Plazas :{item.seats}</li>
            <li> Plazas disponibles :{item["plazas disponibles"]}</li>
            <li> Plazas ocupadas :{item["plazas ocupadas"]}</li>
            <button onClick={()=>handlerIncrementar(item.number)}>Ocupar</button>
            <button onClick={()=>handlerDecrementar(item.number)}>Liberar</button>

        </ul>
        </div>
    </div>
    );
}

export default PanelVuelo;