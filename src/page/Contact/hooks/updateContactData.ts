import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export async function updateContactData(data: {
  whatsapp: string;
  linkedin: string;
  email: string;
  phone: string;
  facebook: string;
  instagram: string;
}) {
  const ref = doc(db, "content", "contact");
  await setDoc(ref, data, { merge: true });
}
