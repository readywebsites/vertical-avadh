import { useEffect, useRef } from "react";

/**
 * Custom hook to enable drag-to-scroll functionality on a container element.
 * @param {React.RefObject<HTMLElement>} scrollContainerRef - Ref to the scrollable container.
 */
const useDragToScroll = (scrollContainerRef) => {
  // Use a ref to hold mutable values that don't trigger re-renders
  const state = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    velX: 0,
    lastTime: 0,
    lastX: 0,
    momentumID: null,
  });

  useEffect(() => {
    const slider = scrollContainerRef.current;
    if (!slider) return;

    const cancelMomentum = () => {
      if (state.current.momentumID) {
        cancelAnimationFrame(state.current.momentumID);
        state.current.momentumID = null;
      }
    };

    const momentumLoop = () => {
      if (!slider) return;

      // Apply velocity
      slider.scrollLeft += state.current.velX;

      // Apply friction
      state.current.velX *= 0.95;

      // Continue if velocity is significant
      if (Math.abs(state.current.velX) > 0.5) {
        state.current.momentumID = requestAnimationFrame(momentumLoop);
      } else {
        state.current.velX = 0;
      }
    };

    const handleMouseDown = (e) => {
      state.current.isDown = true;
      slider.classList.add("active"); // This class can be used for styling (e.g., changing cursor)
      state.current.startX = e.pageX - slider.offsetLeft;
      state.current.scrollLeft = slider.scrollLeft;

      // Reset velocity tracking
      state.current.lastX = e.pageX;
      state.current.lastTime = Date.now();
      state.current.velX = 0;

      cancelMomentum();
    };

    const handleMouseLeave = () => {
      if (state.current.isDown) {
        state.current.isDown = false;
        slider.classList.remove("active");
        momentumLoop();
      }
    };

    const handleMouseUp = () => {
      if (state.current.isDown) {
        state.current.isDown = false;
        slider.classList.remove("active");
        momentumLoop();
      }
    };

    const handleMouseMove = (e) => {
      if (!state.current.isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - state.current.startX) * 1.5; // The multiplier '1.5' makes scrolling faster
      slider.scrollLeft = state.current.scrollLeft - walk;

      // Calculate velocity
      const now = Date.now();
      const dt = now - state.current.lastTime;
      const dx = e.pageX - state.current.lastX;

      if (dt > 0) {
        // Invert dx because dragging left moves scroll right
        const newVel = -(dx / dt) * 15;
        state.current.velX = newVel * 0.8 + state.current.velX * 0.2; // Simple smoothing
      }

      state.current.lastX = e.pageX;
      state.current.lastTime = now;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);

    // Cleanup function to remove event listeners
    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
      cancelMomentum();
    };
  }, [scrollContainerRef]); // The dependency array is correct. The effect depends on the ref object itself.
};

export default useDragToScroll;
