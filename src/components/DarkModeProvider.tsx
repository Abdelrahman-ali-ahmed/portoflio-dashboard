import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const isDark = useSelector((state: RootState) => state.dark.value);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return <>{children}</>;
}


