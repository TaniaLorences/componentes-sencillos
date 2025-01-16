import React, { useEffect, useState } from "react";
import PanelVuelo from "./PanelVuelo";
import NuevoVuelo from "./NuevoVuelo";

function Vuelos(){
    const[vuelos, setVuelos] = useState([])
    const[vueloSeleccionado, setVueloSeleccionado] = useState({})

    const cargarVuelos = async () => {
        try {
            const response = await fetch("/vuelos.json")
            const data = await response.json();
            data.map((d) => d.flights.map((f) => {
                f["destination"] = d.destination;
                f["plazas ocupadas"] = 0;
                f["plazas disponibles"] = f.seats;
            }))
            setVuelos(data)
        } catch (error) {
            console.log("Error al cargar los vuelos", error)
        }
    }

    useEffect(() => {
        if(vuelos.length===0){
            cargarVuelos();
        }
    }, [])

    // Método para reservar plaza
    const ocuparPlaza = (id) => {
        let aux=vuelos;
        let i=0;
        for (i=0; i<aux.length; i++){
            aux[i].flights.map((f) => {
                if (f.number===id && f["plazas disponibles">0]){
                    f["plazas ocupadas"]=f["plazas ocupadas"]+1;
                    f["plazas disponibles"]=f["plazas disponibles"]-1;
                    setVueloSeleccionado({
                        "destination":f["destination"],
                        "date":f["date"],
                        "time":f["time"],
                        "number":f["number"],
                        "seats":f["seats"],
                        "plazas ocupadas": f["plazas ocupadas"],
                        "plazas disponibles": f["plazas disponibles"]
                    })
                }
            })
        }
        setVuelos(aux)
    }

    // Método para liberar plaza
    const liberarPlaza = (id) => {
        let aux=vuelos;
        let i=0;
        for (i=0; i<aux.length; i++){
            aux[i].flights.map((f) => {
                if (f.number===id && f["plazas ocupadas">0]){
                    f["plazas ocupadas"]=f["plazas ocupadas"]-1;
                    f["plazas disponibles"]=f["plazas disponibles"]+1;
                    setVueloSeleccionado({
                        "destination":f["destination"],
                        "date":f["date"],
                        "time":f["time"],
                        "number":f["number"],
                        "seats":f["seats"],
                        "plazas ocupadas": f["plazas ocupadas"],
                        "plazas disponibles": f["plazas disponibles"]
                    })
                }
            })
        }
        setVuelos(aux)
    }

    // Método para borrar un vuelo
    const eliminarVuelo = (id) => {
        vuelos.map((d) => ({
            ...d,
            flights: d.flights.filter((f) => f.number!==id)
        }))
    }

    // Id único
    const verSiIdUnico = (id) => {
        let iDUnico=true;
        vuelos.map((d) => (
            d.flights.find((f) => f.number===id ? iDUnico=false : iDUnico=true)
        ))
        return iDUnico;
    }

    // Añadir vuelo
    const aniadirVuelo = (destination,date,time,number,seats) => {
        if(verSiIdUnico){
            const nuevoVuelo={
                "destination" : destination,
                "date" : date,
                "time" : time,
                "number" : number,
                "seats" : seats
            }
            
            const destinoExistente = vuelos.find((d) => d.destination===destination)
            if (destinoExistente){
                destination.flights.push(nuevoVuelo)
                setVuelos([...vuelos])
            } else {
                setVuelos([
                    ...vuelos,
                    {destination, flights: [{nuevoVuelo}]}
                ])
            }
        }
    }

    return (
        <>
        <ul>
            <h1>Listado de vuelos</h1>
            {vuelos.map((d) => (
                d.flights.map((f) => (
                    <li key={f.number}>
                        <h2>Destino: {f.destination}</h2>
                        <p>Fecha: {f.date}</p>
                        <p>Hora: {f.time}</p>
                        <p>Asientos: {f.seats}</p>
                        <button onClick={() => setVueloSeleccionado(f)}>Seleccionar</button>
                        <button onClick={() => eliminarVuelo(f.number)}>Eliminar</button>
                    </li>
                ))
            ))}
        </ul>

        <>
            <h2>Panel de vuelo seleccionado</h2>
            {vueloSeleccionado.map((f) => (
                <PanelVuelo item={vueloSeleccionado} handlerOcupar={ocuparPlaza(vueloSeleccionado.number)} handlerLiberar={liberarPlaza(vueloSeleccionado.number)}></PanelVuelo>
            ))}
        </>

        <>
            <h2>Formulario de nuevo vuelo</h2>
            <NuevoVuelo handler={aniadirVuelo}></NuevoVuelo>
        </>

        </>


    )

}

export default Vuelos;