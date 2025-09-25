import { useEffect, useState } from "react";
import ResidentList from "./components/ResidenteList";
import ResidentForm from "./components/ResidentForm";
import type { Residente } from "./services/residents";
import { getResidentes, deleteResidente } from "./services/residents"; // <- IMPORTAR delete
import "./index.css";

function App() {
  const [residentes, setResidentes] = useState<Residente[]>([]);
  const [loading, setLoading] = useState(true);

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

  // DELETE: llamar al servicio y actualizar estado
  const handleDelete = async (id: string) => {
    try {
      console.log("Solicitando eliminación de id:", id);
      await deleteResidente(id); // si tu servicio devuelve algo distinto, ajustá
      setResidentes((prev) => prev.filter((r) => String(r.id) !== String(id)));
    } catch (err) {
      console.error("Error al eliminar residente:", err);
      alert("No se pudo eliminar el residente. Revisa la consola o la Red.");
    }
  };

  const handleAdd = (nuevo: Residente) => setResidentes((p) => [...p, nuevo]);
  const handleUpdate = (updated: Residente) =>
    setResidentes((p) => p.map((r) => (String(r.id) === String(updated.id) ? updated : r)));

  if (loading) return <p>Cargando residentes...</p>;

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
      <header>
        <h1>Geriátrico San Andres</h1>
        <h2>Administración de Medicamentos</h2>
      </header>

      <main>
        <ResidentForm onAdd={handleAdd} />
        <ResidentList
          residentes={residentes}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </main>
    </div>
  );
}

export default App;
