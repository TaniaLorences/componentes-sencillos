import React, { useState } from "react";

function NuevoVuelo({handler}) {
    const[destination, setDestination] = useState("")
    const[date, setDate] = useState("2025-12-13")
    const[time, setTime] = useState("00:00")
    const[number, setNumber] = useState("")
    const[seats, setSeats] = useState("")

    return(
        <form onSubmit={(e) => {
            e.preventDefault();
            handler(destination, date, time, number, seats);
        }}>
            <label for="destination">Destino: </label>
            <input name="destination" type="text" value={destination} onChange={(e) => setDestination(e.target.value)}></input>

            <label for="date">Fecha: </label>
            <input name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>

            <label for="time">Hora: </label>
            <input name="time" type="time" value={time} onChange={(e) => setTime(e.target.value)}></input>

            <label for="number">N.º vuelo: </label>
            <input name="number" type="text" value={number} onChange={(e) => setNumber(e.target.value)}></input>

            <label for="seats">N.º asientos: </label>
            <input name="seats" type="number" value={seats} onChange={(e) => setSeats(e.target.value)}></input>

            <input type="submit">Enviar</input>
        </form>
    )
}

export default NuevoVuelo;