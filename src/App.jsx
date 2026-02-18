import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Loader from '../components/Loader/Loader';
import AboutSection from '../components/AboutSection/AboutSection';
import StickyImageSection from '../components/StickyImageSection/StickyImageSection';
import Footer from '../components/Footer/Footer';
import LegacySection from '../components/LegacySection/LegacySection';
import BookVisitSection from '../components/BookVisitSection/BookVisitSection';
import ProjectSection from '../components/ProjectSection/ProjectSection';
import ResidentialSection from '../components/ResidentialSection/ResidentialSection';
import CorporateSection from '../components/CorporateSection/CorporateSection';
import ClubSection from '../components/ClubSection/ClubSection';
import SustainabilityCSR from '../components/SustainabilityCSR/SustainabilityCSR';
import Tilt from '../components/Tilt/Tilt';
import useElementObserver from '../hooks/useElementObserver.js';
import useActiveChapter from '../hooks/useActiveChapter.js';
import useFloatingBlocks from '../hooks/useFloatingBlocks.js';
import useParallax from '../hooks/useParallax.js';
// Import project data sources
import { onGoingProjects, completedProjects } from '../data/residentialProjects.js';
import corporateProjects from '../components/CorporateSection/corporateProjects.js'; // NOTE: Assumes this file exists, similar to clubProjects.js
import clubProjects from '../components/ClubSection/clubProjects.js';
import GetInTouchSection from '../components/GetInTouchSection/GetInTouchSection';
import MediaBlogSection from '../components/MediaBlogSection/MediaBlogSection';
import BlogDetail from '../components/MediaBlogSection/BlogDetail';

const ProjectShowcasePage = lazy(() => import('./pages/PropertyShowcasePage/PropertyShowcasePage'));

// Extract MainContent to ensure hooks re-run when navigating back from BlogDetail
const MainContent = ({ setActiveChapter, onPostClick, onFormSubmit, allProjects }) => {
  // ===== Reusable Logic for Effects =====

  // Generic function to start a typewriter effect on an element
  const startTyping = useCallback((element) => {
    const text = element.getAttribute("data-text");
    if (!text || element.getAttribute('data-typed') === 'true') return;
    
    element.setAttribute('data-typed', 'true');
    let i = 0;
    element.textContent = ""; // Clear content before typing

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, 50);
      }
    }
    type();
  }, []);

  // Generic function to start a counter animation
  const startCounter = useCallback((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    if (isNaN(target) || counter.getAttribute('data-counted') === 'true') return;

    counter.setAttribute('data-counted', 'true');
    const duration = 2000;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4); // Ease-out quart
      counter.innerText = Math.floor(ease * target).toLocaleString();
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        counter.innerText = target.toLocaleString();
      }
    }
    requestAnimationFrame(animation);
  }, []);


  // ===== HOOK-BASED EFFECT INITIALIZATIONS =====

  // 1. Generic fade-in/slide-in animations
  const fadeInCallback = useCallback((entry, observer) => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute("data-delay") || 0;
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, delay * 1000);
      observer.unobserve(entry.target);
    }
  }, []);
  useElementObserver(".fade-in, .slide-in-left, .slide-in-right", fadeInCallback, { threshold: 0.15 });

  // 2. Typewriter effect
  const typewriterCallback = useCallback((entry, observer) => {
    if (entry.isIntersecting) {
      if (!entry.target.hasAttribute("data-text")) {
        entry.target.setAttribute("data-text", entry.target.textContent);
      }
      startTyping(entry.target);
      observer.unobserve(entry.target);
    }
  }, [startTyping]);
  useElementObserver(".typewriter-effect", typewriterCallback, { threshold: 0.5 });

  // 3. Blur-up image loading
  const blurUpCallback = useCallback((entry, observer) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const src = element.getAttribute("data-bg");
      if (src) {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          element.style.backgroundImage = `url('${src}')`;
          element.classList.remove("blur-load");
          element.classList.add("loaded");
        };
      }
      observer.unobserve(element);
    }
  }, []);
  useElementObserver(".blur-load", blurUpCallback, { rootMargin: "50px" });

  // 4. Counter animations
  const counterCallback = useCallback((entry, observer) => {
    if (entry.isIntersecting) {
      startCounter(entry.target);
      observer.unobserve(entry.target);
    }
  }, [startCounter]);
  useElementObserver(".counter", counterCallback, { threshold: 0.5 });

  // 5. Parallax effect
  useParallax('[data-speed]');

  // 6. Active chapter detection on scroll
  useActiveChapter(setActiveChapter);

  // 7. Floating blocks interaction on mouse move for legacy section
  useFloatingBlocks('chapter-6');

  return (
    <main className="scrollytelling-container">
      {/* Chapter 1: The Arrival */}
      <Hero />

      {/* Chapter 2: About Us */}
      <AboutSection />

      {/* Chapter 3, 4, 5, 6, 7 simplified structure for brevity but retaining structure */}
      <ResidentialSection />

      <CorporateSection />

      <ClubSection />

      <SustainabilityCSR />

      <LegacySection />

      <MediaBlogSection onPostClick={onPostClick} />

      <div id="chapter-7" className="contact-split-container">
        <BookVisitSection onFormSubmit={onFormSubmit} allProjects={allProjects} />
        <GetInTouchSection onFormSubmit={onFormSubmit} allProjects={allProjects} />
      </div>
    </main>
  );
};

function Home() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(1);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);

  // Effect for initial loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoaded(true);
      console.log("Avadh Group Scrollytelling initialized");
    }, 3000); // 3-second delay
    return () => clearTimeout(timer);
  }, []);

  // Effect to handle body scroll based on overlays
  useEffect(() => {
    if (isMobileMenuOpen || !isAppLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen, isAppLoaded]);

  // Effect to handle navigation back from BlogDetail to home page
  useEffect(() => {
    if (!selectedBlogPost) {
      // When coming back from BlogDetail, reset scroll position first
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [selectedBlogPost]);

  // Combine all project data for the "Book a Visit" form dropdown
  const allProjectsForForm = useMemo(() => {
    // Only include on-going residential projects
    const residential = onGoingProjects.map(p => ({
      name: p.title,
      type: 'Residential'
    }));

    // Only include corporate projects that are not yet operational
    // NOTE: Assumes corporateProjects have a .status property
    const corporate = corporateProjects
      .filter(p => p.status !== 'Operational')
      .map(p => ({
        name: p.title,
        type: 'Corporate'
      }));

    // Only include club projects that are not yet operational
    const club = clubProjects
      .filter(p => p.status !== 'Operational')
      .map(p => ({
        name: p.title,
        type: 'Club'
      }));

    // Combine all sources and add a general option
    return [...residential, ...corporate, ...club, { name: 'General Inquiry', type: 'Other' }];
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Extract data from the form
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log("Form Submitted:", data);
    
    // Here you would typically send 'data' to your backend API
    
    alert("Thank you! Your appointment request has been received.");
    e.target.reset(); // Clear the form
  };

  const scrollToChapter = (chapterNumber) => {
    const targetChapter = document.getElementById(`chapter-${chapterNumber}`);
    if (targetChapter) {
      const offset = 80;
      const targetPosition = targetChapter.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  // If a blog post is selected, show the detail view
  if (selectedBlogPost) {
    return (
      <>
        <Navbar isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} isSearchOpen={isSearchOpen} toggleSearch={setIsSearchOpen} scrollToChapter={scrollToChapter} activeChapter={activeChapter} />
        <BlogDetail 
          post={selectedBlogPost} 
          onBack={() => setSelectedBlogPost(null)} 
          onSelectPost={setSelectedBlogPost}
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Loading Screen */}
      <Loader isLoaded={isAppLoaded} />

      {/* Navbar (includes Mobile Nav) */}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isSearchOpen={isSearchOpen} toggleSearch={setIsSearchOpen}
        scrollToChapter={scrollToChapter}
        activeChapter={activeChapter}
      />

      <MainContent 
        setActiveChapter={setActiveChapter}
        onPostClick={setSelectedBlogPost}
        onFormSubmit={handleFormSubmit}
        allProjects={allProjectsForForm}
      />

      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={
          <Suspense fallback={<Loader isLoaded={false} />}>
            <ProjectShowcasePage />
          </Suspense>
        } />
      </Routes>
    </Router>
  );
}

export default App;
