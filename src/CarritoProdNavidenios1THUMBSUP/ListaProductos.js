import React, { useEffect, useState } from "react";
import UnidadProducto from "./UnidadProducto";

function ListaProductos(){
    const [productos, setProductos] = useState([])
    const [productosAniadidos, setProductosAniadidos] = useState([])

    const cargarProductos = async() => {
        try {
            const response = await fetch("./articulos_navidenios.json")
            const data = await response.json();
            setProductos(data)
        } catch (error) {
            console.log("Error al cargar los productos ", error)
        }
    }

    useEffect(() => {
        cargarProductos();
    }, [])

    const aniadirProductos = (productoAAniadir) => {
        setProductosAniadidos([...productosAniadidos, productoAAniadir])
    }

    const quitarProductos = (productoAQuitar) => {
        const productosActualizados = productosAniadidos.filter((cosa) => (cosa.id !== productoAQuitar.id ))
        setProductosAniadidos(productosActualizados)
    }

   
    return (
        <>
        <>
        <h1>Lista de productos</h1>
       {productos.map((cosa) => (
        <UnidadProducto key={cosa.id} prod={cosa} alGuardar={aniadirProductos}></UnidadProducto>
       ))}
        </>
        <>
        <h1>Productos añadidos al carrito</h1>
        {productosAniadidos.map((cosa) => (
        <UnidadProducto key={cosa.id} prod={cosa} alQuitar={quitarProductos}></UnidadProducto>
        ))}
        </>
        </>
    )
}

export default ListaProductos;