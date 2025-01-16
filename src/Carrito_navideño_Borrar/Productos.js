import React, { useEffect, useState } from "react";
import ProductoUnitarioEnCarrito from "./ProductoUnitarioEnCarrito";
import "./Productos.css"

function Productos(){
    const[productos, setProductos] = useState([])
    const[productosAniadidos, setProductosAniadidos] = useState([])
    const[mensaje, setMensaje] = useState("")

    const cargarProductos = async() => {
        try {
            const response = await fetch("/articulos_navidenios.json")
            const data = await response.json();
            setProductos(data)
        } catch (error) {
            console.log("Error al cargar los productos", error)
        }
    }

    useEffect(() => {
        if(productos.length===0){
            cargarProductos();
        }
    }, [])

    // Añadir/seleccionar productos para meterlos al carrito (podemos aumentar la unidad en el carrito de 1 en 1)
    const aniadirProductoAlCarrito = (prodAAniadir) => {
       const productoYaAnidadido = productosAniadidos.find((p) => p.id===prodAAniadir.id)
        // ERROR: En este caso, la lógica del `map` es innecesaria, ya que NO estamos iterando realmente sobre `productosAniadidos`.
      // Esto causa que se retorne un array mal construido o vacío.

       if (!productoYaAnidadido){
            /* // El producto no está añadido al array productosAniadidos, entonces no mapeamos ese array, se pone directamente el set
            const prodsActualizados = productosAniadidos.map((p) => (
              p.id===prodAAniadir.id ? [...productosAniadidos, {...p, cantidad: 1}]  : p
            ))
            setProductosAniadidos(prodsActualizados)
            */
           const productosActualizados = [...productosAniadidos, {...prodAAniadir, cantidad: 1}]
           setProductosAniadidos(productosActualizados)
       } else {
            const prodsActualizados = productosAniadidos.map((p) => (
                p.id===prodAAniadir.id ? {...p, cantidad: p.cantidad+1} : p // OJOOO: Al mapear repetimos la condición para relacionar (p) con el parámetro de la función externa
            ))
            setProductosAniadidos(prodsActualizados)
       }
    }

    const eliminarProducto = (prodAEliminar) => {
        const productoEnCatalogo = productos.find((p) => p.id===prodAEliminar.id)
        
        if (productoEnCatalogo){
            const productosActualizados =productos.filter((p) => (p.id!==prodAEliminar.id))
            setProductos(productosActualizados)
        }
    }

    const aumentarUnidadEnCarrito = (prod) => {         
        const productoYaEnCarrito = productosAniadidos.find((p) => p.id===prod.id)
        if(productoYaEnCarrito){
            const prodActualizados = productosAniadidos.map((p) => (
                p.id===prod.id ? {...p, cantidad: p.cantidad+1} : p
            ))
            setProductosAniadidos(prodActualizados)
        } 
    }

    const quitarUnaUnidadDeProducto = (prod) => {
        const prodExistenteEnCarrito = productosAniadidos.find((p) => p.id===prod.id)
        if(prodExistenteEnCarrito){
            const prodsActualizados = productosAniadidos.map((p) => (
                p.id===prod.id && p.cantidad>0 ? {...p, cantidad: p.cantidad-1} : p))
            setProductosAniadidos(prodsActualizados)
        }
    }

    const precioTotalCarrito = () => {
        let precioTotal=0
        productosAniadidos.map((p) => (
            precioTotal+=p.cantidad*p.precio
        ))
        return precioTotal
    }

    const actualizarMensaje = () => {
        let texto=""
        if (precioTotalCarrito()>100){
            texto="Estás comprando más de la cuenta"
        }
        setMensaje(texto)
    }

    useEffect(() => {
        actualizarMensaje();
    }, [productosAniadidos])
        
       return(
        <>

        <ul>
            <h1>Listado de productos</h1>
            {productos.map((p) => 
            <li key={p.id}>
                <h2>Producto: {p.nombre}</h2>
                <p>Descripción: {p.descripcion}</p>
                <p>Precio: {p.precio} €</p>
                <button onClick={() => aniadirProductoAlCarrito(p)}>Añadir al carrito</button>
                <button onClick={() => eliminarProducto(p)}>Eliminar el producto del listado</button>
            </li>
            
        )}
        </ul>

        <>
        <h1>Productos añadidos al carrito:</h1>
        <h2>Coste total: {precioTotalCarrito()} €</h2>
        {mensaje &&<h2 className="mensaje">{mensaje}</h2>}
        <ul>
        {productosAniadidos.map((p) => 
            <li key={p.id}>
                <ProductoUnitarioEnCarrito  
                                            prod={p} 
                                            handlerAumentar={aumentarUnidadEnCarrito} 
                                            handlerDisminuir={quitarUnaUnidadDeProducto}
                                            ></ProductoUnitarioEnCarrito>
            </li>
        )}
        </ul>
        </>

        </>

       );

}

export default Productos;