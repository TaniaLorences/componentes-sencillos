import React from "react";
import { useState, useEffect } from "react";
import ProductoCarritoMio from "./ProductoCarritoMio";
import ProductoCatalogoMio from "./ProductoCatalogoMio";

function CatalogoMio(){
    const [productos, setProductos] = useState([]);
    const [productosAnadidos, setProductosAnadidos] = useState([]);

    const cargarProductos = async () => {
        const response = await fetch("./articulos_navidenios.json");
        const data = await response.json();
        setProductos(data);
    }

    useEffect(() => {cargarProductos()}, []);

    const handlerAnadirCarrito = (item) => {
        const productoYaEnCarrito = productosAnadidos.find((p) => p.id === item.id);

        if (productoYaEnCarrito){
            const carritoActualizado = productosAnadidos.map((p) => p.id === item.id ? {...p, instancias:p.instancias+1} : p)
            setProductosAnadidos(carritoActualizado);
        } else {
            setProductosAnadidos([...productosAnadidos,{...item, instancias:1}]);
        }
    }

    return(
        <>
        <ul>
            <h1>Catálogo</h1>
            {productos.map((producto) => (
                <ProductoCatalogoMio key={producto.id} item={producto} handleAnadir={handlerAnadirCarrito}/>
            ))}
        </ul>
        <ul>
            <h1>Carrito</h1>
            {productosAnadidos.map((producto) => (
                <ProductoCarritoMio key={producto.id} item={producto}/>
            ))}
        </ul>
        </>


    );
}

export default CatalogoMio;