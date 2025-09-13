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
    instagram: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isDark = useSelector((state: RootState) => state.dark.value);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchContactData();
        if (data) setForm(data as ContactFormType);
      } catch (err) {
        setError("Failed to load contact data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await updateContactData(form);
      setSuccess("Contact info updated successfully");
    } catch (err) {
      setError("Failed to update contact info");
    } finally {
      setSaving(false);
    }
  };

  return { form, handleChange, handleSave, saving, loading, error, success, isDark };
}
