// src/hooks/useData.ts
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export const useData = () => {
  const [dataItems, setDataItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "data"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataItems(result);
    });

    return () => unsub();
  }, []);

const deleteData = async (id: string, publicId?: string) => {
  if (!window.confirm("Are you sure?")) return;
  setLoading(true);
  try {
    // 🔁 1. Delete image from Cloudinary if publicId is available
    if (publicId) {
      const cloudName = "dfe962gp1";
      const timestamp = Math.floor(Date.now() / 1000);
      const apiKey = "764583652425529";
      const apiSecret = "ruw8RfhA6XdpPKgb3-NiW5hYLvU";

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

    // 🔁 2. Delete the Firestore document
    await deleteDoc(doc(db, "data", id));
  } catch (err) {
    console.error("Delete failed:", err);
  } finally {
    setLoading(false);
  }
};

const generateSHA1 = async (message: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
};


  return { dataItems, deleteData, loading };
};
