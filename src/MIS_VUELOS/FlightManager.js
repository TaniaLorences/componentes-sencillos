import React, { useState, useEffect } from "react";
import ListaVuelos from "./ListaVuelos";
import DetallesVuelo from "./FlightDetails";

const GestorVuelos = () => {
  const [vuelos, setVuelos] = useState([]);
  const [vueloSeleccionado, setVueloSeleccionado] = useState(null); // Se usa "null" porque solo se selecciona un objeto vuelo (o un vuelo o ninguno: null, no una lista de vuelos)
  const [mensaje, setMensaje] = useState("");

// Cargar vuelos desde el archivo JSON
const cargarVuelos = async () => {
  try {
      const response = await fetch("/vuelos.json"); // Tiene que estar en la carpeta public (ruta SIN punto)
      const data = await response.json();

      const datosEnriquecidos = data.map((d) => ({
          ...d,
          flights: d.flights.map((f) => ({
              ...f,
              destination: d.destination, // Añadimos el destino dentro del objeto vuelo
              seatsAvailable: f.seats || 0,
              seatsReserved: 0,
          })),
      }));
      setVuelos(datosEnriquecidos);
  } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
  }
};

useEffect(() => {
  cargarVuelos();
}, []);

  // Mostrar mensaje de últimas plazas
  useEffect(() => {
    let texto = "";
    vuelos.forEach((d) => {
      d.flights.forEach((f) => {
        if (f.seatsAvailable <= 3 && f.seatsAvailable > 0) {
          texto += `Últimas plazas disponibles para el vuelo ${f.number} con destino ${f.destination}\n`;
        }
      });
    });
    setMensaje(texto);
  }, [vuelos]);

  const seleccionarVuelo = (vuelo) => {
    setVueloSeleccionado(vuelo);
  };

  const actualizarVuelo = (vueloActualizado) => {
    const vuelosActualizados = vuelos.map((d) => ({
      ...d,
      flights: d.flights.map((f) =>
        f.number === vueloActualizado.number ? vueloActualizado : f
      ),
    }));
    setVuelos(vuelosActualizados);
    setVueloSeleccionado(vueloActualizado);
  };

  return (
    <div>
      {mensaje && <div style={{ color: "red", whiteSpace: "pre-line" }}>{mensaje}</div>}
      <ListaVuelos
        flights={vuelos}
        onSelectFlight={seleccionarVuelo}
        onUpdateFlights={setVuelos}
      />
      {vueloSeleccionado && (
        <DetallesVuelo
          flight={vueloSeleccionado}
          alActualizarVuelo={actualizarVuelo}
        />
      )}
    </div>
  );
};

export default GestorVuelos;

