import React from "react";
import { useEffect } from "react";

function UserProfile({name}){

    useEffect(() => {
        document.title= "Página de "+name;
    }, [name])

    return (
        <p>Página de {name}</p>
    )
}

export default UserProfile;