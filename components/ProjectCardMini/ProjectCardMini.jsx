import React from 'react';
import styles from './ProjectCardMini.module.css';

// Helper component to render highlighted text
const HighlightedText = ({ text, highlight }) => {
  if (!highlight || !text) {
    return <>{text}</>;
  }
  // Escape special characters in highlight string for regex
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <strong key={i} className={styles.highlight}>{part}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

/**
 * A small, reusable component to display a project preview.
 * Can highlight a search term in the name and location.
 * @param {{
 *   project: { link?: string, image: string, name: string, location: string },
 *   highlight?: string
 * }} props
 */
const ProjectCardMini = ({ project, highlight = '' }) => {
  return (
    <div className={styles.projectCardMini}>
      <img src={project.image} alt={project.name} loading="lazy" className={styles.projectImage} />
      <div className={styles.info}>
        <span className={styles.name}>
          <HighlightedText text={project.name} highlight={highlight} />
        </span>
        <span className={styles.loc}>
          <i className="fas fa-map-marker-alt" style={{ marginRight: '5px', opacity: 0.7 }}></i>
          <HighlightedText text={project.location} highlight={highlight} />
        </span>
      </div>
    </div>
  );
};

export default ProjectCardMini;