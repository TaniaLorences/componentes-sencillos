import React, { useEffect, useState } from "react";
import UnidadNoticia from "./UnidadNoticia";

function ListaNoticias(){
    const[noticias, setNoticias] = useState([]);
    const[noticiasGuardadas, setNoticiasGuardadas] = useState([]);

    const fetchNoticias = async() => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();
            setNoticias(data);
        } catch (error) {
            console.log("Error al obtener las noticias",error);
        }
    }

    useEffect(() => {
        fetchNoticias();
    }, [])

    const guardarNoticias = (cosaAGuardar) => {
        setNoticiasGuardadas([...noticiasGuardadas, cosaAGuardar]);
    }

    return (
    <>
        <>
        <h1>Lista de todas las noticias</h1>
        {noticias.map((cosa) => (
            <UnidadNoticia key={cosa.id} noti={cosa} alGuardar={guardarNoticias}></UnidadNoticia>
        ))}
        </>
                
        <>
        <h1>Lista de las noticias guardadas</h1>
        {noticiasGuardadas.map((cosa) => (
            <UnidadNoticia key={cosa.id} noti={cosa}></UnidadNoticia>
        ))}
        </>
    </>
    )

}

export default ListaNoticias;