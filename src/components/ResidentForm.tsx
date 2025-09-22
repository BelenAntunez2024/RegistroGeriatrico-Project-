import React, { useState } from "react";
import { addResidente } from "../services/residents";
import type { Residente } from "../services/residents";

interface ResidentFormProps {
  onAdd: (res: Residente) => void;
}

const ResidentForm: React.FC<ResidentFormProps> = ({ onAdd }) => {
  // Estado para los campos del formulario
  const [editData, setEditData] = useState({
    nombre: "",
    edad: 0,
    contacto: "",
  });

  // Estados de feedback
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  // Handler de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.type === "number"
        ? Number(e.target.value)
        : e.target.value,
    });
  };

  // Handler de envío de formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!editData.nombre.trim() || !editData.edad || !editData.contacto.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (editData.edad <= 0) {
      setError("La edad debe ser mayor a 0");
      return;
    }

    // Si pasa validaciones → POST
    const nuevoResidente: Residente = {
      id: Date.now().toString(),
      nombre: editData.nombre,
      edad: editData.edad,
      contactoFamiliar: editData.contacto,
      medicamentos: [],
    };

    try {
      const res = await addResidente(nuevoResidente);
      onAdd(res);

      // Reiniciar estado
      setEditData({ nombre: "", edad: 0, contacto: "" });
      setError("");
      setExito("Residente agregado correctamente");
      setTimeout(() => setExito(""), 3000);
    } catch (err) {
      console.error("Hubo un error al agregar un nuevo residente", err);
      setError("Ocurrió un error al guardar el residente");
    }
  };

  return (
    <>

      <form className="RegistroPaciente" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre Completo</label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre Completo"
          value={editData.nombre}
          onChange={handleChange}
        />

        <label htmlFor="edad">Edad del Residente</label>
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={editData.edad}
          onChange={handleChange}
        />

        <label htmlFor="contacto">Contacto Familiar</label>
        <input
          type="text"
          name="contacto"
          placeholder="Contacto Familiar"
          value={editData.contacto}
          onChange={handleChange}
        />

        <button type="submit">Agregar Paciente</button>

        {/* Mensajes de feedback */}
        {error && (
          <div className="message-sent" style={{ color: "red", marginTop: "10px" }}>
            <h3>{error}</h3>
          </div>
        )}
        {exito && (
          <div className="message-sent" style={{ color: "green", marginTop: "10px" }}>
            <h3>{exito}</h3>
          </div>
        )}
      </form>
    </>
  );
};

export default ResidentForm;
