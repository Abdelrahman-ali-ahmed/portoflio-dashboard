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
import { generateSHA1 } from "../../../component/generateSHA1/generateSHA1";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export const useData = () => {
  const [dataItems, setDataItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingComponent, setLoadingComponent] = useState(false);
  const isDark=useSelector((state: RootState) => state.dark.value);
  useEffect(() => {
    setLoadingComponent(true);
    const q = query(collection(db, "data"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataItems(result);
      setLoadingComponent(false);
    });

    return () => unsub();
  }, []);

const deleteData = async (id: string, publicId?: string) => {
  if (!window.confirm("Are you sure?")) return;
  setLoading(true);
  try {
    if (publicId) {
      const cloudName = "dfe962gp1";
      const timestamp = Math.floor(Date.now() / 1000);
      const apiKey = "764583652425529";
      const apiSecret = "ruw8RfhA6XdpPKgb3-NiW5hYLvU";

      const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
      const signature = await generateSHA1(stringToSign);
console.log(publicId);

      const formData = new FormData();
      formData.append("public_id", publicId);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log("Cloudinary delete response:", result);
    }

    // 2. Delete from Firestore
    await deleteDoc(doc(db, "data", id));
  } catch (err) {
    console.error("Delete failed:", err);
  } finally {
    setLoading(false);
  }
};





  return { dataItems, deleteData, loading,isDark,loadingComponent };
};
