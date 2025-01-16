import React, { useState } from "react";

const FormularioAniadirVuelo = ({ destination, onAddFlight: alAniadirVuelo }) => {
  const [nuevoVuelo, setNuevoVuelo] = useState({
    number: "",
    date: "",
    time: "",
    seatsAvailable: 0,
    seatsReserved: 0,
  });

  const gestionarEnvio = (e) => {
    e.preventDefault();
    alAniadirVuelo(destination, { ...nuevoVuelo });
    setNuevoVuelo({
      number: "",
      date: "",
      time: "",
      seatsAvailable: 0,
      seatsReserved: 0,
    });
  };

  return (
    <form onSubmit={gestionarEnvio}>
      <input
        type="text"
        placeholder="Número de vuelo"
        value={nuevoVuelo.number}
        onChange={(e) => setNuevoVuelo({ ...nuevoVuelo, number: e.target.value })}
        required
      />
      <input
        type="date"
        value={nuevoVuelo.date}
        onChange={(e) => setNuevoVuelo({ ...nuevoVuelo, date: e.target.value })}
        required
      />
      <input
        type="time"
        value={nuevoVuelo.time}
        onChange={(e) => setNuevoVuelo({ ...nuevoVuelo, time: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Plazas disponibles"
        value={nuevoVuelo.seatsAvailable}
        onChange={(e) =>
          setNuevoVuelo({ ...nuevoVuelo, seatsAvailable: parseInt(e.target.value) })
        }
        required
      />
      <button type="submit">Añadir vuelo</button>
    </form>
  );
};

export default FormularioAniadirVuelo;
