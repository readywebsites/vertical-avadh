import { useEffect, useRef, useCallback } from "react";

/**
 * A performant hook to detect the currently active "chapter" on scroll.
 * It uses requestAnimationFrame to throttle scroll events, ensuring smooth performance.
 *
 * @param {function(number): void} setActiveChapter - The state setter function to update the active chapter number.
 */
const useActiveChapter = (setActiveChapter) => {
  const ticking = useRef(false);
  const chapterElements = useRef([]);

  // Memoize the calculation function to avoid re-creating it on every render.
  const calculateActiveChapter = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    // Cache chapter elements on first run to avoid expensive DOM queries on every scroll.
    if (chapterElements.current.length === 0) {
      chapterElements.current = Array.from(
        document.querySelectorAll(".chapter"),
      );
    }

    let currentChapter = 1;
    for (const chapter of chapterElements.current) {
      const chapterTop = chapter.offsetTop;
      const chapterBottom = chapterTop + chapter.offsetHeight;

      if (scrollPosition >= chapterTop && scrollPosition < chapterBottom) {
        currentChapter =
          parseInt(chapter.getAttribute("data-chapter"), 10) || 1;
        break; // Found the active chapter, no need to continue looping.
      }
    }

    setActiveChapter(currentChapter);
    ticking.current = false;
  }, [setActiveChapter]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(calculateActiveChapter);
        ticking.current = true;
      }
    };

    handleScroll(); // Initial check in case the user loads in the middle of the page.
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [calculateActiveChapter]);
};

export default useActiveChapter;
