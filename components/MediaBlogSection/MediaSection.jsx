import React, { useState } from 'react';

const MediaSection = () => {
  // TODO: Replace with data from Django Admin
  const [mediaItems, setMediaItems] = useState([
    { id: 1, type: 'Award', title: 'Best Luxury Developer 2024', size: 'large', bg: '#f0f0f0' },
    { id: 2, type: 'News', title: 'Awadh Group expands to Dubai', size: 'small' },
    { id: 3, type: 'Press', title: 'Featured in Forbes India', size: 'small' },
    { id: 4, type: 'News', title: 'Q3 Sustainability Report Released', size: 'wide' },
    { id: 5, type: 'Award', title: 'Excellence in Design', size: 'tall' },
  ]);

  const handleLoadMore = () => {
    const newItems = [
      { id: Date.now() + 1, type: 'News', title: 'New Community Center Opening', size: 'small' },
      { id: Date.now() + 2, type: 'Press', title: 'Interview with CEO', size: 'wide' },
      { id: Date.now() + 3, type: 'Award', title: 'Green Building Certification', size: 'small' },
    ];
    setMediaItems(prev => [...prev, ...newItems]);
  };

  return (
    <div className="media-section-inner">
      <div className="section-header">
        <h3>Media Center</h3>
        <button className="load-more-btn" onClick={handleLoadMore}>VIEW ALL</button>
      </div>
      <div className="bento-grid">
        {mediaItems.map((item, index) => (
          <div 
            key={item.id} 
            className={`bento-item ${item.size}`}
            style={{ 
              ...(item.bg ? { backgroundColor: item.bg } : {}),
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="bento-content">
              <span className="bento-tag">{item.type}</span>
              <div className="bento-title">{item.title}</div>
            </div>
            {/* Placeholder for icon or arrow */}
            <div style={{ marginTop: 'auto', textAlign: 'right', opacity: 0.5 }}>
              &rarr;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaSection;