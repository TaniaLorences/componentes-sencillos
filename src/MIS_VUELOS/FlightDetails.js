import React from "react";

function DetallesVuelo({ flight, onUpdateFlight: alActualizarVuelo }) {
  const reservarAsiento = () => {
    if (flight.seatsAvailable > 0) {
      alActualizarVuelo({
        ...flight,
        seatsAvailable: flight.seatsAvailable - 1,
        seatsReserved: flight.seatsReserved + 1,
      });
    }
  };

  const liberarAsiento = () => {
    if (flight.seatsReserved > 0) {
      alActualizarVuelo({
        ...flight,
        seatsAvailable: flight.seatsAvailable + 1,
        seatsReserved: flight.seatsReserved - 1,
      });
    }
  };

  return (
    <div>
      <h3>Detalles del Vuelo</h3>
      <p>Número de vuelo: {flight.number}</p>
      <p>Destino: {flight.destination}</p>
      <p>Fecha: {flight.date}</p>
      <p>Hora: {flight.time}</p>
      <p>Plazas disponibles: {flight.seatsAvailable}</p>
      <p>Plazas reservadas: {flight.seatsReserved}</p>
      <button onClick={reservarAsiento} disabled={flight.seatsAvailable === 0}>
        Reservar plaza
      </button>
      <button onClick={liberarAsiento} disabled={flight.seatsReserved === 0}>
        Liberar plaza
      </button>
    </div>
  );
}

export default DetallesVuelo;

