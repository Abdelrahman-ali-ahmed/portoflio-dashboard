import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export async function fetchContactData() {
  try {
    const ref = doc(db, "content", "contact");
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data();
    } else {
      console.warn("No contact data found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return null;
  }
}
