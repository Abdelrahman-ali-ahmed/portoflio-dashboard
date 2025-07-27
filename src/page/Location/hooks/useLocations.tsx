import { useEffect, useState } from "react";
import { addLocation, deleteLocation, getLocations, updateLocation } from "./CRUDFireBase";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import type { LocationType } from "../../../types/types";


export default function useLocations() {
const [locations, setLocations] = useState<LocationType[]>([]);
  const [form, setForm] = useState({ name: "", address: "", mapLink: "" });
const [editId, setEditId] = useState<string | null>(null); // ✅
// 👈 Track the id being edited
  const isDark = useSelector((state: RootState) => state.dark.value);

  const loadLocations = async () => {
    const data = await getLocations();
  setLocations(data as LocationType[]);
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleSubmit = async () => {
    if (editId) {
      await updateLocation(editId, form);
      setEditId(null); // Reset after editing
    } else {
      await addLocation(form);
    }

    setForm({ name: "", address: "", mapLink: "" });
    loadLocations();
  };

  const handleDelete = async (id:string) => {
    await deleteLocation(id);
    loadLocations();
  };

  return {
    locations,
    setLocations,
    form,
    setForm,
    isDark,
    handleSubmit,
    handleDelete,
    setEditId, 
    editId,  // 👈 expose this
  };
}
