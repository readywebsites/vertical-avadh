import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import styles from './Navbar.module.css';
import useSmartSubmenus from '../../hooks/useSmartSubmenus.js';
import ProjectCardMini from '../ProjectCardMini/ProjectCardMini';
import useDebounce from '../../hooks/useDebounce.js';
import { navData as mockNavData } from '../navData.js'; // Use mock data as a fallback
import avadhLogo from '../../src/assets/images/logo/logo_01_trans.png';
import MobileHeader from '../MobileHeader/MobileHeader';

const Navbar = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  isSearchOpen,
  toggleSearch,
  scrollToChapter,
  activeChapter
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavScrolled, setIsMobileNavScrolled] = useState(false);
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState({});
  const [openDesktopSubmenu, setOpenDesktopSubmenu] = useState(null);
  const mobileNavRef = useRef(null);
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [searchResults, setSearchResults] = useState([]);

  // State for API data, loading, and errors
  const [navData, setNavData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navRef = useRef(null);

  // Handles smart submenu positioning from the original site's logic.
  useSmartSubmenus();

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile nav header scroll effect
  useEffect(() => {
    const mobileNavEl = mobileNavRef.current;
    if (!mobileNavEl) return;

    const handleMobileNavScroll = () => {
      setIsMobileNavScrolled(mobileNavEl.scrollTop > 10);
    };

    mobileNavEl.addEventListener('scroll', handleMobileNavScroll);
    return () => mobileNavEl.removeEventListener('scroll', handleMobileNavScroll);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      // Clear search when overlay is closed
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [isSearchOpen]);

  // Global Escape key handler for closing overlays
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      if (isSearchOpen) {
        toggleSearch(false);
      }
      if (isMobileMenuOpen) {
        toggleMobileMenu();
      }
      if (openDesktopSubmenu) {
        setOpenDesktopSubmenu(null);
      }
    }
  }, [isSearchOpen, isMobileMenuOpen, openDesktopSubmenu, toggleSearch, toggleMobileMenu]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Fetch navigation data from the API on component mount
  useEffect(() => {
    const fetchNavData = async () => {
      try {
        // This is the endpoint your Django backend will provide.
        // Ensure your dev server is configured to proxy /api requests to your backend.
        const response = await fetch('/api/navigation/');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNavData(data); // Populate state with API data
      } catch (e) {
        console.error("Failed to fetch navigation data, falling back to mock data:", e);
        setError(e);
        setNavData(mockNavData); // Fallback to mock data on error
      } finally {
        setIsLoading(false); // Set loading to false in all cases
      }
    };

    fetchNavData();
  }, []); // The empty dependency array [] ensures this runs only once.

  const handleMobileSubmenuToggle = (id) => {
    setOpenMobileSubmenus(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDesktopSubmenuToggle = (itemId) => {
    setOpenDesktopSubmenu(prev => (prev === itemId ? null : itemId));
  };

  // Close desktop submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDesktopSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- Search Logic ---

  // Flatten all projects from navData for easier searching
  const allProjects = useMemo(() => {
    if (isLoading || !navData) return [];
    const projects = [];
    navData.forEach(item => {
      item.submenu?.forEach(subItem => {
        if (subItem.projects) {
          projects.push(...subItem.projects);
        }
      });
    });
    // Return unique projects by ID
    return Array.from(new Map(projects.map(p => [p.id, p])).values());
  }, [navData, isLoading]);

  useEffect(() => {
    if (debouncedSearchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const lowerCaseQuery = debouncedSearchQuery.toLowerCase();
    const results = allProjects.filter(project =>
      project.name.toLowerCase().includes(lowerCaseQuery) ||
      project.location.toLowerCase().includes(lowerCaseQuery)
    );
    setSearchResults(results);
  }, [debouncedSearchQuery, allProjects]);

  const handleSearchClose = () => {
    toggleSearch(false);
  };

  // Render a loading state while fetching data
  if (isLoading) {
    // This is a simple placeholder. A more sophisticated skeleton loader could be used.
    return <nav className={`${styles.sidebarNav} ${styles.loading}`}></nav>;
  }

  // On error, we log it but still render the navbar using the fallback mock data.
  if (error) console.error("Navbar rendering with fallback data due to API error:", error);

  return (
    <>
      {/* Sidebar Navigation */}
      {/* Note: The class names here have been updated to match the CSS from index.css */}
      <nav ref={navRef} className={`${styles.sidebarNav} ${isScrolled ? styles.scrolled : ''} ${isSearchOpen ? styles.searchActive : ''}`} aria-label="Main Navigation">
        <button className={styles.navBrand} onClick={() => scrollToChapter(1)} aria-label="Go to Home section">
          <img src={avadhLogo} alt="Avadh Logo" className={styles.navLogo} onClick={() => scrollToChapter(1)} />
        </button>
        <ul className={styles.chapterNav} role="menubar">
          {navData.map(item => (
            <li 
              key={item.id} 
              role="none"
              className={`${styles.navItem} ${item.submenu ? styles.hasSubmenu : ''} ${openDesktopSubmenu === item.id ? styles.submenuOpen : ''}`}
            >
              <button
                className={`${styles.navLink} ${activeChapter === item.chapter ? styles.active : ''}`}
                onClick={() => item.submenu ? handleDesktopSubmenuToggle(item.id) : scrollToChapter(item.chapter)}
                aria-haspopup={!!item.submenu}
                aria-expanded={item.submenu ? openDesktopSubmenu === item.id : undefined}
                aria-current={activeChapter === item.chapter ? 'page' : undefined}
              >
                {item.label}
                {item.submenu && <i className={`fas fa-chevron-down ${styles.dropdownIcon}`}></i>}
              </button>
              
              {item.submenu && (
                <ul 
                  className={styles.submenu}
                  role="menu"
                  aria-label={item.label}
                >
                  {item.submenu.map(subItem => (
                    subItem.isSimpleLink ? (
                      <li key={subItem.id} role="none">
                        <a href={subItem.link} role="menuitem" onClick={() => setOpenDesktopSubmenu(null)}>
                          {subItem.title}
                        </a>
                      </li>
                    ) : (
                      <li key={subItem.id} className={styles.hasNestedSubmenu}>
                        <div className={styles.submenuTitle}>
                          <span>{subItem.title}</span>
                          <i className="fas fa-chevron-right"></i>
                        </div>
                        <ul className={styles.nestedSubmenu} role="menu" aria-label={subItem.title}>
                          {subItem.projects?.map(project => {
                              const projectUrl = `/projects/${project.slug || project.id}`;
                              return (
                                  <li key={project.id} role="none">
                                      <a href={projectUrl} role="menuitem" className={styles.projectLink} onClick={() => setOpenDesktopSubmenu(null)}>
                                          <ProjectCardMini project={project} />
                                      </a>
                                  </li>
                              );
                          })}
                          {subItem.viewAll && (
                            <li className={styles.viewAllItem}>
                              <a href={subItem.viewAll.link} className={styles.viewAllLink}>
                                {subItem.viewAll.label}
                                <i className="fas fa-arrow-right"></i>
                              </a>
                            </li>
                          )}
                        </ul>
                      </li>
                    )
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className={styles.navFooter}>
          <div className={styles.contactIcons}>
            <a href="tel:+919876543210" className={styles.iconButton} aria-label="Call Us: +91 98765 43210">
              <i className="fas fa-phone-alt"></i>
            </a>
            <a href="mailto:info@avadhgroup.com" className={styles.iconButton} aria-label="Email Us: info@avadhgroup.com">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="#book-visit-form" target="_blank" rel="noopener noreferrer" className={styles.iconButton} aria-label="Book a Visit">
              <i className="fas fa-calendar-check"></i>
            </a>
          </div>
          <button id="navSearchTrigger" className={styles.navSearchTrigger} onClick={() => toggleSearch(true)} aria-label="Open search">
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Search Overlay */}
        <div id="searchOverlay" className={`${styles.searchOverlay} ${isSearchOpen ? styles.active : ''}`}>
          <div className={styles.searchContentWrapper}>
              <div className={styles.searchBarWrapper}>
                <input
                  ref={searchInputRef}
                  id="navSearchInput"
                  className={styles.searchOverlayInput}
                  type="text"
                  placeholder="Search for projects, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button id="searchCloseBtn" className={styles.searchClose} onClick={handleSearchClose} aria-label="Close search"><i className="fas fa-times"></i></button>
              </div>
              {isSearchOpen && debouncedSearchQuery.trim() !== '' && (
                <div className={styles.searchResultsContainer} aria-live="polite">
                  {searchResults.length > 0 ? (
                    searchResults.map((project, index) => {
                      const projectUrl = `/projects/${project.slug || project.id}`;
                      return (
                        <a
                          key={project.id}
                          href={projectUrl}
                          onClick={handleSearchClose}
                          className={styles.searchResultItem}
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <ProjectCardMini project={project} highlight={debouncedSearchQuery} />
                        </a>
                      );
                    })
                  ) : (
                    <p className={styles.noResults}>No projects found for "{debouncedSearchQuery}"</p>
                  )}
                </div>
              )}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileHeader
        onMenuClick={toggleMobileMenu}
        isScrolled={isScrolled}
        aria-controls="mobileNav"
      />

      <div id="mobileMenuOverlay" className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.active : ''}`} onClick={toggleMobileMenu}></div>

      <div id="mobileNav" ref={mobileNavRef} className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.active : ''}`} role="dialog" aria-modal="true" aria-labelledby="mobileNavHeader">
        <div className={`${styles.mobileNavHeader} ${isMobileNavScrolled ? styles.scrolled : ''}`}>
          <div className={styles.mobileNavHeaderRow}>
            <img src={avadhLogo} alt="Avadh Logo" className={styles.mobileLogo} />
            <button id="closeMenuBtn" className={styles.closeMenu} onClick={toggleMobileMenu}><i className="fas fa-times"></i></button>
          </div>
        </div>
        <ul className={styles.mobileChapterNav}>
          {navData.map(item => (
            <li key={item.id} className={`${styles.mobileNavItem} ${activeChapter === item.chapter ? styles.active : ''} ${item.submenu ? styles.hasMobileSubmenu : ''}`}>
              {!item.submenu ? (
                <span onClick={() => { scrollToChapter(item.chapter); toggleMobileMenu(); }}>
                  {item.label}
                </span>
              ) : (
                <>
                  <button 
                    className={styles.mobileNavHeaderRow} 
                    onClick={() => handleMobileSubmenuToggle(item.id)}
                    aria-expanded={!!openMobileSubmenus[item.id]}
                    aria-controls={`mobile-submenu-${item.id}`}
                  >
                    <span>{item.label}</span>
                    <i className={`fas fa-chevron-down ${styles.mobileDropdownToggle} ${openMobileSubmenus[item.id] ? styles.open : ''}`}></i>
                  </button>
                  <ul id={`mobile-submenu-${item.id}`} className={`${styles.mobileSubmenu} ${openMobileSubmenus[item.id] ? styles.open : ''}`}>
                    {item.submenu.map(subItem => (
                      subItem.isSimpleLink ? (
                        <li key={subItem.id}><a href={subItem.link} onClick={toggleMobileMenu}>{subItem.title}</a></li>
                      ) : (
                        <li key={subItem.id} className={styles.mobileNestedItem}>
                          <button 
                            className={`${styles.mobileNavHeaderRow} ${styles.nestedHeader}`} 
                            onClick={() => handleMobileSubmenuToggle(subItem.id)}
                            aria-expanded={!!openMobileSubmenus[subItem.id]}
                            aria-controls={`mobile-submenu-${subItem.id}`}
                          >
                            <span>{subItem.title}</span>
                            <i className={`fas fa-chevron-down ${styles.mobileDropdownToggle} ${openMobileSubmenus[subItem.id] ? styles.open : ''}`}></i>
                          </button>
                          <ul id={`mobile-submenu-${subItem.id}`} className={`${styles.mobileSubmenu} ${styles.nested} ${openMobileSubmenus[subItem.id] ? styles.open : ''}`}>
                            {subItem.projects?.map(project => {
                              const projectUrl = `/projects/${project.slug || project.id}`;
                              return (
                                <li key={project.id}>
                                  <a href={projectUrl} onClick={toggleMobileMenu} className={styles.projectLink}>
                                    <ProjectCardMini project={project} />
                                  </a>
                                </li>
                              );
                            })}
                            {subItem.viewAll && (
                              <li>
                                <a href={subItem.viewAll.link} className={styles.viewAllLinkMobile} onClick={toggleMobileMenu}>
                                  {subItem.viewAll.label}
                                </a>
                              </li>
                            )}
                          </ul>
                        </li>
                      )
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
        <div className={styles.mobileNavFooter}>
            <button className={styles.mobileIconButton} onClick={() => { toggleSearch(true); toggleMobileMenu(); }} aria-label="Search">
              <i className="fas fa-search"></i>
            </button>
            <a href="tel:+919876543210" className={styles.mobileIconButton} aria-label="Call Us" onClick={toggleMobileMenu}>
                <i className="fas fa-phone-alt"></i>
            </a>
            <a href="mailto:info@avadhgroup.com" className={styles.mobileIconButton} aria-label="Email Us" onClick={toggleMobileMenu}>
                <i className="fas fa-envelope"></i>
            </a>
            <a href="#book-visit-form" target="_blank" rel="noopener noreferrer" className={styles.mobileIconButton} aria-label="Book a Visit" onClick={toggleMobileMenu}>
                <i className="fas fa-calendar-check"></i>
            </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;