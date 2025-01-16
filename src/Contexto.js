// Importamos las funciones necesarias desde React para crear y usar el contexto
import { createContext, useContext } from 'react';

// Creamos un nuevo contexto llamado "ContextoMio". 
// El valor por defecto es 'null', pero lo sobreescribiremos más tarde.
const ContextoMio = createContext(null);

// Este es el componente principal que se exporta desde el archivo.
export default function MyApp() {
  return (
    // Aquí estamos usando el "Provider" del ContextoMio para "proveer" un valor.
    // Este valor será accesible para todos los componentes dentro de este Provider.
    <ContextoMio.Provider value="dark">
      {/* El componente Form está dentro del proveedor, por lo que puede acceder al valor 'dark' */}
      <Form />
    </ContextoMio.Provider>
  );
}

// Este es el componente Form, que se renderiza dentro de MyApp.
function Form() {
  return (
    // Panel es un componente que recibe dos props: "title" y "children".
    // Los botones "Sign up" y "Log in" se pasan como children.
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

// Este es el componente Panel. Recibe "title" y "children" como props.
function Panel({ title, children }) {
  // Usamos useContext para acceder al valor del contexto "ContextoMio".
  // Como estamos dentro del "Provider", el valor de 'theme' será "dark".
  const theme = useContext(ContextoMio);

  // Creamos la clase CSS para el panel, concatenando 'panel-' con el valor de 'theme' (que es "dark").
  const className = 'panel-' + theme;

  // Renderizamos el JSX que incluye un título y los children (los botones en este caso).
  return (
    <section className={className}>
      {/* Mostramos el título que recibimos como prop */}
      <h1>{title}</h1>
      {/* Renderizamos los children (que son los botones) */}
      {children}
    </section>
  );
}

// Este es el componente Button. Recibe "children" como prop, que es el texto dentro del botón.
function Button({ children }) {
  // Al igual que en el Panel, usamos useContext para acceder al valor de "theme" (que es "dark").
  const theme = useContext(ContextoMio);

  // Creamos la clase CSS para el botón, concatenando 'button-' con el valor de 'theme' (que es "dark").
  const className = 'button-' + theme;

  // Renderizamos un botón con la clase generada y el contenido de "children" (el texto).
  return (
    <button className={className}>
      {/* El contenido del botón es lo que se pasa entre las etiquetas <Button> </Button> */}
      {children}
    </button>
  );
}
