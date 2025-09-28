import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export async function updateMessageLinktData(data: {
link:string;
}) {
  const ref = doc(db, "messageLink", "link");
  await setDoc(ref, data, { merge: true });
}
