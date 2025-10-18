import { useEffect, useState } from "react";
import { addLocation, deleteLocation, getExperiences, updateLocation } from "./CRUDFireBase";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import type { ExperienceType } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";

export default function useExperience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [form, setForm] = useState({
    name: "",
    field: "",
    place: "",
    startDate: "",
    endDate: "",
    isPresent: false,
  });
  const [loadingComponenet, setLoadingComponenet] = useState(false);
  const [filter, setFilter] = useState<"All" | "Present" | "Not Present">("All");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [error, setError] = useState<any>(null);
  const [editId, setEditId] = useState<string | null>(null);

  const isDark = useSelector((state: RootState) => state.dark.value);
  const navigate = useNavigate();

  // ✅ Real-time listener with sorting + filtering
  useEffect(() => {
    setLoadingComponenet(true);

    try {
      const unsub = getExperiences(sort, (data) => {
        const filteredData =
          filter === "All"
            ? data
            : data.filter((exp) => exp.isPresent === (filter === "Present"));

        setExperiences(filteredData);
        setLoadingComponenet(false);
      });

      return () => unsub();
    } catch (e) {
      console.error(e);
      setError(e);
      setLoadingComponenet(false);
    }
  }, [sort, filter]);

  // ✅ Add / Edit
  const handleSubmit = async () => {
    setLoadingComponenet(true);
    try {
      if (editId) {
        await updateLocation(editId, form);
        setEditId(null);
      } else {
        await addLocation({ ...form, createdAt: serverTimestamp() });
      }
      navigate(-1);
    } catch (err) {
      setError(err);
    } finally {
      setForm({
        name: "",
        field: "",
        place: "",
        startDate: "",
        endDate: "",
        isPresent: false,
      });
      setLoadingComponenet(false);
    }
  };

  // ✅ Delete
  const handleDelete = async (id: string) => {
    setLoadingComponenet(true);
    try {
      await deleteLocation(id);
    } catch (err) {
      setError(err);
    } finally {
      setLoadingComponenet(false);
    }
  };

  return {
    experiences,
    setExperiences,
    form,
    setForm,
    isDark,
    handleSubmit,
    handleDelete,
    loadingComponenet,
    setLoadingComponenet,
    filter,
    setFilter,
    sort,
    setSort,
    error,
    setEditId,
    editId,
    navigate,
  };
}
