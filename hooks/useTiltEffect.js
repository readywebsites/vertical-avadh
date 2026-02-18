import { useRef, useEffect } from "react";

const useTiltEffect = () => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      element.style.transition =
        "transform 0.1s ease-out, box-shadow 0.4s ease";
    };

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = (x / rect.width - 0.5) * 2;
      const yPct = (y / rect.height - 0.5) * 2;
      element.style.transform = `perspective(1000px) rotateX(${-yPct * 5}deg) rotateY(${xPct * 5}deg) translateY(-10px)`;
    };

    const handleMouseLeave = () => {
      element.style.transition = "transform 0.4s ease, box-shadow 0.4s ease";
      element.style.transform = "";
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return ref;
};

export default useTiltEffect;
