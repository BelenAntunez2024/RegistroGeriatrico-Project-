import React, { useState } from "react";
import type { Residente } from "../services/residents";
import MedicamentosList from "./MedicamentoList";

type Props = {
  residentes: Residente[];
  onDelete: (id: string) => void;
  onUpdate: (updated: Residente) => void;
};

const ResidentList: React.FC<Props> = ({ residentes, onDelete, onUpdate }) => {
  const [mostrarLista, setMostrarLista] = useState(false);
  const [abierto, setAbierto] = useState<string | null>(null);

  const toggleMedicamentos = (id: string) =>
    setAbierto((prev) => (prev === id ? null : id));

  if (residentes.length === 0) {
    return <p>No hay residentes cargados.</p>;
  }

  return (
    <div>
      {/* Encabezado general */}
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
        }}
        onClick={() => setMostrarLista(!mostrarLista)}
      >
        <button type="button">
          {mostrarLista ? "▼" : "▶"}
        </button>
        Listado de pacientes
      </h2>

      {/* Lista completa */}
      {mostrarLista && (
        <ul>
          {residentes.map((r) => (
            <li key={r.id} style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                   <img src={ r.genero === "femenino" 
                   ? `https://randomuser.me/api/portraits/women/${parseInt(r.id) % 90}.jpg`     
                   : `https://randomuser.me/api/portraits/men/${parseInt(r.id) % 90}.jpg`}
                   alt={`Foto de ${r.nombre}`} style={{
                   borderRadius: "50%",
                   width: "60px",
                   height: "60px",
                   objectFit: "cover",
                   border: "2px solid #a3c9a8",
                   }}/>

                  <button type="button" onClick={() => toggleMedicamentos(r.id)}>
                    {abierto === r.id ? "▼" : "▶"}
                  </button>
                  <span>
                    {r.nombre} ({r.edad})
                  </span>
                </div>

                <button type="button" onClick={() => onDelete(r.id)}>
                  Eliminar
                </button>
              </div>

              {/* Desplegable de medicamentos */}
              {abierto === r.id && (
                <div className="medicamentos-box">
                  <MedicamentosList residente={r} onUpdate={onUpdate} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResidentList;


