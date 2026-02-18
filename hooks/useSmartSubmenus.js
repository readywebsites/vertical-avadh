import { useEffect } from "react";

const useSmartSubmenus = () => {
  useEffect(() => {
    const nestedTriggers = document.querySelectorAll(".has-nested-submenu");
    if (nestedTriggers.length === 0) return;

    const handleMouseEnter = function () {
      const submenu = this.querySelector(".nested-submenu");
      if (submenu) {
        submenu.classList.remove("open-left");
        const rect = submenu.getBoundingClientRect();
        if (rect.right > window.innerWidth - 20) {
          submenu.classList.add("open-left");
        }
      }
    };

    nestedTriggers.forEach((trigger) => {
      trigger.addEventListener("mouseenter", handleMouseEnter);
    });

    return () => {
      nestedTriggers.forEach((trigger) => {
        trigger.removeEventListener("mouseenter", handleMouseEnter);
      });
    };
  }, []); // Empty dependency array, runs once on mount
};

export default useSmartSubmenus;
