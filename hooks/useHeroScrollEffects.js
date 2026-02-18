import { useEffect } from "react";

/**
 * Custom hook to manage scroll-based effects for the Hero component.
 * 1. Zooms the background videos on scroll.
 * 2. Fades out the scroll indicator on scroll.
 * @param {React.RefObject<HTMLVideoElement[]>} videosRef - Ref to the array of video elements.
 * @param {React.RefObject<HTMLDivElement>} scrollIndicatorRef - Ref to the scroll indicator element.
 */
const useHeroScrollEffects = (videosRef, scrollIndicatorRef) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 1. Hero Zoom Effect on video
      if (scrollY <= window.innerHeight) {
        const scale = 1 + scrollY * 0.0005;
        videosRef.current.forEach((video) => {
          if (video) {
            video.style.transform = `scale(${scale})`;
          }
        });
      }

      // 2. Scroll Indicator Fade
      if (scrollIndicatorRef.current) {
        const opacity = Math.max(0, 1 - scrollY / 300);
        scrollIndicatorRef.current.style.opacity = opacity;
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial call to set positions

    return () => window.removeEventListener("scroll", onScroll);
  }, [videosRef, scrollIndicatorRef]); // Effect dependencies
};

export default useHeroScrollEffects;
