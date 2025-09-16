
export type Medicamento = {
    id?: string;
    nombre: string;
    dosis:string;
    frecuencia: string;
    horario: string;
    observacion?: string;
    stock: number;
}
export type Residente = {
  id?: string;
  nombre: string;
  edad: number;
  contactoFamiliar?: string;
  medicamentos?: Medicamento[];
};    

 const API_BASE = import.meta.env.VITE_API_URL;

export const getRedidentes = async (): Promise<Residente[]> => {
    const res = await fetch (`${API_BASE}/residents`);
    if (!res.ok) throw new Error(`Error al obtener residentes: ${res.status}`);
    return res.json();
};

export const getRedidenteById = async (id:string): Promise<Residente> => {
    const res = await fetch  (`${API_BASE}/residents/${id}`);
    if (!res.ok) throw new Error (`Error al obtener al residente ${id}: ${res.status}`);
    return res.json();
}

export const addResidente = async (payload: Residente) =>{
    const res = await fetch  (`${API_BASE}/residents`,{
     method: "POST",
     headers: {"Content-Type": "application/json"},
     body: JSON.stringify(payload),
    });
    if(!res.ok) throw new Error (`Error al crear al residente: ${res.status}`);
    return res.json();
}

export const updateResidente = async (id: string, payload: Partial<Residente>) => {
    const res = await fetch (`${API_BASE}/residents/${id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
    });
    if(!res.ok) throw new Error (`Error al actualizar al residente: ${res.status}`);
    return res.json();
}

export const deleteResidente = async (id:string) =>{
    const res = await fetch (`${API_BASE}/residents/${id}`, {method: "DELETE"});
    if (!res.ok ) throw new Error (`Error al borrar al residente: ${res.status}`)
        return;
}

//Helpers para medicamentos (Si los guardas en el objeto residente)
export const addMedicamentoResidente = async (resId: string, med: Medicamento) =>{
    const residente = await getRedidenteById(resId);
    const meds = residente.medicamentos ? [...residente.medicamentos, med] : [med];
    return updateResidente(resId,{medicamentos:meds});

}