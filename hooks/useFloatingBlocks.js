import { useEffect } from "react";

const useFloatingBlocks = (sectionId) => {
  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const blocks = section.querySelectorAll(".floating-block");
    if (blocks.length === 0) return;

    let ticking = false;

    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = section.getBoundingClientRect();
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          blocks.forEach((block, index) => {
            const depth = (index + 1) * 0.03;
            const moveX = (mouseX - centerX) * depth;
            const moveY = (mouseY - centerY) * depth;
            block.style.setProperty("--mouse-x", `${moveX}px`);
            block.style.setProperty("--mouse-y", `${moveY}px`);
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    section.addEventListener("mousemove", handleMouseMove);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
    };
  }, [sectionId]);
};

export default useFloatingBlocks;
