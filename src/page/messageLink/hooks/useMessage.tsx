import { useEffect, useState } from "react";
import type { RootState } from "../../../redux/store";
import { fetchMessageLinkData } from "./fetchMessageLinkData";
import { updateMessageLinktData } from "./updateMessageLinktData";
import { useSelector } from "react-redux";
import type { MessageForm } from "../../../types/types";


export default function useMessage() {
  const [form, setForm] = useState<MessageForm>({ link: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const isDark = useSelector((state: RootState) => state.dark.value);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMessageLinkData();
        if (data) setForm(data as MessageForm);
      } catch {
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
      await updateMessageLinktData(form);
      setSuccess("Contact info updated successfully");
    } catch {
      setError("Failed to update contact info");
    } finally {
      setSaving(false);
    }
  };

  return { form, handleChange, handleSave, saving, loading, error, success, isDark };
}
