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
import type { Project } from "../../../types/types";

export const useData = () => {
  const [dataItems, setDataItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [loadingComponent, setLoadingComponent] = useState(false);
  const isDark = useSelector((state: RootState) => state.dark.value);

  const fixedCategories = [
    "All",
    "Html + Css",
    "Html + js + Css",
    "React",
    "React + vite",
    "Next",
  ];

  // Fetch data and apply sort
  useEffect(() => {
    setLoadingComponent(true);

    const q = query(collection(db, "data"), orderBy("createdAt", sort));
    const unsub = onSnapshot(q, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        ...(doc.data() as Project),
        id: doc.id,
      }));

      setDataItems(result);
      setLoadingComponent(false);
    });

    return () => unsub();
  }, [sort]);

  // Delete document from Cloudinary + Firestore
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

        const formData = new FormData();
        formData.append("public_id", publicId);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp.toString());
        formData.append("signature", signature);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await res.json();
        console.log("Cloudinary delete response:", result);
      }

      await deleteDoc(doc(db, "data", id));
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Derived data — apply filter to dataItems
  const filteredItems =
    filter === "All"
      ? dataItems
      : dataItems.filter((item) => item.category === filter);

  return {
    dataItems: filteredItems, // return filtered data
    deleteData,
    loading,
    isDark,
    fixedCategories,
    loadingComponent,
    filter,
    setFilter,
    sort,
    setSort,
  };
};
