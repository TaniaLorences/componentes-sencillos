import React from "react";
import FormularioAniadirVuelo from "./FormularioAniadirVuelo";

const ListaVuelos = ({ flights, onSelectFlight: alSeleccionarVuelo, onUpdateFlights: alActualizarVuelos }) => {
  const aniadirVuelo = (destination, newFlight) => {
    const vuelosActualizados = flights.map((d) =>
      d.destination === destination
        ? { ...d, flights: [...d.flights, newFlight] }
        : d
    );
    alActualizarVuelos(vuelosActualizados);
  };

  const eliminarVuelo = (flightNumber) => {
    const vuelosActualizados = flights.map((dest) => ({
      ...dest,
      flights: dest.flights.filter((flight) => flight.number !== flightNumber),
    }));
    alActualizarVuelos(vuelosActualizados);
  };

  return (
    <div>
      {flights.map((d) => (
        <div key={d.destination}>
          <h2>{d.destination}</h2>
          <FormularioAniadirVuelo
            destination={d.destination}
            onAddFlight={aniadirVuelo}
          />
          <ul>
            {d.flights.map((f) => (
              <li key={f.number}>
                Vuelo {f.number} - {f.date}
                <button onClick={() => alSeleccionarVuelo(f)}>Seleccionar</button>
                <button onClick={() => eliminarVuelo(f.number)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListaVuelos;

