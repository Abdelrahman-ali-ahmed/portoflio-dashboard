import { Outlet } from 'react-router-dom'
import SideBar from '../component/SideBarComponent/SideBar'
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';


export default function MainLayout() {
  const isDark = useSelector((state: RootState) => state.dark.value);

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className={`flex-1 p-7  ${isDark?"bg-[#111827] text-white":"bg-white text-blue-500 "} `}>
        <Outlet />
      </div>
    </div>
  )
}
