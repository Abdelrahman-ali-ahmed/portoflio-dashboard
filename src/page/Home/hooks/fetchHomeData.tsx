import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase"; // adjust path if needed

export async function fetchHomeData() {
  try {
    const docRef = doc(db, "content", "home");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // should have { title: {...}, content: {...} }
    } else {
      console.warn("No data found in /content/home.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
}
