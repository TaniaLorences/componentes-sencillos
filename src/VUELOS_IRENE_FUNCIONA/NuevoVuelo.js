import React,{useState} from 'react';
import './NuevoVuelo.css'

function NuevoVuelo({handler}){
    const [destination, setDestination] = useState("");
    const [seats, setSeats] = useState("");
    const [number, setNumber] = useState("");
    const [date, setDate] = useState("2024-12-13");
    const [time, setTime] = useState("00:00");
    

    return(        
        <div className='formulario'>
        <form onSubmit={(e)=>{e.preventDefault();handler(destination,date,time,number,seats)}}>
           <label for="destination">Destino:</label>
           <input type="text" name="destination" value={destination} onChange={(e)=>setDestination(e.target.value)}></input>     
           <label for="seats">Seats:</label>
           <input type="number" name="seats" value={seats}  onChange={(e)=>setSeats(e.target.value)}></input>     
           <label for="number">Number:</label>
           <input type="text" name="number" value={number}  onChange={(e)=>setNumber(e.target.value)}></input>     
           <label for="date">Date:</label>
           <input type="date" name="date" value={date}  onChange={(e)=>setDate(e.target.value)}></input>     
           <label for="time">Time:</label>
           <input type="time" name="time" value={time}  onChange={(e)=>setTime(e.target.value)}></input>    
           <input type="submit"></input> 
        </form>
        </div>
    )
    
}
export default NuevoVuelo;