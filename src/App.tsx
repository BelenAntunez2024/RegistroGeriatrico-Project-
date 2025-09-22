//import React from "react";
import { useEffect, useState } from "react";
import ResidentList from "./components/ResidenteList";
import ResidentForm from "./components/ResidentForm";
import type { Residente } from "./services/residents";
import { getResidentes } from "./services/residents";
import "./index.css";

function App() {
  const [residentes, setResidentes] = useState<Residente[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar residentes desde MockAPI al iniciar
  useEffect(() => {
    (async () => {
      try {
        const data = await getResidentes();
        setResidentes(data);
      } catch (error) {
        console.error("Error al cargar residentes:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Agregar un nuevo residente
  const handleAdd = (nuevo: Residente) => {
    setResidentes((prev) => [...prev, nuevo]);
  };

  // Eliminar un residente
  const handleDelete = (id: string) => {
    setResidentes((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) return <p>Cargando residentes...</p>;

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
      <header>
        <h1>Geriátrico San Andres </h1> 
        <h2>Administración de Medicamentos </h2>
      </header>

      <main>
        {/* Formulario arriba */}
        <ResidentForm onAdd={handleAdd} />

        {/* Lista abajo */}
        <ResidentList
        residentes={residentes}
        onDelete={handleDelete}
        onUpdate={(updated) => {
          setResidentes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
          }} 
        />
    </main>
  </div>
  );
}

export default App;
