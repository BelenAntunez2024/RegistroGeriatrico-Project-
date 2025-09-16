import React, { useState } from "react";
import { addResidente } from "../services/residents";
import { Residente } from "../services/residents";

type Props = {
    onAdd: ( res:Residente ) => void;
}

const ResidentFrom: React.FC<Props> = ({onAdd}) => {
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState<number>(0);
    const [contacto, setContacto] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoResidente: Residente ={
        nombre,
        edad,
        contactoFamiliar: contacto,
        medicamentos: []
    };
    try{
    const res = await addResidente(nuevoResidente);
    onAdd(res);
    setNombre("");
    setEdad(0);
    setContacto("");
    } catch(error){
        console.error ("Hubo un error al agregar un nuevo residente", error);
    }
};

 return(
    <form onSubmit={handleSubmit} style={{marginBottom: "1rem"}}>
    <h3>Agrega un nuevo Residente</h3>
    <input type="text" 
      placeholder="Nombre Completo"
      value={nombre}    
      onChange={(e) => setNombre(e.target.value)}
      required
    />
    <input type="number" 
      placeholder="Edad"
      value={edad}
      onChange={(e) => setEdad (Number(e.target.value))}
      required
    />
    <input type="text" 
      placeholder="Contacto Familiar"
      value={contacto}
      onChange={(e) => setContacto(e.target.value)}
    />
    </form>
  );
};

export default ResidentFrom;