import React from "react";

function Tareas(){
    const listaTareas=["Entrega ejercicio 1", "Otras tareas", "Dormir"];

    return (
        <>
        {listaTareas.map(item => <><input type="checkbox" id="html" name="fav_language" value={item}></input><label>{item}</label><br/></>)}
        </>
    );
};

export default Tareas;