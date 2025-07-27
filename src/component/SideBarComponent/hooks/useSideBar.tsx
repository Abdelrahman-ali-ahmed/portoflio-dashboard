import { useState } from 'react'
import { FaHandshake, FaLocationDot } from 'react-icons/fa6';
import { IoSettingsOutline, IoShareSocialSharp } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
import { MdOutlineDarkMode } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';
import { changeDark } from '../../../redux/slices/darkSlice';
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { changeLogin } from '../../../redux/slices/loginSlice';
import { changeRole } from '../../../redux/slices/roleSlice';
import { CiFolderOn } from 'react-icons/ci';
import { RiAccountBoxLine } from 'react-icons/ri';
import { IoMdHome } from 'react-icons/io';
import { changeOpen } from '../../../redux/slices/openSlice';

export default function useSideBar() {
  const open = useSelector((state: RootState) => state.open.value);
  const setOpen = () => {
    dispatch(changeOpen());
  };
   const dark = useSelector((state: RootState) => state.dark.value);
   const login = useSelector((state: RootState) => state.login.value);
   const role = useSelector((state: RootState) => state.role.value);
   const dispatch=useDispatch()
   const navigate = useNavigate();
    const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(changeLogin ())
      dispatch(changeRole   (""))
      navigate("/"); // Go back to login
    } catch (error) {
      console.error("Error logging out:", error);
    }}
  const Menus = [
    { title: "home",icon:<IoMdHome />},
    { title: "Accounts",icon:<RiAccountBoxLine />},
    { title: "Files", icon:<CiFolderOn  />  },
    { title: "Setting",icon:<IoSettingsOutline /> },
    { title: "Contact", icon : <IoShareSocialSharp />},
    { title: "Location",icon : <FaLocationDot />},
    { title: "customer",    icon : <FaHandshake /> },
        { title: dark?"Lightmode":"Darkmode", src: "icon" ,icon : <MdOutlineDarkMode   /> ,onclick:()=>dispatch(changeDark   ())},
        { title: "Logout", src: "icon" ,icon : <LuLogOut /> ,onclick:()=>handleLogout()},

  ];
  return (
 {open, setOpen, dark, login, dispatch, Menus}
  )
}
