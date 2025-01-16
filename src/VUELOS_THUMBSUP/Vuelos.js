import React,{useState, useEffect} from 'react';
import PanelVuelo from './PanelVuelo.js'
import NuevoVuelo from './NuevoVuelo.js'
import './Vuelo.css'


function Vuelos()
{
    const [vuelos, setVuelos]= useState([]);
    const [selectedFlight, setSelectedFlight] = useState({})

    const obtenerVuelos =async()=> 
        {
            let response = await fetch('./vuelos.json');
            let data = await response.json(); 
            data.map((d) => d.flights.map((f) => { // Especificamos SOLO las variables nuevas que vamos a añadir 
                f["plazas disponibles"] = f.seats; // DIRECTAMENTE en el doble map     
                f["plazas ocupadas"] = 0; 
                f["destino"] = d.destination}));
            setVuelos(data);  
        };
    

    useEffect( ()=>{
        if(vuelos.length===0){
            obtenerVuelos(); 
        }}, []);


    const ocuparPlaza=(id) =>{
        let aux = vuelos;
        let i = 0;
        for(i=0;i<aux.length;i++)
        {
                aux[i].flights.map((f) =>{ 
                    if(f["number"]===id) { 
                        if(f["plazas ocupadas"]<f["seats"]) {
                            f["plazas ocupadas"]=f["plazas ocupadas"]+1;
                            f["plazas disponibles"]=f["plazas disponibles"]-1;
                            setSelectedFlight({"destino": f["destino"],
                                                "number": f["number"], 
                                                "date": f["date"],
                                                "seats":f["seats"], 
                                                "plazas ocupadas": f["plazas ocupadas"], 
                                                "plazas disponibles": f["plazas disponibles"]});
                        }
                        }});
        }
        setVuelos(aux);  
    }  

    const liberarPlaza=(id) =>{
        let aux = vuelos;
        let i = 0;
        for(i=0;i<aux.length;i++)
        {
                aux[i].flights.map((f) =>{ 
                    if(f["number"]===id) { 
                        if(f["plazas ocupadas"]<=f["seats"] && f["plazas ocupadas"]>0)  {
                            f["plazas ocupadas"]=f["plazas ocupadas"]-1;
                            f["plazas disponibles"]=f["plazas disponibles"]+1;
                            setSelectedFlight({"destino": f["destino"], 
                                                "number": f["number"], 
                                                "date": f["date"],
                                                "seats":f["seats"], 
                                                "plazas ocupadas": f["plazas ocupadas"], 
                                                "plazas disponibles": f["plazas disponibles"]});
                            }                            

                        }});
        }
        setVuelos(aux);  
    }    
    
    const verSiIDesUnico = (id) => {
        let iDUnico;
        vuelos.map((d) => {
            d.flights.map((f) => f.number===id ? iDUnico=false : iDUnico=true)
        })
        return iDUnico;
    }
    
    const anadirVuelo = (destination, date, time, number, seats) => {
        if (!verSiIDesUnico(number)) return;
    
        const nuevoVuelo = {
            destino: destination, // Esto no tendría que ser "destino": destination
            number,
            date,
            seats,
            "plazas ocupadas": 0,
            "plazas disponibles": seats,
            time,
        };
    
        const destinoExistente = vuelos.find(d => d.destination === destination);
    
        if (destinoExistente) {
            destinoExistente.flights.push(nuevoVuelo);  // Aquí no sería destination.flights.push(nuevoVuelo) ???
            setVuelos([...vuelos]);
        } else {
            setVuelos([...vuelos, { destination, flights: [nuevoVuelo] }]);
        }
    };

    const eliminarVuelo = (number) => {
        let aux = vuelos.map((d) => ({
            ...d,
            flights: d.flights.filter((f) => f.number !== number),
        }));
        setVuelos(aux);
    };
        

    return(
       <>
        <h1> Vuelos</h1>
        <div className='container item-left'>
        <ul>
            { vuelos.map((d) => <ul class="flight-list">
                                    <span class="flight-destination"><strong>{d.destination} </strong></span> {
                                    d.flights.map ((f) => <li key={f.number}> 
                                                                    <span class="flight-date">{f.date} </span> 
                                                                    <span class="flight-number"> {f.number}</span>
                                                                    <button onClick={()=>setSelectedFlight(f)}>Seleccionar</button>
                                                                    <button onClick={()=>eliminarVuelo(f.number)}>Eliminar</button>
                                                                    </li>) }
                                    </ul>) }
        </ul>
        
        </div>
        <div className="bottomDiv">
           <NuevoVuelo handler={anadirVuelo}></NuevoVuelo>
           </div>  
        <div className='container item-right'>
                                                          
           {selectedFlight!==undefined && Object.keys(selectedFlight).length!==0 && <PanelVuelo item={selectedFlight} handlerIncrementar={ocuparPlaza} handlerDecrementar={liberarPlaza}></PanelVuelo> }                  
        </div>
        
        </> 
    );

}

export default Vuelos;