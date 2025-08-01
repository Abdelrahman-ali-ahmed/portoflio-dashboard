import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase"; // Adjust path
import type { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

export const useLinks = () => {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingComponenet, setLoadingComponenet] = useState(false);
  const [form, setForm] = useState({ name: "", url: "" });
  const [editId, setEditId] = useState<string | null>(null);
 const getLinks = () => {
  setLoadingComponenet(true);
  const q = query(collection(db, "links"), orderBy("createdAt", "desc"));

  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLinks(data);
    setLoadingComponenet(false); // ✅
  });

  return unsub;
};


  useEffect(() => {
    
    const unsub = getLinks();
    return () => unsub();
  }, []);

  const addLink = async () => {
    if (!form.name.trim() || !form.url.trim()) return alert("Fill all fields");

    setLoading(true);
    try {
      if (editId) {
        const docRef = doc(db, "links", editId);
        await updateDoc(docRef, {
          name: form.name,
          url: form.url,
        });
        setEditId(null);
      } else {
        await addDoc(collection(db, "links"), {
          name: form.name,
          url: form.url,
          value: false,
          createdAt: serverTimestamp(),
        });
      }

      setForm({ name: "", url: "" });
    } catch (error) {
      console.error("Add/Edit link error:", error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (link: any) => {
    setForm({ name: link.name, url: link.url });
    setEditId(link.id);
  };

  const deleteLink = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    await deleteDoc(doc(db, "links", id));
  };
  const editLink = async () => {
  if (!editId) return;

  const docRef = doc(db, "links", editId);
  await updateDoc(docRef, {
    name: form.name,
    url: form.url,
  });
  setEditId(null);
  setForm({ name: "", url: "" });
};


  const updateValue = async (id: string) => {
    try {
      const snapshot = await getDocs(collection(db, "links"));
      const updates = snapshot.docs.map((docSnap) => {
        const docRef = doc(db, "links", docSnap.id);
        const isActive = docSnap.id === id;
        return updateDoc(docRef, { value: isActive });
      });
      await Promise.all(updates);
    } catch (error) {
      console.error("Error updating value:", error);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };
const isDark = useSelector((state: RootState ) => state.dark.value);

return {
  form,
  setForm,
  links,
  loading,
  addLink,
  deleteLink,
  editLink,      // ✅ Add this line
  updateValue,
  formatDate,
  startEdit,
  loadingComponenet,
  editId,
  isDark,
  setEditId,
};
};