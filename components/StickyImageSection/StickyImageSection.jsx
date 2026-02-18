import { useRef, useEffect } from 'react';

const StickyImageSection = ({ children, imgSrc, imgAlt, chapterId, chapterNumber, stickyTitle, stickySubtitle }) => {
  const imgRef = useRef(null);
  const chapterRef = useRef(null);
  const stickyTextRef = useRef(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    const chapterElement = chapterRef.current;
    const stickyTextElement = stickyTextRef.current;
    if (!imgElement || !chapterElement) return;

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const rect = chapterElement.getBoundingClientRect();

      // Progress is 0 when chapter top is at bottom of viewport, 1 when at top.
      let progress = 1 - rect.top / viewportHeight;
      progress = Math.max(0, Math.min(1, progress)); // Clamp progress between 0 and 1

      const scale = 1.1 + progress * 0.15; // Scale from 1.1 to 1.25
      imgElement.style.transform = `scale(${scale})`;

      // Effect for the sticky text fade-out on scroll-over
      if (stickyTextElement) {
        // Move text up and fade it out as the content scrolls over.
        const textProgress = Math.min(1, progress * 2); // Effect completes when content is halfway up
        const translateY = -textProgress * 100; // Move up by 100px
        const opacity = 1 - textProgress; // Fade out
        stickyTextElement.style.transform = `translateY(${translateY}px)`;
        stickyTextElement.style.opacity = opacity;
      }
    };

    // Use requestAnimationFrame for performance
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

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial call to set position

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []); // Dependencies are empty as this effect manages its own state via refs

  return (
    <div className="sticky-chapter-container">
      <section className="avadh-parallax-wrapper">
        <div className="sticky-bg">
          <img ref={imgRef} src={imgSrc} alt={imgAlt} className="parallax-img" loading="lazy" />
          <div className="parallax-overlay"></div>
          {stickyTitle &&
            <div className="sticky-text-content" ref={stickyTextRef}>
              {stickySubtitle && <h6 className="sticky-subtitle">{stickySubtitle}</h6>}
              <h2 className="sticky-title">{stickyTitle}</h2>
            </div>}
        </div>
      </section>
      <section id={chapterId} className="chapter" data-chapter={chapterNumber} ref={chapterRef}>
        {children}
      </section>
    </div>
  );
};

export default StickyImageSection;