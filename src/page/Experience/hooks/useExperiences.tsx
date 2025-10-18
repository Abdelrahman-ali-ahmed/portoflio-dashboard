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
const[loadingComponenet, setLoadingComponenet] = useState(false);
const[error,setError] = useState<any>(null);
const navigate=useNavigate()
const [editId, setEditId] = useState<string | null>(null); // ✅
// 👈 Track the id being edited
  const isDark = useSelector((state: RootState) => state.dark.value);

  const loadExperience = async () => {
    const data = await getExperiences();
    console.log(data);
    
  setExperiences(data as ExperienceType[]);
  };

  useEffect(() => {
    setLoadingComponenet(true);
    try {
      loadExperience();
    } catch (e ) {
      setError(e)
    }finally{
      setLoadingComponenet(false);
    }
    
  }, []);

  const handleSubmit = async () => {
    setLoadingComponenet(true);
    try {
      if (editId) {
      await updateLocation(editId, {...form,createdAt:serverTimestamp()});
      setEditId(null); // Reset after editing
    } else {
      await addLocation({ ...form,createdAt:serverTimestamp() });
    } 
    } catch (erro) {
      setError(erro)
    }finally{
      setLoadingComponenet(false);
      navigate(-1);
    }
    
    setForm({ name: "", field: "", place: "",startDate:"",endDate:"",isPresent:false });
    loadExperience();
  };

  const handleDelete = async (id:string) => {
    await deleteLocation(id);
    loadExperience();
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
    error,
    setEditId, 
    navigate,
    editId,  // 👈 expose this
  };
}
