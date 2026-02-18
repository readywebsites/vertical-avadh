import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectSection from '../ProjectSection/ProjectSection';
import clubProjects from './clubProjects.js';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import StickyImageSection from '../StickyImageSection/StickyImageSection.jsx';
import utopiaImage from '../../src/assets/images/scroll-images/03-utopia-vapi-plus.webp';
import styles from './ClubSection.module.css';

const ClubSection = () => {
    const [filters, setFilters] = useState({
        location: 'all',
        type: 'all',
        status: 'all'
    });

    // Extract unique values for filter dropdowns dynamically
    const locations = ['all', ...new Set(clubProjects.map(p => p.location.split(',')[0].trim()))].map(opt => ({
        value: opt,
        label: opt === 'all' ? 'Location: All' : opt
    }));
    const types = ['all', ...new Set(clubProjects.map(p => p.type))].map(opt => ({
        value: opt,
        label: opt === 'all' ? 'Type: All' : opt
    }));
    const statuses = ['all', ...new Set(clubProjects.map(p => p.status))].map(opt => ({
        value: opt,
        label: opt === 'all' ? 'Status: All' : opt
    }));

    const projects = useMemo(() => {
        let result = clubProjects;

        if (filters.location !== 'all') {
            result = result.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()));
        }
        if (filters.type !== 'all') {
            result = result.filter(p => p.type.toLowerCase() === filters.type.toLowerCase());
        }
        if (filters.status !== 'all') {
            result = result.filter(p => p.status.toLowerCase() === filters.status.toLowerCase());
        }

        return result;
    }, [filters]);

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const resetFilters = () => {
        setFilters({ location: 'all', type: 'all', status: 'all' });
    };

    const isAnyFilterActive = Object.values(filters).some(v => v !== 'all');

    return (
        <StickyImageSection
            imgSrc={utopiaImage}
            imgAlt="Avadh Club Lifestyle"
            chapterId="chapter-5"
            chapterNumber="5"
            stickyTitle="Club Utopia"
            stickySubtitle="The Avadh Distinction"
        >
            <div className="chapter-background">
                <div className="residential-bg-pattern"></div>
            </div>

            <div className={`chapter-content ${styles.clubChapterContent}`}>
                <div className="content-wrapper centered">
                    <h6 className="chapter-subtitle">The Avadh Distinction</h6>
                    <h2 className="chapter-title">
                        Club <span className="highlight">Utopia</span>
                    </h2>

                    {/* Club Filters */}
                    <div className="project-filters fade-in" style={{ position: 'relative', zIndex: 20 }}>
                        <div className="filter-group">
                            <CustomDropdown
                                options={locations}
                                value={filters.location}
                                onChange={(value) => handleFilterChange('location', value)}
                                placeholder="Location: All"
                            />
                        </div>
                        <div className="filter-group">
                            <CustomDropdown
                                options={types}
                                value={filters.type}
                                onChange={(value) => handleFilterChange('type', value)}
                                placeholder="Type: All"
                            />
                        </div>
                        <div className="filter-group">
                            <CustomDropdown
                                options={statuses}
                                value={filters.status}
                                onChange={(value) => handleFilterChange('status', value)}
                                placeholder="Status: All"
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

                {/* Club Projects Grid */}
                <ProjectSection
                    projects={projects}
                    categoryTitle="Exclusive Clubs & Amenities"
                    isLoading={false}
                />
            </div>
        </StickyImageSection>
    );
};

export default ClubSection;