import React, { useEffect, useState } from "react";
import UnidadProducto from "./UnidadProducto";

function ListaProductos(){
    const [productos, setProductos] = useState([])
    const [productosAniadidos, setProductosAniadidos] = useState([])

    const cargarProductos = async () => {
        try {
            const response = await fetch("./articulos_navidenios.json")
            const data = await response.json()
            setProductos(data)
        } catch (error) {
            console.log("Error al cargar los productos", error)
        }
    }

    useEffect (() => {
        cargarProductos();
    }, [])

    const aniadirProductos = (productoAAniadir) => {
        const productoExistente = productosAniadidos.find((p) => (
            p.id===productoAAniadir.id 
        ))

        if (productoExistente) {
            const productosActualizados = productosAniadidos.map((p) => (
                p.id === productoAAniadir.id ? {...p, cantidad: p.cantidad+1} : p
            ))
            setProductosAniadidos(productosActualizados)
        } else {
            setProductosAniadidos([...productosAniadidos, {...productoAAniadir, cantidad:1}])
        }
    }

    const quitarProductos = (productoAQuitar) => {
        const productosActualizados = productosAniadidos
        .map((p) => (
            p.id === productoAQuitar.id && p.cantidad>=1 ? {...p, cantidad: p.cantidad-1} : p
        ))
        .filter((p) => (
            p.cantidad>0
        ))
        setProductosAniadidos(productosActualizados)
    }

    const calcularPrecioTotalCarrito = () => {
        let precioTotal=0
        productosAniadidos.map((p) => {
            precioTotal += p.cantidad*p.precio;
            return null;
        })
        return precioTotal
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
        <h1>Productos añadidos</h1>
        <h2>Precio total carrito: {calcularPrecioTotalCarrito()} €</h2>
        {productosAniadidos.map((cosa) => (
            <UnidadProducto key={cosa.id} prod={cosa} alQuitar={quitarProductos}></UnidadProducto>
        ))}
        </>
        </>
    )
}

export default ListaProductos;