import { collection, addDoc,  doc, updateDoc, deleteDoc, getDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import type { ExperienceType } from "../../../types/types";


export const addLocation = async (location: Omit<ExperienceType, "id">): Promise<void> => {
  await addDoc(collection(db, "Experiences"), location);
};
export const getExperiences = (
  sort: "asc" | "desc",
  setExperiences: (data: ExperienceType[]) => void
) => {
  const q = query(collection(db, "Experiences"), orderBy("createdAt", sort));

  const unsub = onSnapshot(q, (snapshot) => {
    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ExperienceType, "id">),
    }));

    setExperiences(result);
  });

  return unsub;
};


export const updateLocation = async (
  id: string,
  updatedData: Partial<Omit<ExperienceType, "id">>
): Promise<void> => {
  const locationRef = doc(db, "Experiences", id);
  await updateDoc(locationRef, updatedData);
};
export const deleteLocation = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, "Experiences", id));
};

export const getExperienceById = async (id: string): Promise<ExperienceType | null> => {
  const docRef = doc(db, "Experiences", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...(docSnap.data() as Omit<ExperienceType, "id">),
    };
  } else {
    return null;
  }
};