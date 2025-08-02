import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../../../../../redux/store";
import { useEffect, useState } from "react";
import { db } from "../../../../../firebase/firebase";


export default function useEditData() {
    const fixedCategories = [
  "Counter",
  "Chairs",
  "Complete Sets",
  "Manager's Desk",
  "Employee Desk",
  "Meeting Table",
  "Catering Table",
  "Workstation",
  "Storage Unit",
];
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isDark = useSelector((state: RootState) => state.dark.value);
  const [loadingComponent, setLoadingComponent] = useState(false);
  const [form, setForm] = useState({
    title: { eng: "", ar: "" },
    content: { eng: "", ar: "" },
    category: "",
    imageUrl: "",
    publicId: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        setLoadingComponent(true);
      const ref = doc(db, "data", id!);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setForm({
          title: data.title,
          content: data.content || { eng: "", ar: "" },
          category: data.category,
          imageUrl: data.imageUrl,
          publicId: data.publicId,
        });
      }
      setLoadingComponent(false);
    };
    fetchData();
  }, [id]);

  const deleteOldImageFromCloudinary = async (publicId: string) => {
    const cloudName = "dfe962gp1";
    const apiKey = "764583652425529";
    const apiSecret = "ruw8RfhA6XdpPKgb3-NiW5hYLvU";
    const timestamp = Math.floor(Date.now() / 1000);
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;

    const generateSHA1 = async (message: string) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(message);
      const hash = await crypto.subtle.digest("SHA-1", data);
      return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    };

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
  };

  const uploadToCloudinary = async (): Promise<{ url: string; public_id: string }> => {
    if (!image) throw new Error("No image selected");

    const formData = new FormData();
    formData.append("file", image);

    const folderPath = `data/${form.category}`;
    const publicId = form.title.eng.trim().replace(/\s+/g, "_");

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

 

  const handleUpdate = async () => {
    if (!form.title.eng || !form.category) return alert("Please fill all required fields.");

    setLoading(true);
    try {
      const updateData: any = {
        title: form.title,
        content: form.content,
        category: form.category,
        updatedAt: serverTimestamp(),
      };

      if (image) {
        // delete old image from Cloudinary
        if (form.publicId) {
          await deleteOldImageFromCloudinary(form.publicId);
        }

        const uploadRes = await uploadToCloudinary();
        updateData.imageUrl = uploadRes.url;
        updateData.publicId = uploadRes.public_id;
      }

      await updateDoc(doc(db, "data", id!), updateData);
      alert("Data updated successfully");
      navigate(-1);
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update data");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    image,
    setImage,
    loading,
    navigate,
    loadingComponent,
    handleUpdate,
    isDark,
    fixedCategories,
  };
}
