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
            data.map((d) => d.flights.map((f) => {f["plazas disponibles"] = f.seats; f["plazas ocupadas"] = 0; f["destino"] = d.destination}));
            setVuelos(data);  

        };
    

    useEffect( ()=>{

        if(vuelos.length===0)
            {
                obtenerVuelos(); 
            }  
        }, []);


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
    /*
    CODIGO ORIGINAL DE IRENE
    const checkUniqueId=(id)=>{
        let flag = true;
        let i=0;
        for(i=0;i<vuelos.length;i++)
            {
                    vuelos[i].flights.map((f) =>{ 
                        if(f["number"]===id)  flag= false;})
            }
        return flag;    
    }
    */
    const verSiIDesUnico = (id) => {
        let iDUnico;
        vuelos.map((d) => {
            d.flights.map((f) => f.number===id ? iDUnico=false : iDUnico=true)
        })
        return iDUnico;
    }

    /* CODIGO ORIGINAL DE IRENE
    const anadirVuelo=(destination,date,time,number,seats)=>{

        if (verSiIDesUnico(number)) // Solo se añade el vuelo si el id es único
        {
            let nuevoVuelo = {"destino": destination, "number": number, "date": date,"seats":seats, "plazas ocupadas": 0, "plazas disponibles": seats, "time":time};
            let aux = vuelos;
            let i = 0;
            let flag = false;
            for(i=0;i<aux.length;i++)
                { 
                    if (aux[i].destination === destination)
                    {
                        aux[i].flights= [...aux[i].flights, nuevoVuelo];
                        flag = true;
                    }
                }  
            if (!flag)   
            {
                aux = [...vuelos,{ "destination":destination , "flights" :[nuevoVuelo]}];
            }
            setVuelos([...aux]);
        }
    } 
    */
    
    const anadirVuelo = (destination, date, time, number, seats) => {
        if (verSiIDesUnico(number)) {
            const nuevoVuelo = {
                destino: destination,
                number,
                date,
                seats,
                "plazas ocupadas": 0,
                "plazas disponibles": seats,
                time,
            };
    
            let destinoExiste = false;
    
            const nuevosVuelos = vuelos.map((d) => {
                if (d.destination === destination) {
                    destinoExiste = true;
                    return {
                        ...d,
                        flights: [...d.flights, nuevoVuelo],
                    };
                }
                return d;
            });
    
            if (!destinoExiste) {
                setVuelos([...nuevosVuelos, { destination, flights: [nuevoVuelo] }]);
            } else {
                setVuelos(nuevosVuelos);
            }
        }
    };

        /*     
        FUNCION ORIGINAL DE IRENE
        const eliminarVuelo=(number)=>{
        let aux = vuelos;
        let i = 0;
        for(i=0;i<aux.length;i++)
            { 
                let j=0;
                for(j=0;j<aux[i].flights.length;j++)
                if (aux[i].flights[j] === number)
                {
                    aux[i].flights= aux[i].flights.splice(j);
                }
            }    
        setVuelos([...aux]);
    } */

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