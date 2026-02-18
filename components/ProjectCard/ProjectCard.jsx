import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Tilt from '../Tilt/Tilt';

const ProjectCard = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = project.images && project.images.length > 0 ? project.images : [project.image];

  useEffect(() => {
    let interval;
    let timeoutId;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 2000);
    } else {
      timeoutId = setTimeout(() => {
        setCurrentImageIndex(0);
      }, 0);
    }
    return () => {
      if (interval) clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isHovered, images.length]);

  const dataAttrs = {
    'data-location': project.location,
    'data-type': project.type,
    'data-bhk': project.bhk,
    'data-status': project.status,
  };

  return (
    <Link to={`/property/${project.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
    <Tilt 
      className="res-project-card" 
      {...dataAttrs}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="res-card-image" style={{ position: 'relative' }}>
        <motion.img 
          key={currentImageIndex}
          src={images[currentImageIndex]} 
          alt={project.title} 
          loading="lazy"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        {project.badge && <div className="res-card-badge">{project.badge}</div>}
      </div>
      <div className="res-card-content">
        <h4>{project.title}</h4>
        <p className="res-location"><i className="fas fa-map-marker-alt"></i> {project.address || project.location}</p>
        <div className="res-card-footer">
          <span>{project.description}</span>
          <span className="res-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Explore
            <motion.span
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <i className="fas fa-arrow-right"></i>
            </motion.span>
          </span>
        </div>
      </div>
    </Tilt>
    </Link>
  );
};

export default ProjectCard;