import React, { useEffect, useState } from "react";
import {  getResidentes, deleteResidente, type Residente, } from "../services/residents";
import MedicamentosList from "./MedicamentoList";

const ResidentList: React.FC = () => {
  const [residentes, setResidentes] = useState<Residente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getResidentes();
        setResidentes(data);
      } catch (err) {
        console.error("Error al traer residentes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteResidente(id);
    setResidentes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleUpdateResidente = (updated: Residente) => {
    setResidentes((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <ul>
      {residentes.map((r) => (
        <li key={r.id} style={{ marginBottom: "1rem" }}>
          <div>
            {r.nombre} ({r.edad})
            <button onClick={() => handleDelete(r.id)}>Eliminar</button>
          </div>

          {/* 👇 Acá mostramos medicamentos del residente */}
          <MedicamentosList residente={r} onUpdate={handleUpdateResidente} />
        </li>
      ))}
    </ul>
  );
};

export default ResidentList;
