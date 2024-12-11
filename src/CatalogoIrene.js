import { useEffect, useState } from "react";
import React from "react";
import ProductoCatalogo from "./ProductoCatalogoIrene";
import ProductoCarrito from "./ProductoCarritoIrene";

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [savedProductos, setSavedProductos] = useState([]);

  // Fetch product data
  const cargarProductos = async () => {
    const response = await fetch("./articulos_navidenios.json"); // evitar nombres de archivos con "ñ", pueden afectar al fetch
    const data = await response.json();  // OJO: no olvidar que response es también .json()
    setProductos(data);
  };

  useEffect(() => {cargarProductos()}, []);

  // Add product to cart
  const handlerAnadirCarrito = (item) => {
    const existingProduct = savedProductos.find((p) => p.id === item.id);

    if (existingProduct) {
      // Update `instancias` if the product is already in the cart
      const updatedCart = savedProductos.map((p) =>
        p.id === item.id ? { ...p, instancias: p.instancias + 1 } : p
      );
      setSavedProductos(updatedCart);
    } else {
      // Add new product with `instancias` set to 1
      setSavedProductos([...savedProductos, { ...item, instancias: 1 }]);
    }
  };

  return (
    <>
      <h1>Catálogo</h1>
      <ul>
        {productos.map((producto) => (
          <ProductoCatalogo
            key={producto.id}
            item={producto}
            handleAnadir={handlerAnadirCarrito} 
          />
        ))}
      </ul>

      <h1>Carrito</h1>
      <ul>
        {savedProductos.map((producto) => (
          <ProductoCarrito key={producto.id} item={producto} />
        ))}
      </ul>
    </>
  );
}

export default Catalogo;


