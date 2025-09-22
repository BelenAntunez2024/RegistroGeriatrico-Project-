export type Medicamento = {
  id: string;
  nombre: string;
  dosis: string;
  frecuencia: string;
  horario: string[]; // ej: ["08:00", "20:00"]
  observaciones: string;
};

export type Residente = {
  id: string;
  nombre: string;
  edad: number;
  contactoFamiliar: string;
  medicamentos: Medicamento[];
};

// Solo usamos el endpoint de Residentes
const API_RESIDENTE = "https://66bfd34242533c40314724f5.mockapi.io/api/Residente";

// -------------------- Residentes --------------------
export const getResidentes = async (): Promise<Residente[]> => {
  const res = await fetch(API_RESIDENTE);
  if (!res.ok) throw new Error(`Error al obtener residentes: ${res.status}`);
  return res.json();
};

export const getResidenteById = async (id: string): Promise<Residente> => {
  const res = await fetch(`${API_RESIDENTE}/${id}`);
  if (!res.ok) throw new Error(`Error al obtener al residente ${id}: ${res.status}`);
  return res.json();
};

export const addResidente = async (payload: Omit<Residente, "id">) => {
  const res = await fetch(API_RESIDENTE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Error al crear al residente: ${res.status}`);
  return res.json();
};

export const updateResidente = async (id: string, payload: Partial<Residente>) => {
  const res = await fetch(`${API_RESIDENTE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Error al actualizar al residente: ${res.status}`);
  return res.json();
};

export const deleteResidente = async (id: string) => {
  const res = await fetch(`${API_RESIDENTE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Error al borrar al residente: ${res.status}`);
  return;
};

// -------------------- Medicamentos dentro de Residente --------------------

// Agregar medicamento a un residente
export const addMedicamento = async (resId: string, med: Omit<Medicamento, "id">) => {
  const residente = await getResidenteById(resId);
  const newMed: Medicamento = { ...med, id: Date.now().toString() };

  const updatedMeds = residente.medicamentos
    ? [...residente.medicamentos, newMed]
    : [newMed];

  return updateResidente(resId, { medicamentos: updatedMeds });
};

// Editar medicamento dentro de un residente
export const updateMedicamentoResidente = async (
  resId: string,
  medId: string,
  data: Partial<Medicamento>
) => {
  const residente = await getResidenteById(resId);
  const updatedMeds = residente.medicamentos.map((m) =>
    m.id === medId ? { ...m, ...data } : m
  );

  return updateResidente(resId, { medicamentos: updatedMeds });
};

// Eliminar medicamento de un residente
export const deleteMedicamento = async (resId: string, medId: string) => {
  const residente = await getResidenteById(resId);
  const updatedMeds = residente.medicamentos.filter((m) => m.id !== medId);

  return updateResidente(resId, { medicamentos: updatedMeds });
};
