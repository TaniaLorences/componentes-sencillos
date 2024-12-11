import { useEffect, useState } from "react";
import React from "react";
import ProductoCatalogo from "./ProductoCatalogo";
import ProductoCarrito from "./ProductoCarrito";

function Catalogo() {
  const [productos, setProductos] = useState([]); // productos del catálogo
  const [productosAnadidos, setProductosAnadidos] = useState([]); // productos añadidos al carrito

  // Cargamos todos los productos del catálogo una vez al iniciar
  const cargarProductos = async () => {
    const response = await fetch("./articulos_navidenios.json"); // evitar nombres de archivos con "ñ", pueden afectar al fetch
    const data = await response.json();  // OJO: no olvidar que response es también .json()
    setProductos(data);
  };

  useEffect(() => {cargarProductos()}, []);

  // Añadimos productos al carrito
  const handlerAnadirCarrito = (item) => {
    const productoYaEnCarrito = productosAnadidos.find((p) => p.id === item.id);

    if (productoYaEnCarrito) {
      // Si el producto ya está en el carrito actualizamos el n.º de instancias  // Creamos un nuevo objeto con las mismas propiedades que p, pero con el campo instancias incrementado en 1.
      const carritoConTodo = productosAnadidos.map((p) => p.id === item.id ? { ...p, instancias: p.instancias + 1 } : p);
      setProductosAnadidos(carritoConTodo);
    } else {
      // Si el producto no está (es la primera vez que se añade al carrito) ponemos instancias=1
      // setProductosAnadidos recibe un array con los productos existentes en el carrito (productosAnadidos) y el nuevo producto (item) que se añade con una propiedad instancias: 1.
      setProductosAnadidos([...productosAnadidos, { ...item, instancias: 1 }]);
    }
  };

  return (
    <>
      <h1>Catálogo</h1>
      <ul>
        {productos.map((producto) => (
          <ProductoCatalogo key={producto.id} item={producto} handleAnadir={handlerAnadirCarrito} />
        ))}
      </ul>

      <h1>Carrito</h1>
      <ul>
        {productosAnadidos.map((producto) => (
          <ProductoCarrito key={producto.id} item={producto} />
        ))}
      </ul>
    </>
  );
}

export default Catalogo;