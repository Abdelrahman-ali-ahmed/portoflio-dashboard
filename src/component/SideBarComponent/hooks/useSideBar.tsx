import { FaDatabase, FaHandshake, FaLocationDot } from 'react-icons/fa6';
import {  IoShareSocialSharp } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
import { MdOutlineDarkMode } from 'react-icons/md';
import { CiFolderOn } from 'react-icons/ci';
import { IoMdHome } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import type { RootState } from '../../../redux/store';
import { auth } from '../../../firebase/firebase';
import { changeDark } from '../../../redux/slices/darkSlice';
import { changeLogin } from '../../../redux/slices/loginSlice';
import { changeRole } from '../../../redux/slices/roleSlice';
import { changeOpen } from '../../../redux/slices/openSlice';

export default function useSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const open = useSelector((state: RootState) => state.open.value);
  const dark = useSelector((state: RootState) => state.dark.value);
  const login = useSelector((state: RootState) => state.login.value);
  const role = useSelector((state: RootState) => state.role.value);

  const setOpen = () => dispatch(changeOpen());

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(changeLogin());
      dispatch(changeRole(""));
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
console.log(role);
const Menus = [
  { title: "Home", icon: <IoMdHome />, onclick: () => navigate("/home") },
  { title: "Cvs", icon: <CiFolderOn />, onclick: () => navigate("/cvs") },
  { title: "Data", icon: <FaDatabase /> ,onclick: () => navigate("/data") },
  { title: "Contact", icon: <IoShareSocialSharp />, onclick: () => navigate("/contact") },
  { title: "Experience", icon: <FaLocationDot />, onclick: () => navigate("/experience") },
  { title: "customer", icon: <FaHandshake />, onclick: () => navigate("/customer") },
  {
    title: dark ? "Lightmode" : "Darkmode",
    icon: <MdOutlineDarkMode />,
    onclick: () => dispatch(changeDark()),
  },
  {
    title: "Logout",
    icon: <LuLogOut />,
    onclick: handleLogout,
  },
];


 

  return { open, setOpen, dark, login, Menus, location};
}
