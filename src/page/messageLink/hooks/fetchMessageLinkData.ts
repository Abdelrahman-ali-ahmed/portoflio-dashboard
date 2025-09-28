import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export async function fetchMessageLinkData() {
  try {
    const ref = doc(db, "messageLink", "link");
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data();
    } else {
      console.warn("No messageLink data found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching messageLink data:", error);
    return null;
  }
}
