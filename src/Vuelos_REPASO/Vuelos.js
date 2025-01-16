import React, { useEffect, useState } from "react";
import PanelVuelo from "./PanelVuelo";
import NuevoVuelo from "../VUELOS_THUMBSUP/NuevoVuelo";

function Vuelos(){
    const[vuelos, setVuelos] = useState([])
    const[vueloSeleccionado, setVueloSeleccionado] = useState({})

    const cargarVuelos = async() => {
        try {
            const response = await fetch("/vuelos.json")
            const data = await response.json()
            data.map((d) => d.flights.map((f) => {
                f["destino"]=d.destination;
                f["plazas ocupadas"] = 0;
                f["plazas disponibles"] = f.seats;
            }))
            setVuelos(data)
        } catch (error) {
            console.log("Error al cargar los vuelos", error)
        }
    }

    useEffect(() => {
        cargarVuelos();
    }, [])

    const ocuparPlaza= (id) => {
        let aux=vuelos
        let i=0
        for (i=0; i<aux.length; i++){
            aux[i].flights.map((f) => {
                if (f["number"]===id && f["plazas disponibles"]>0){
                    f["plazas disponibles"] =  f["plazas disponibles"] -1;
                    f["plazas ocupadas"] =  f["plazas ocupadas"] +1;
                }
                setVueloSeleccionado({
                    "destino":f["destination"],
                    "date":f["date"],
                    "time":f["time"],
                    "number":f["number"],
                    "seats":f["seats"],
                    "plazas disponibles": f["seats"],
                    "plazas ocupadas": 0,
            })
        })
        }
        setVuelos(aux)
    }

    const liberarPlaza= (id) => {
        let aux=vuelos
        let i=0
        for (i=0; i<aux.length; i++){
            aux[i].flights.map((f) => {
                if (f["number"]===id && f["plazas disponibles"]>0){
                    f["plazas disponibles"] =  f["plazas disponibles"] +1;
                    f["plazas ocupadas"] =  f["plazas ocupadas"] -1;
                }
                setVueloSeleccionado({
                    "destino":f["destino"],
                    "date":f["date"],
                    "time":f["time"],
                    "number":f["number"],
                    "seats":f["seats"],
                    "plazas disponibles": f["plazas disponibles"],
                    "plazas ocupadas": f["plazas ocupadas"],
            })
        })
        }
        setVuelos(aux)
    }

    const eliminarVuelo = (id) => {
        let aux = vuelos
        aux.map((d) => ({
            ...d,
            flights: d.flights.filter((f) => (f.number!==id))
        }))
        setVuelos(aux)
    }

    const aniadirVuelo = (destination, date, time, number, seats) => {
        let idUnico = vuelos.map((d) => (d.flights.find((f) => f.number!==number)))
        if (idUnico){
            const nuevoVuelo = {
                "destino": destination,
                date,
                time,
                number,
                seats,
                "plazas ocupadas": 0,
                "plazas disponibles": seats,
            }

            let destinoExistente = vuelos.find((d) => (d.destino===destination))
            if (destinoExistente){
                destination.flights.push(nuevoVuelo)
                setVuelos([...vuelos])
            } else {
                setVuelos([...vuelos, {destination, flights: [nuevoVuelo]}])
            }
            
        }
    }
    return(
        <>
        <>
            <h1>Listado vuelos</h1>
            {vuelos.map((d) => (
                d.flights.map((f) => (
                    <li key={f.number}>
                        <h2>Destino: {f.destino}</h2>
                        <p>Fecha: {f.date}</p>
                        <p>Hora: {f.time}</p>
                        <p>Plazas: {f.seats}</p>
                        <button onClick={() => setVueloSeleccionado(f)}>Seleccionar vuelo</button>
                        <button onClick={() => eliminarVuelo(f.number)}>Eliminar vuelo</button>
                    </li>
                ))
            ))}
        </>

        <>
        <NuevoVuelo handler={aniadirVuelo}></NuevoVuelo>
        </>

        <>
        {vueloSeleccionado!==undefined && Object.keys(vueloSeleccionado).length!==0 (
            <PanelVuelo item={vueloSeleccionado} handlerLiberar={() => liberarPlaza(vueloSeleccionado.number)} handlerOcupar={() => ocuparPlaza(vueloSeleccionado.number)}></PanelVuelo>
        )}
        </>

        </>
    )
}

export default Vuelos;