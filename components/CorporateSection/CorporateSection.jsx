import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StickyImageSection from '../StickyImageSection/StickyImageSection';
import ProjectSection from '../ProjectSection/ProjectSection';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import corporateProjects from './corporateProjects.js';
import corporateArkelia from '../../src/assets/images/comm-ongoing/01-arkelia.webp';

// Helper function for filtering commercial projects
const applyFilters = (projects, filters) => {
  return projects.filter(p => {
    const { location, type, status } = filters;

    // Match location
    const locationMatch = location === 'all' || p.location.toLowerCase().includes(location);
    // Match type (checks if the project type string includes the filter value, e.g., "office,shop")
    const typeMatch = type === 'all' || p.type.toLowerCase().includes(type);
    const statusMatch = status === 'all' || p.status.toLowerCase() === status;

    return locationMatch && typeMatch && statusMatch;
  });
};

const CorporateSection = () => {
  const [filters, setFilters] = useState({
    location: 'all',
    type: 'all',
    status: 'all',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ location: 'all', type: 'all', status: 'all' });
  };

  // Generate filter options dynamically and memoize them
  const { locationOptions, typeOptions, statusOptions } = useMemo(() => {
    const locations = ['all', ...new Set(corporateProjects.map(p => p.location))].map(opt => ({
      value: opt.toLowerCase(),
      label: opt === 'all' ? 'Location: All' : opt
    }));
    
    const types = ['all', ...new Set(corporateProjects.flatMap(p => p.type.split(',')))].map(opt => ({
      value: opt.toLowerCase(),
      label: opt === 'all' ? 'Type: All' : opt.charAt(0).toUpperCase() + opt.slice(1)
    }));

    const statuses = ['all', ...new Set(corporateProjects.map(p => p.status))].map(opt => ({
      value: opt.toLowerCase(),
      label: opt === 'all' ? 'Status: All' : opt.charAt(0).toUpperCase() + opt.slice(1)
    }));

    return { locationOptions: locations, typeOptions: types, statusOptions: statuses };
  }, []);

  // Apply filters
  const filteredProjects = useMemo(() => applyFilters(corporateProjects, filters), [filters]);

  // Split filtered projects by status for separate rendering
  const filteredOngoing = useMemo(() => filteredProjects.filter(p => p.status === 'ongoing'), [filteredProjects]);
  const filteredCompleted = useMemo(() => filteredProjects.filter(p => p.status === 'completed'), [filteredProjects]);

  const isAnyFilterActive = Object.values(filters).some(v => v !== 'all');

  return (
    <StickyImageSection
      imgSrc={corporateArkelia}
      imgAlt="Background view of Avadh Arkelia project"
      chapterId="chapter-4"
      chapterNumber="4"
      stickyTitle="Business Redefined"
      stickySubtitle="Commercial Spaces"
    >
      <div className="chapter-content">
        <div className="content-wrapper centered">
          <h6 className="chapter-subtitle">Corporate Landmarks</h6>
          <h2 className="chapter-title">Defining <span className="highlight">Business Horizons</span></h2>

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
                options={statusOptions}
                value={filters.status}
                onChange={(val) => handleFilterChange('status', val)}
                placeholder="Status"
              />
            </div>
            <AnimatePresence>
              {isAnyFilterActive && (
                <motion.button
                  type="button"
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

        {filteredOngoing.length > 0 && (
          <ProjectSection
            projects={filteredOngoing}
            categoryTitle="On-Going Projects"
            isLoading={isLoading}
          />
        )}

        {filteredCompleted.length > 0 && (
          <ProjectSection
            projects={filteredCompleted}
            categoryTitle="Completed Projects"
            isLoading={isLoading}
          />
        )}
      </div>
    </StickyImageSection>
  );
};

export default CorporateSection;