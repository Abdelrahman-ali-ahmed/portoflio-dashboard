import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim"; // load the slim package
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

export default function NetworkAnimation() {
  const [init, setInit] = useState(false);
  const isDark = useSelector((state: RootState) => state.dark.value);
   const isMobile = useMediaQuery({ maxWidth: 956 });
  const isDesktop = useMediaQuery({ minWidth: 1023 });
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // load only slim features
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
   <Particles
  id="tsparticles"
  className="absolute inset-0 z-0"   // fills container & behind content
  options={{
    background: { color: "transparent" },
    particles: {
      number: { value:isMobile? 50 : isDesktop? 150 : 100 },
      color: { value:isDark? "#fff" : "#000" },
      links: {
        enable: true,
        color: isDark? "#fff" : "#000",
        distance: 150,
        opacity: 0.8,
        width: 2,
      },
      move: { enable: true, speed: 4.5 },
      size: { value: 5 },
      opacity: { value: 0.5 },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: false, mode: "push" },
      },
      modes: {
        repulse: { distance: 100 },
        push: { quantity: 4 },
      },
    },
  }}
/>

  );
}
