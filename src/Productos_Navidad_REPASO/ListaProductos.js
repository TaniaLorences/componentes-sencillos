import React, { useEffect, useState } from "react";
import ProductoCarrito from "./ProductoCarrito";

function ListaProductos(){
    const [productos, setProductos] = useState([])
    const [productosAniadidos, setProductosAniadidos] = useState([])
    const [mensaje, setMensaje] = useState("")

    const cargarProductos = async() => {
        try {
            const response = await fetch("/articulos_navidenios.json")
            const data = await response.json() 
            setProductos(data)
        } catch (error) {
            console.log("Error al cargar los productos", error)
        }
    }

    useEffect(()=> {
        if(productos.length===0){
            cargarProductos();
        }
    }, [])

    const aniadirAlCarrito = (prod) => {
        const productoYaEnCarrito = productosAniadidos.find((p) => (p.id===prod.id))
        if (!productoYaEnCarrito){
            setProductosAniadidos([...productosAniadidos, {...prod, cantidad:1}]) // OJO: Si el producto no está en el carrito NO se mapea
        } else {
            const prodsActualizados=productosAniadidos.map((p) => (
                p.id===prod.id ? {...p, cantidad: p.cantidad +1} : p    // OJO: Cuando el producto ya está en el carrito, 
            ))                                                          // se mapea accediendo directamente al producto
            setProductosAniadidos(prodsActualizados)
        }
    }

    const eliminarProducto = (prod) => {
        const prodsActualizados = productos.filter((p) => p.id!==prod.id)
        setProductos(prodsActualizados)
    }

    const aumentarUnaUnidad = (prod) => {
        const prodsActualizados = productosAniadidos.map((p) => (
            p.id===prod.id ? {...p, cantidad: p.cantidad + 1} : p   
        ))
        setProductosAniadidos(prodsActualizados)
    }

    const restarUnaUnidad = (prod) => {
        const prodsActualizados = productosAniadidos
        .map((p) => (
            p.id===prod.id ? {...p, cantidad: p.cantidad - 1} : p
        ))
        .filter((p) => p.cantidad>=0)
        setProductosAniadidos(prodsActualizados)
    }

    const precioTotalCarrito = () => {
        let precioTotal=0
        productosAniadidos.map((p) => (
            precioTotal += p.cantidad*p.precio
        ))
        return precioTotal
    }

    const cargarMensaje = () => {
        let texto=""
        if(precioTotalCarrito()>100){
            texto="Estás comprando más de la cuenta"
        }
        setMensaje(texto)
    }

    useEffect(() => {
        cargarMensaje();
    }, [productosAniadidos])

    return(
        <>
        <ul>
            <h1>Listado de productos</h1>
            {productos.map((p) => (
                <li key={p.id}>
                    <h2>Nombre del producto: {p.nombre}</h2>
                    <p>Descripción: {p.descripcion}</p>
                    <p>Precio/ud: {p.precio} €</p>
                    <button onClick={() => aniadirAlCarrito(p)}>Añadir al carrito</button>
                    <button onClick={() => eliminarProducto(p)}>Eliminar del listado</button>
                </li>
            ))}
        </ul>

        <>
            
            <ul>
                <h1>Carrito</h1>
                {productosAniadidos.map((p) => (
                    <li key={p.id}>
                        <ProductoCarrito prod={p} handlerAumentar={aumentarUnaUnidad} handlerDisminuir={restarUnaUnidad}></ProductoCarrito>
                    </li>
                ))}
                <h2>Precio total del carrito: {precioTotalCarrito()}</h2>
                {mensaje && <h3>{mensaje}</h3>}
            </ul>
        </>
        </>
    )
}

export default ListaProductos; 