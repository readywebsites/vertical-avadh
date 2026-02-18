import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SustainabilityCSR.css'; // Assuming you have a CSS file for additional styles

const SustainabilityCSR = () => {
  const cardRef = useRef(null);
  const bgRef = useRef(null);
  const [currentCsrIndex, setCurrentCsrIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Placeholder data for CSR activities - to be replaced by API data later
  const csrActivities = [
    {
      id: 1,
      title: "Education & Empowerment",
      description: "We believe in the power of education to transform lives. Our initiatives focus on providing scholarships, building school infrastructure, and supporting vocational training programs for underprivileged youth.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Community Healthcare",
      description: "Ensuring access to quality healthcare is a priority. We organize free medical camps, blood donation drives, and support local hospitals to improve community health standards.",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Environmental Stewardship",
      description: "Beyond our green building practices, we actively participate in tree plantation drives, waste management awareness campaigns, and water conservation projects.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const nextCsrSlide = () => {
    setDirection(1);
    setCurrentCsrIndex((prev) => (prev + 1) % csrActivities.length);
  };

  const prevCsrSlide = () => {
    setDirection(-1);
    setCurrentCsrIndex((prev) => (prev - 1 + csrActivities.length) % csrActivities.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  // Auto-change slide every 3 seconds
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        nextCsrSlide();
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [currentCsrIndex, isPaused]);

  useEffect(() => {
    const card = cardRef.current;
    const bg = bgRef.current;
    if (!card || !bg) return;

    const handleScroll = () => {
      const rect = card.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Only animate when in view (with some buffer)
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const speed = 0.15;
        const yOffset = (rect.top - viewportHeight * 0.5) * speed;
        bg.style.transform = `translateY(${yOffset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="sustainability-csr-section" id="chapter-responsibility">
      <div className="cascading-container">
        {/* Component 1: Environmental Efforts */}
        <div className="cascade-card green-card fade-in" ref={cardRef} style={{ padding: 0, overflow: 'hidden' }}>
          {/* Parallax Wrapper */}
          <div ref={bgRef} style={{ position: 'absolute', top: '-10%', left: 0, width: '100%', height: '120%', zIndex: 0 }}>
            <div
              className="env-bg"
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: 'url("../../src/assets/images/scroll-images/04-enviromental-bg.webp")', // Replace with actual image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Dark Overlay */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.64)' }}></div>
            </div>
          </div>

          <div className="card-content env-content">
            <h2 className="slide-in-left">Environmental Efforts & Sustainability</h2>
            <div className="env-separator slide-in-left" data-delay="0.2"></div>
            <p className="slide-in-right" data-delay="0.4">
              At Avadh, we are committed to building a greener tomorrow. Our projects integrate sustainable design principles, energy-efficient technologies, and expansive green landscapes. We prioritize health and well-being by creating eco-friendly environments that breathe life into concrete structures.
            </p>
          </div>
        </div>

        {/* Component 2: CSR Activity */}
        <div 
          className="cascade-card csr-card fade-in"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="card-content csr-content-wrapper">
            <div className="csr-header">
              <h2>CSR Initiatives</h2>
              <div className="csr-nav-buttons">
                <button className="csr-nav-btn" onClick={prevCsrSlide} aria-label="Previous slide">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="csr-nav-btn" onClick={nextCsrSlide} aria-label="Next slide">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
            
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div 
                key={currentCsrIndex}
                className="csr-carousel-content"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
              <div className="csr-image-container">
                <img 
                  src={csrActivities[currentCsrIndex].image} 
                  alt={csrActivities[currentCsrIndex].title} 
                  className="csr-image"
                />
              </div>
              <div className="csr-text-container">
                <h3 className="csr-title">{csrActivities[currentCsrIndex].title}</h3>
                <p className="csr-description">
                  {csrActivities[currentCsrIndex].description}
                </p>
                <div className="csr-dots">
                  {csrActivities.map((_, idx) => (
                    <span 
                      key={idx}
                      onClick={() => setCurrentCsrIndex(idx)}
                      className={`csr-dot ${idx === currentCsrIndex ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityCSR;