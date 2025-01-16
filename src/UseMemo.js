import React from "react";
import { useMemo } from "react";

function Calculadora({num1, num2}){

    // equivale a pasar solo "props" en function Calculadora(props) {}
    // const {num1, num2} = props

    const resultado = useMemo(() => {
        return num1+num2;
    }, [num1, num2])

    return(
        <p>La suma de {num1} más {num2} es {resultado}</p>
    )

}

export default Calculadora;
