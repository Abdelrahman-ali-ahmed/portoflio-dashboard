import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import "./index.css";

export default function Loading() {
  const isDark = useSelector((state: RootState) => state.dark.value);
  return (
    <div className="loader"  style={{
        background: isDark ? "#ffffff" : "#000", // white in dark mode, blue in light
      }}></div>
  );
}
