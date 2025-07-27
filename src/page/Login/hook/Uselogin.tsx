import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { changeRole } from "../../../redux/slices/roleSlice";
import { changeLogin } from "../../../redux/slices/loginSlice";
import { useNavigate } from "react-router-dom";


export default function Uselogin() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate=useNavigate()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const role=useSelector((state: RootState  ) => state.role.value);
   const lo=useSelector((state: RootState  ) => state.login.value);

const dispatch=useDispatch()

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const userRef = doc (db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        dispatch(changeRole(data.role))
        dispatch(changeLogin())
        navigate("/home")
      } else {
        alert("Login successful, but user role not found.");
      }
    } catch (err: any) {
       console.error("Login Error:", err.code, err.message);
  setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    {email, setEmail, password, setPassword, error, setError, loading, setLoading, handleLogin, role, lo, dispatch, navigate}
  )
}
