import { useEffect, useState } from "react";
import { fetchContactData } from "./fetchContactData";
import { updateContactData } from "./updateContactData";
import type { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import type { ContactFormType } from "../../../types/types";

export default function useContact() {

const [form, setForm] = useState<ContactFormType>({
  whatsapp: "",
  linkedin: "",
  email: "",
  phone: "",
  facebook: "",
  instagram: ""
});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
const isDark = useSelector((state: RootState) => state.dark.value);
  useEffect(() => {
    const load = async () => {
      const data = await fetchContactData();
     if (data) setForm(data as ContactFormType);
      setLoading(false);
    };
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await updateContactData(form);
    setSaving(false);
    alert("Contact info updated");
  };
  return (
   { form, handleChange, handleSave, saving, loading, isDark     }
  )
}
