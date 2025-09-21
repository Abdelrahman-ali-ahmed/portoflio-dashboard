// src/hooks/useAdd.ts
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../redux/store";
import { useNavigate } from "react-router-dom";

export const useAdd = () => {
  const [form, setForm] = useState({
    title: { ar: "", eng: "" },
    content: { ar: "", eng: "" },
    liveLink: "",
    src:"",
    category: "",
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const isDark = useSelector((state: RootState) => state.dark.value);
 const navigate=useNavigate()
  // Upload image to Cloudinary
const uploadToCloudinary = async (): Promise<{ url: string; public_id: string }> => {
  if (!form.image) throw new Error("No image selected");

  const formData = new FormData();
  formData.append("file", form.image);

  // Safer unique public_id
  const folderPath = `data/${form.category}`;
  const publicId = `${form.title.eng.trim().replace(/\s+/g, "_")}_${Date.now()}`;

  formData.append("upload_preset", "unsigned_upload");
  formData.append("folder", folderPath);
  formData.append("public_id", publicId);

  const res = await fetch("https://api.cloudinary.com/v1_1/dfe962gp1/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error?.message || "Upload failed");

  return {
    url: data.secure_url,
    public_id: data.public_id,
  };
};


  // Add data to Firestore
  const addData = async () => {
    if (!form.title.eng || !form.title.ar || !form.content.eng || !form.content.ar || !form.category || !form.image|| !form.liveLink ||!form.src ) {
      alert("Please fill all fields and select an image");
      return;
    }

    setLoading(true);
    try {
      const uploadResult = await uploadToCloudinary();

      await addDoc(collection(db, "data"), {
        title: form.title,
        content: form.content,
        category: form.category,
        liveLink: form.liveLink,
        src:form.src,
        imageUrl: uploadResult.url,
        publicId: uploadResult.public_id, // 👈 Save this!
        createdAt: serverTimestamp(),
      });

      setForm({
        title: { ar: "", eng: "" },
        content: { ar: "", eng: "" },
        liveLink: "",
        src:"",
        category: "",
        image: null,
      });
      alert("Added successfully");
      navigate(-1)
    } catch (err) {
      console.error(err);
      alert("Failed to add data");
    } finally {
      setLoading(false);
    }
  };

  return { form, setForm, addData, loading, isDark };
};
