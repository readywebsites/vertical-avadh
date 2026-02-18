import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutBgImage from '../../src/assets/about-us/about-us-back-01.webp';
import styles from './AboutSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const maskLayerRef = useRef(null);
  const contentRevealRef = useRef(null); // Renamed for clarity
  const bgImageRef = useRef(null);
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px) and (orientation: portrait)");

    const handleMediaChange = (e) => {
      setIsMobilePortrait(e.matches);
    };

    // Initial check
    handleMediaChange(mediaQuery);

    // Listener for changes
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    
    // gsap.context() provides a safe way to create animations that will be
    // automatically cleaned up when the component unmounts.
    const ctx = gsap.context(() => {
      // Performance optimization: hint browser about changes to prevent hiccups
      gsap.set(maskLayerRef.current, { willChange: "transform, opacity" });
      gsap.set(bgImageRef.current, { willChange: "transform" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%', // Reduced scroll distance for better mobile pacing
          scrub: 0.5, // Reduced scrub time for snappier response on touch
          pin: true, // Pins the section while the animation is active
          anticipatePin: 1,
        },
      });

      // Parallax effect: Move background image slightly as mask opens
      tl.fromTo(bgImageRef.current, {
          scale: 1.25, // Scale up slightly to prevent edges showing during movement
          y: -50, // Start slightly shifted up
        }, {
          y: 50, // Move down as scroll progresses
          ease: 'none',
          duration: 2, // Sync with mask expansion duration
        }, 0);

      // 1. Animate the section corners to become sharp as it locks in place.
      tl.to(section, {
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
          duration: 0.5,
          ease: 'power1.out',
        },
        0
      )
      // 2. Scale the mask layer up to reveal the background image.
      .to(maskLayerRef.current, {
          scale: 25,
          // Using a more reasonable scale. 150 is excessive and can harm animation
          // pacing. A value around 25 is enough for all screen sizes and gives a better feel scale: 25.
          ease: 'power2.inOut',
          duration: 2,
        },
        0
      )
      // 3. Fade out the mask layer after it has expanded to remove any gradient artifacts.
      .to(maskLayerRef.current, {
          opacity: 0,
          duration: 0.5,
        },
        '-=0.5', // Start 0.5s before the previous animation ends
      )
      // 4. Fade in the text content.
      .fromTo( 
        contentRevealRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '<0.25' // Start slightly after the mask starts revealing
      );
    }, section); // Scope animations to the section element

    // The context's revert() method handles all cleanup automatically on unmount
    return () => ctx.revert();
  }, []);

  return (
    // The main section is pinned. We can remove overflow:hidden here because we'll handle it on a child container for better isolation.
    <section id="chapter-2" className={`chapter ${styles.aboutSection}`} ref={sectionRef}>
      {/* This container acts as the boundary for the animation, clipping the reveal effect. */}
      <div className={styles.aboutMaskContainer}>
        <img
          ref={bgImageRef}
          className={styles.aboutBg}
          src={aboutBgImage}
          alt="About Us Background"
          loading="lazy"
          decoding="async"
        />
        <div ref={maskLayerRef} className={styles.aboutMaskLayer} style={{ willChange: 'transform' }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
            shapeRendering="optimizeSpeed"
            textRendering="optimizeSpeed"
          >
            <defs>
              <mask id="mask-a">
                <rect width="100%" height="100%" fill="white" />
                <text
                  x="50%"
                  y="50%"
                  fontFamily="'Cormorant Garamond', serif"
                  fontWeight="700"
                  fontSize="150"
                  textAnchor="middle"
                  dy=".35em"
                  fill="black"
                  textRendering="optimizeSpeed"
                  transform={
                    isMobilePortrait
                      ? 'translate(500 500) scale(1.35) translate(-500 -500)'
                      : undefined
                  }
                >
                  {isMobilePortrait ? (
                    <>
                      <tspan x="50%" dy="-2.25em">A</tspan>
                      <tspan x="50%" dy="1.35em">V</tspan>
                      <tspan x="50%" dy="1.35em">A</tspan>
                      <tspan x="50%" dy="1.35em">D</tspan>
                      <tspan x="50%" dy="1.35em">H</tspan>
                    </>
                  ) : (
                    "AVADH"
                  )}
                </text>
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="#f9f7f2" mask="url(#mask-a)" />
          </svg>
        </div>
        <div className={`${styles.aboutContentReveal} ${styles.textContentWhite}`} ref={contentRevealRef}>
          <div className={`content-wrapper centered ${styles.aboutTextContainer}`}>
            <h6 className="chapter-subtitle">About Avadh Group</h6>
            <h2 className="chapter-title">Where Luxury Meets <span className="highlight">Legacy</span></h2>
            <p className="section-paragraph">
              With a distinguished legacy of over 25 years, we stand at the forefront of premium property development, redefining the way India lives. From Surat to Ahmedabad, we craft living experiences that embody sophistication, innovation, and timeless elegance.
            </p>
            <div className={styles.aboutValuesGrid}>
              <div className={styles.valueItem}>
                <h4>Our Vision</h4>
                <p>To contribute meaningfully to the development of a modern society by delivering world-class amenities with affordability and accessibility.</p>
              </div>
              <div className={styles.valueItem}>
                <h4>Our Mission</h4>
                <p>To create world-class real estate guided by the highest standards of quality, integrity, and ethics, enhancing the quality of life for everyone who inhabits our spaces.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;