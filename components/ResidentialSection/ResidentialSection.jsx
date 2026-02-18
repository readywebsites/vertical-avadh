import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import StickyImageSection from '../StickyImageSection/StickyImageSection';
import ProjectSection from '../ProjectSection/ProjectSection';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import { onGoingProjects, completedProjects, filterOptions } from '../../data/residentialProjects.js';

// This is a "pure" function. It takes data and returns a new, filtered array.
// It has no side effects and doesn't rely on component state.
const applyFilters = (projects, filters) => {
  return projects.filter(p => {
    const { location, type, bhk } = filters;
    // Match location: true if filter is 'all' or if the project's location tag matches.
    const locationMatch = location === 'all' || p.tags.location === location;
    // Match type: true if filter is 'all' or if the project's type tag matches.
    const typeMatch = type === 'all' || p.tags.type === type;
    // Match BHK: true if filter is 'all' or if the project's bhk array includes the filter value.
    const bhkMatch = bhk === 'all' || p.tags.bhk.includes(bhk);
    return locationMatch && typeMatch && bhkMatch;
  });
};

const ResidentialSection = () => {
  const [filters, setFilters] = useState({
    location: 'all',
    type: 'all',
    bhk: 'all',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({ location: 'all', type: 'all', bhk: 'all' });
  };

  // Calculate filtered results
  const filteredOngoing = applyFilters(onGoingProjects, filters);
  const filteredCompleted = applyFilters(completedProjects, filters);
  const isAnyFilterActive = Object.values(filters).some(v => v !== 'all');

  const locationOptions = [
    { value: 'all', label: 'Location: All' },
    ...filterOptions.locations.map(loc => ({
      value: loc,
      label: loc.charAt(0).toUpperCase() + loc.slice(1)
    }))
  ];

  const typeOptions = [
    { value: 'all', label: 'Type: All' },
    ...filterOptions.types.map(t => ({
      value: t,
      label: t.charAt(0).toUpperCase() + t.slice(1)
    }))
  ];

  const bhkOptions = [
    { value: 'all', label: 'BHK: All' },
    ...filterOptions.bhk.map(b => ({
      value: b,
      label: `${b} BHK`
    }))
  ];

  return (
    <StickyImageSection
      imgSrc={onGoingProjects[0]?.image} // Use the first ongoing project image as a default
      imgAlt="Background view of Avadh Riverside project"
      chapterId="chapter-3"
      chapterNumber="3"
      stickyTitle="Live The Landmark"
      stickySubtitle="Residential Collection"
    >
      <div className="chapter-content">
        <div className="content-wrapper centered">
          <h6 className="chapter-subtitle">Residential Excellence</h6>
          <h2 className="chapter-title">Crafting <span className="highlight">Dream Homes</span></h2>

          <div className="project-filters fade-in">
            <div className="filter-group">
              <CustomDropdown
                options={locationOptions}
                value={filters.location}
                onChange={(val) => handleFilterChange('location', val)}
                placeholder="Location"
              />
            </div>
            <div className="filter-group">
              <CustomDropdown
                options={typeOptions}
                value={filters.type}
                onChange={(val) => handleFilterChange('type', val)}
                placeholder="Type"
              />
            </div>
            <div className="filter-group">
              <CustomDropdown
                options={bhkOptions}
                value={filters.bhk}
                onChange={(val) => handleFilterChange('bhk', val)}
                placeholder="BHK"
              />
            </div>
            <AnimatePresence>
              {isAnyFilterActive && (
                <motion.button
                  type="button"
                  id="reset-filters"
                  className="filter-reset-btn"
                  onClick={resetFilters}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex' }}
                >
                  <i className="fas fa-undo"></i> Reset Filters
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
        <ProjectSection
          projects={filteredOngoing}
          categoryTitle="On-Going Projects"
          isLoading={isLoading}
        />
        <ProjectSection
          projects={filteredCompleted}
          categoryTitle="Completed Projects"
          isLoading={isLoading}
        />
      </div>
    </StickyImageSection>
  );
};

export default ResidentialSection;