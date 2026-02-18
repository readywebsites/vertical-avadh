import React from 'react';

const timelineData = [
  { year: '1998', title: 'The Foundation', description: "First residential project in Adajan establishes Avadh's commitment to quality" },
  { year: '2008', title: 'Township Vision', description: "Launched Surat's first integrated township with club amenities" },
  { year: '2018', title: 'Diamond Jubilee', description: 'Completed 5 million sq.ft. with zero delay in possession' },
  { year: '2023', title: 'Future Forward', description: 'Smart homes with sustainable technology across all projects' },
];

const TimelineCarousel = () => {
  // Duplicate items for seamless CSS-based infinite scroll animation
  const timelineItems = [...timelineData, ...timelineData];

  return (
    <div className="timeline-carousel fade-in" data-delay="0.6">
      <div className="timeline-track">
        {timelineItems.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-year">{item.year}</div>
            <div className="timeline-content">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LegacySection = () => {
  return (
    <section id="chapter-6" className="chapter" data-chapter="6">
      <div className="chapter-background">
        <div className="legacy-grid-bg"></div>
        <div className="floating-block block-1"></div>
        <div className="floating-block block-2"></div>
        <div className="floating-block block-3"></div>
        <div className="floating-block block-4"></div>
      </div>
      <div className="chapter-content">
        <div className="content-wrapper centered">
          <h6 className="chapter-subtitle">Building Futures Since 1998</h6>
          <h2 className="chapter-title">A Legacy <span className="highlight">Carved in Trust</span></h2>
          <p className="chapter-description fade-in" data-delay="0.2">
            For over two decades, Avadh has been more than just a name in real estate; it's a promise of quality, a testament to trust, and a legacy of creating vibrant communities. Our journey is paved with milestones that reflect our commitment to excellence and our dedication to the families we serve.
          </p>
          <div className="legacy-stats-row fade-in" data-delay="0.4">
            <div className="l-stat">
              <div className="l-number">
                <span className="counter" data-target="25">0</span>+
              </div>
              <div className="l-label">YEARS OF LEGACY</div>
            </div>
            <div className="l-stat">
              <div className="l-number">
                <span className="counter" data-target="50">0</span>+
              </div>
              <div className="l-label">SUCCESSFUL PROJECTS</div>
            </div>
            <div className="l-stat">
              <div className="l-number">
                <span className="counter" data-target="5">0</span>K+
              </div>
              <div className="l-label">HAPPY FAMILIES</div>
            </div>
            <div className="l-stat">
              <div className="l-number">
                <span className="counter" data-target="12">0</span>M+
              </div>
              <div className="l-label">SQ.FT. DEVELOPED</div>
            </div>
          </div>

          <TimelineCarousel />
        </div>
      </div>
    </section>
  );
};

export default LegacySection;