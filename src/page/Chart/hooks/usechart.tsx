// src/hooks/useData.ts
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import type { Project } from "../../../types/types";

export default function useChart() {
     const [dataItems, setDataItems] = useState< Project[]>([]);
  const [loadingComponent, setLoadingComponent] = useState(false);
  const isDark=useSelector((state: RootState) => state.dark.value);
  const fixedCategories = [
  "Html + Css",
  "Html + js + Css",
  "React",
  "React + vite",
  "Next",

];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
  useEffect(() => {
    setLoadingComponent(true);
    const q = query(collection(db, "data"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
    const result = snapshot.docs.map((doc) => ({
  ...(doc.data() as Project),
  id: doc.id, // This will overwrite any existing id from Firestore data
}));
      setDataItems(result);
      setLoadingComponent(false);
    });

    return () => unsub();
  }, []);

  return { dataItems,isDark,loadingComponent,fixedCategories,COLORS };
}
