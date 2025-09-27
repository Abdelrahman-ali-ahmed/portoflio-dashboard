import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import type { ExperienceType } from "../../../types/types";


export const addLocation = async (location: Omit<ExperienceType, "id">): Promise<void> => {
  await addDoc(collection(db, "Experiences"), location);
};
export const getExperiences = async (): Promise<ExperienceType[]> => {
  const querySnapshot = await getDocs(collection(db, "Experiences"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<ExperienceType, "id">),
  }));
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