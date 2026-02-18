import { useEffect, useRef, Fragment } from 'react';
import styles from './Hero.module.css';
import useHeroScrollEffects from "../../hooks/useHeroScrollEffects.js";
import heroVideo from "../../src/assets/video/hero/Avadh_Menorca_edit.mp4";

// Helper component for the text reveal animation
const AnimatedText = ({ text, initialDelay }) => {
  let charIndex = 0;
  const words = text.split(' ');

  return words.map((word, wordIndex) => (
    <Fragment key={wordIndex}>
      <span className={styles.word}>
        {word.split('').map((char, i) => (
          <span key={i} className={styles.char} style={{ animationDelay: `${initialDelay + charIndex++ * 0.05}s` }}>
            {char}
          </span>
        ))}
      </span>
      {/* Add a regular space for natural line breaks between words */}
      {wordIndex < words.length - 1 && ' '}
    </Fragment>
  ));
};

const Hero = () => {
  const videosRef = useRef([]);
  const scrollIndicatorRef = useRef(null);

  // Data for the single slide.
  const slideData = {
    video: heroVideo,
    title: "A New Era of Living",
    subtitle: "Welcome to Avadh",
    youtubeLink: "https://www.youtube.com/watch?v=your_video_id_here" // TODO: Replace with your actual YouTube video link
  };

  // Effect to play the video of the active slide
  useEffect(() => {
    const video = videosRef.current[0];
    if (video) {
      video.currentTime = 0;
      video.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, []);

  // ===== SCROLL-BASED EFFECTS (ZOOM & FADE) HOOK =====
  useHeroScrollEffects(videosRef, scrollIndicatorRef);

  return (
    <section id="chapter-1" className={`chapter ${styles.heroSection}`} data-chapter="1">
      <div className={`${styles.heroSlide} ${styles.active}`}>
        <video
          ref={el => videosRef.current[0] = el}
          className={styles.heroVideo}
          src={slideData.video}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.textRevealContainer}>
            <h1 className={styles.heroTitle}>
              <AnimatedText text={slideData.title} initialDelay={0.5} />
            </h1>
          </div>
          <div className={styles.textRevealContainer}>
            <p className={styles.heroSubtitle}>
              <AnimatedText text={slideData.subtitle} initialDelay={0.7} />
            </p>
          </div>
          <div className={styles.ctaContainer}>
            <a
              href={slideData.youtubeLink}
              className={styles.watchVideoButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-play-circle"></i>
              <span>Watch Full Video</span>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator} ref={scrollIndicatorRef}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;