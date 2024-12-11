import React from "react";
import { useState } from "react";

const PRODUCTOS =["manzana", "pera", "melocotón"];

function Buscador() {
    
    const [listaFiltrada, setListaFiltrada]= useState(PRODUCTOS);
    
    const filtrar = (termino, lista) =>
    {
        let aux=[];
        lista.forEach(element => 
        {
            if(element.indexOf(termino)>=0)
            {
                aux=[...aux,element];
            }

        });
    setListaFiltrada(aux);
    }

    
return( 
    <div>
        <input type="text" onChange={e=> filtrar(e.target.value, PRODUCTOS)}></input>
        <h3>Lista productos</h3>
        <ul>
            {listaFiltrada.map((element) => <li>{element}</li>)}
        </ul>
    </div>
    );
}

export default Buscador;