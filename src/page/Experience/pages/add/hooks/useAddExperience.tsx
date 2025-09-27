import { useRef } from 'react'
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../../redux/store';
import useExperience from '../../../hooks/useExperiences';

export default function useAddExperience() {
      const startRef = useRef<HTMLInputElement | null>(null);
  const endRef = useRef<HTMLInputElement | null>(null);
  const isDark = useSelector((state: RootState) => state.dark.value);
    const {
      form,
      setForm,
      handleSubmit,
      loadingComponenet,
      editId,
      navigate,
      setLoadingComponenet,
    } = useExperience();

  const inputClass = `${
    isDark
      ? "bg-black/90 text-white placeholder-gray-300 border-gray-600"
      : "bg-white text-black placeholder-gray-600 border-gray-300"
  } border p-2 rounded-md w-full`;

  const openPicker = (ref: typeof startRef) => {
    const el = ref.current;
    if (!el) return;
    // Preferred modern API:
    if (typeof (el as any).showPicker === "function") {
      try {
        (el as any).showPicker();
        return;
      } catch {
        /* fall through to focus/click fallback */
      }
    }
    // Fallbacks:
    el.focus();
    // some browsers may open on click
    try {
      el.click();
    } catch {}
  };
  return {
          form,
      setForm,
      handleSubmit,
      loadingComponenet,
      editId,
      navigate,
      setLoadingComponenet,
    startRef,
    endRef,
    isDark,
    inputClass,
    openPicker,
  };
}
