import { useRef, useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../ProjectCard/ProjectCard';
import useDragToScroll from '../../hooks/useDragToScroll.js';
import PortfolioCardSkeleton from '../PortfolioCardSkeleton/PortfolioCardSkeleton';

const ProjectSection = ({ projects, categoryTitle, isLoading }) => {
    const gridRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);

    const checkScroll = () => {
        if (gridRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
            setShowLeftArrow(scrollLeft > 5);
            setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);

            const maxScroll = scrollWidth - clientWidth;
            setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
        }
    };

    useEffect(() => {
        const grid = gridRef.current;
        if (grid) {
            grid.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
            checkScroll(); // Initial check
        }
        return () => {
            if (grid) {
                grid.removeEventListener('scroll', checkScroll);
            }
            window.removeEventListener('resize', checkScroll);
        };
    }, [projects, isLoading]);

    // Custom hook to enable drag-to-scroll on the project grid
    useDragToScroll(gridRef);

    const scroll = (direction) => {
        if (gridRef.current) {
            const scrollAmount = gridRef.current.offsetWidth * 0.8;
            gridRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="project-category-section" style={{ position: 'relative' }}>
            <style>{`
                .property-card:hover {
                    z-index: 10;
                    position: relative;
                }
            `}</style>
            {/* Parallax Background Effect */}
            <div 
                data-speed="-0.05"
                style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '0',
                    width: '40%',
                    height: '100%',
                    background: 'radial-gradient(circle at center, rgba(192, 160, 98, 0.08) 0%, transparent 70%)',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />
            <h3 className="category-title fade-in" style={{ position: 'relative', zIndex: 1 }}>{categoryTitle}</h3>
            <div className="grid-scroll-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                <button 
                    className="scroll-arrow left-arrow" 
                    aria-label="Scroll Left" 
                    onClick={() => scroll('left')}
                    style={{ 
                        opacity: showLeftArrow ? 1 : 0, 
                        pointerEvents: showLeftArrow ? 'auto' : 'none',
                        transition: 'opacity 0.3s ease'
                    }}
                >
                    <i className="fas fa-chevron-left"></i>
                </button>
                <div 
                    className="residential-grid" 
                    ref={gridRef} 
                    style={{ 
                        display: 'flex', 
                        overflowX: 'auto', 
                        gap: '1.5rem',
                        padding: '40px 20px 20px 0',
                        marginTop: '-40px',
                        scrollSnapType: 'x mandatory' 
                    }}
                >
                    <AnimatePresence mode="popLayout">
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, index) => (
                                <motion.div
                                    key={`skeleton-${index}`}
                                    layout
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    style={{ minWidth: '300px', flex: '0 0 auto', scrollSnapAlign: 'start' }}
                                >
                                    <PortfolioCardSkeleton />
                                </motion.div>
                            ))
                        ) : projects.map(project => (
                            <motion.div
                                key={project.id || project.name}
                                layout
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                style={{ minWidth: '300px', flex: '0 0 auto', scrollSnapAlign: 'start' }}
                            >
                                <ProjectCard project={project} onClick={() => console.log(`Clicked ${project.title}`)} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <button 
                    className="scroll-arrow right-arrow" 
                    aria-label="Scroll Right" 
                    onClick={() => scroll('right')}
                    style={{ 
                        opacity: showRightArrow ? 1 : 0, 
                        pointerEvents: showRightArrow ? 'auto' : 'none',
                        transition: 'opacity 0.3s ease'
                    }}
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            {/* Scroll Progress Bar */}
            <div className="scroll-progress-container" style={{ width: '100%', maxWidth: '200px', height: '2px', backgroundColor: '#e0e0e0', margin: '1rem auto 0', borderRadius: '2px', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                <div style={{ 
                    width: `${scrollProgress}%`, 
                    height: '100%', 
                    backgroundColor: '#c0a062', 
                    transition: 'width 0.1s ease-out' 
                }} />
            </div>

            {projects.length === 0 && <p className="no-results" style={{ textAlign: 'center', padding: '2rem', position: 'relative', zIndex: 1 }}>No projects match the current filters.</p>}
            <div className="view-all-container fade-in" data-delay="0.2" style={{ position: 'relative', zIndex: 1 }}>
                <motion.a 
                    href="portfolio.html" 
                    className="cta-button outline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span>View All</span>
                    <i className="fas fa-arrow-right"></i>
                </motion.a>
            </div>
        </div>
    );
};

export default ProjectSection;