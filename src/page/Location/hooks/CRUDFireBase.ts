import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import type { LocationType } from "../../../types/types";
 // adjust path as needed

// Add location (no id when adding)
export const addLocation = async (location: Omit<LocationType, "id">): Promise<void> => {
  await addDoc(collection(db, "locations"), location);
};

// Get all locations
export const getLocations = async (): Promise<LocationType[]> => {
  const querySnapshot = await getDocs(collection(db, "locations"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<LocationType, "id">),
  }));
};

// Update location
export const updateLocation = async (
  id: string,
  updatedData: Partial<Omit<LocationType, "id">>
): Promise<void> => {
  const locationRef = doc(db, "locations", id);
  await updateDoc(locationRef, updatedData);
};

// Delete location
export const deleteLocation = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, "locations", id));
};
