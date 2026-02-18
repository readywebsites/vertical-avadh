import React from 'react';
import MediaSection from './MediaSection';
import BlogSection from './BlogSection';
import './MediaBlogSection.css';

const MediaBlogSection = ({ onPostClick }) => {
  return (
    <section className="media-blog-split-section">
      <div className="split-half media-wrapper">
        <MediaSection />
      </div>
      <div className="split-half blog-wrapper">
        <BlogSection onPostClick={onPostClick} />
      </div>
    </section>
  );
};

export default MediaBlogSection;