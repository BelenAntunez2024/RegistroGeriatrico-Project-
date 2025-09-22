import React, { useState } from "react";
import type { Medicamento, Residente } from "../services/residents";
import { addMedicamento, deleteMedicamento } from "../services/residents";

type Props = {
  residente: Residente;
  onUpdate: (res: Residente) => void; // para actualizar en App.tsx
};

const MedicamentosList: React.FC<Props> = ({ residente, onUpdate }) => {
  const [nombre, setNombre] = useState("");
  const [dosis, setDosis] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [horarios, setHorarios] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoMed: Medicamento = {
      id: Date.now().toString(), // generamos un id simple
      nombre,
      dosis,
      frecuencia,
      horario: horarios.split(",").map((h) => h.trim()),
      observaciones,
    };

    try {
      const updatedRes = await addMedicamento(residente.id, nuevoMed);
      onUpdate(updatedRes); // avisamos al padre que cambió
      setNombre("");
      setDosis("");
      setFrecuencia("");
      setHorarios("");
      setObservaciones("");
    } catch (err) {
      alert("Error al agregar medicamento");
    }
  };

  const handleDelete = async (medId: string) => {
    if (!confirm("¿Eliminar este medicamento?")) return;
    try {
      const updatedRes = await deleteMedicamento(residente.id, medId);
      onUpdate(updatedRes);
    } catch (err) {
      alert("Error al eliminar medicamento");
    }
  };

  return (
    <div style={{ border: "1px solid gray", padding: "1rem", marginTop: "1rem" }}>
      <h3>Medicamentos de {residente.nombre}</h3>

      {/* Formulario */}
      <form onSubmit={handleAdd}>
        <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input placeholder="Dosis" value={dosis} onChange={(e) => setDosis(e.target.value)} required />
        <input placeholder="Frecuencia" value={frecuencia} onChange={(e) => setFrecuencia(e.target.value)} required />
        <input placeholder="Horarios (ej: 08:00,20:00)" value={horarios} onChange={(e) => setHorarios(e.target.value)} />
        <input placeholder="Observaciones" value={observaciones} onChange={(e) => setObservaciones(e.target.value)} />
        <button type="submit">Agregar</button>
      </form>

      {/* Lista */}
      {residente.medicamentos.length === 0 ? (
        <p>No hay medicamentos cargados.</p>
      ) : (
        <ul>
          {residente.medicamentos.map((m) => (
            <li key={m.id}>
              <strong>{m.nombre}</strong> — {m.dosis} ({m.frecuencia})
              <button onClick={() => handleDelete(m.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicamentosList;
