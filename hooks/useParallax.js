import { useEffect, useCallback } from "react";

/**
 * A custom hook to apply a parallax scroll effect to elements.
 * @param {string} selector - The CSS selector for the elements to apply the effect to.
 * @param {object} options - Configuration options.
 * @param {number} [options.minWidth=1130] - The minimum window width to enable the effect.
 */
const useParallax = (selector, options = {}) => {
  const { minWidth = 1130 } = options;

  const updateParallax = useCallback(() => {
    const parallaxLayers = document.querySelectorAll(selector);
    if (parallaxLayers.length === 0) return;

    // If window is smaller than minWidth, reset transforms and exit
    if (window.innerWidth < minWidth) {
      parallaxLayers.forEach((layer) => {
        if (layer.style.transform !== "translateY(0px)") {
          layer.style.transform = "translateY(0px)";
        }
      });
      return;
    }

    const scrollTop = window.pageYOffset;
    parallaxLayers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.speed);
      if (!isNaN(speed)) {
        const yPos = -(scrollTop * speed);
        layer.style.transform = `translateY(${yPos}px)`;
      }
    });
  }, [selector, minWidth]);

  useEffect(() => {
    let ticking = false;
    const handleEvent = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateParallax(); // Initial call to set positions
    window.addEventListener("scroll", handleEvent, { passive: true });
    window.addEventListener("resize", handleEvent);

    return () => {
      window.removeEventListener("scroll", handleEvent);
      window.removeEventListener("resize", handleEvent);
    };
  }, [updateParallax]); // Re-run effect if the update function changes
};

export default useParallax;
