// hooks/useCustomer.ts
import { useEffect, useState } from "react";
import { uploadToCloudinary } from "./uploadToCloudinary";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase"; // adjust if different path
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import type { CustomerType } from "../../../types/types";

export const useCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
 const isDark=useSelector((state: RootState) => state.dark.value);
const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage =5

const getCustomers = () => {
  const q = query(collection(db, "customers"), orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data: CustomerType[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      logo: doc.data().logo ?? "",
      createdAt: doc.data().createdAt?.toDate?.() ?? null,
    }));
    setCustomers(data);
  });

  return unsubscribe;
};

useEffect(() => {
  const unsub = getCustomers();
  return () => unsub();
}, []);

  const addCustomer = async (name: string, file: File | null) => {
    setLoading(true);
    try {
      let logoUrl = "";
      if (file) {
        logoUrl = await uploadToCloudinary(file, name.toLowerCase().replace(/\s/g, "-"));
      }

      await addDoc(collection(db, "customers"), {
        name,
        logo: logoUrl,
        createdAt: serverTimestamp(),
      });

      return { success: true };
    } catch (error) {
      console.error("Error adding customer:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

const deleteCustomer = async (customerId: string) => {
  setLoading(true);
  try {
    await deleteDoc(doc(db, "customers", customerId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting customer:", error);
    return { success: false, error };
  } finally {
    setLoading(false);
  }
};
const updateCustomer = async (
  customerId: string,
  name: string,
  file: File | null
) => {
  setLoading(true);
  try {
    let logoUrl = "";
    if (file) {
      logoUrl = await uploadToCloudinary(file, name.toLowerCase().replace(/\s/g, "-"));
    }

    const updatePayload: any = { name };
    if (logoUrl) updatePayload.logo = logoUrl;

    await updateDoc(doc(db, "customers", customerId), updatePayload);
    return { success: true };
  } catch (error) {
    console.error("Error updating customer:", error);
    return { success: false, error };
  } finally {
    setLoading(false);
  }
};
  const [form, setForm] = useState({ name: "" });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!form.name.trim()) return alert("Enter a name");
    const result = await addCustomer(form.name, file);
    if (result.success) {
      alert("Customer saved!");
      setForm({ name: "" });
      setFile(null);
    }
  };

  const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm("Are you sure you want to delete?");
  if (!confirmDelete) return;

  const result = await deleteCustomer(id);
  if (result.success) alert("Deleted!");
};

const handleUpdate = async (id: string) => {
  const result = await updateCustomer(id, form.name, file); // ✅ use state
  if (result.success) alert("Updated!");
};




  const paginated = customers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const startEditing = (customer: any) => {
    setEditingId(customer.id);
    setForm({ name: customer.name });
  };

  const handleEditSubmit = async () => {
    if (!editingId) return;
    await handleUpdate(editingId);
    setEditingId(null);
setForm({ name: "" });
setFile(null);
  };

  return {
  addCustomer,
  deleteCustomer,
  updateCustomer,
  loading,
  form,
  setForm,
  file,
  setFile,
  handleSubmit,
  handleDelete,
  handleUpdate,
  customers,
  paginated,
  page,
  setPage,
  itemsPerPage,
  startEditing,
  isDark,
  editingId,
  handleEditSubmit,
};
};
