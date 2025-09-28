import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import type { TechnologyType } from "../../../types/types";
import { generateSHA1 } from "../../../component/generateSHA1/generateSHA1";

export const useTechnology = () => {
  const [form, setForm] = useState({
    name: "",
    image: null as File | null,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [Technologies, setTechnologies] = useState<TechnologyType[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const isDark = useSelector((state: RootState) => state.dark.value);
const cloudName = "dfe962gp1";
const apiKey = "764583652425529";
const apiSecret = "ruw8RfhA6XdpPKgb3-NiW5hYLvU";
  useEffect(() => {
    const q = query(collection(db, "Technologies"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: TechnologyType[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        logo: doc.data().logo ?? "",
        createdAt: doc.data().createdAt?.toDate?.() ?? null,
        publicId: doc.data().publicId ?? "",
      }));
      setTechnologies(data);
    });

    return () => unsubscribe();
  }, []);

  const sanitizeName = (str: string) =>
    str.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

  const uploadToCloudinary = async (): Promise<{ url: string; public_id: string }> => {
    if (!form.image) throw new Error("No image selected");

    const formData = new FormData();
    formData.append("file", form.image);

    const folderPath = `data/Technology`;
    const publicId = sanitizeName(form.name);

    formData.append("upload_preset", "unsigned_upload");
    formData.append("folder", folderPath);
    formData.append("public_id", publicId);

    const res = await fetch("https://api.cloudinary.com/v1_1/dfe962gp1/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Upload failed");

    return { url: data.secure_url, public_id: data.public_id };
  };

  const addTechnology = async () => {
    if (!form.name || !form.image) return alert("Please fill all fields");

    setLoading(true);
    try {
      const { url, public_id } = await uploadToCloudinary();

      await addDoc(collection(db, "Technologies"), {
        name: form.name,
        logo: url,
        publicId: public_id,
        createdAt: serverTimestamp(),
      });

      setForm({ name:"", image: null });
      alert("Technology added successfully");
    } catch (err) {
      console.error("Add error:", err);
      alert("Failed to add Technology");
    } finally {
      setLoading(false);
    }
  };

  const deleteTechnology = async (id: string) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;

    setLoading(true);
    try {
      const ref = doc(db, "Technologies", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const { publicId } = snap.data();
        if (publicId) {
          const timestamp = Math.floor(Date.now() / 1000);
          const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
          const signature = await generateSHA1(stringToSign);

          const formData = new FormData();
          formData.append("public_id", publicId);
          formData.append("api_key", apiKey);
          formData.append("timestamp", timestamp.toString());
          formData.append("signature", signature);

          await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
            method: "POST",
            body: formData,
          });
        }
      }

      await deleteDoc(ref);
      alert("Deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete Technology");
    } finally {
      setLoading(false);
    }
  };

 const updateTechnology = async () => {
  if (!editingId || !form.name) return alert("Missing data");

  setLoading(true);
  try {
    const ref = doc(db, "Technologies", editingId);
    const existingSnap = await getDoc(ref);
    const existingData = existingSnap.data();
    let updatePayload: any = { name: form.name };

    if (form.image) {
      // delete old image from Cloudinary
      if (existingData?.publicId) {
        const timestamp = Math.floor(Date.now() / 1000);
        const stringToSign = `public_id=${existingData.publicId}&timestamp=${timestamp}${apiSecret}`;
        const signature = await generateSHA1(stringToSign);

        const formData = new FormData();
        formData.append("public_id", existingData.publicId);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp.toString());
        formData.append("signature", signature);

        await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
          method: "POST",
          body: formData,
        });
      }

      // upload new image
      const { url, public_id } = await uploadToCloudinary();
      updatePayload.logo = url;
      updatePayload.publicId = public_id;
    }

    await updateDoc(ref, updatePayload);

    alert("Updated successfully");
    setEditingId(null);
    setForm({ name:"", image: null });
  } catch (err) {
    console.error("Update error:", err);
    alert("Failed to update Technology");
  } finally {
    setLoading(false);
  }
};

  const handleSubmit = async () => {
    await addTechnology();
  };

  const setFile = (file: File | null) => {
    setForm((prev) => ({ ...prev, image: file }));
  };

  const startEditing = (Technology: TechnologyType) => {
    setEditingId(Technology.id);
    setForm({ name: Technology.name, image: null });
  };

  const paginated = Technologies.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return {
    form,
    setForm,
    setFile,
    handleSubmit,
    handleEditSubmit: updateTechnology,
   handleDelete: deleteTechnology,
    startEditing,
    Technologies,
    paginated,
    page,
    setPage,
    itemsPerPage,
    loading,
    isDark,
    editingId,
  };
};
