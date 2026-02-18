import React, { useState } from 'react';

const BlogSection = ({ onPostClick }) => {
  // TODO: Replace with data from Django Admin
  // 'flexGrow' simulates different aspect ratios for horizontal masonry
  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: 'The Future of Smart Homes', img: 'https://placehold.co/600x400/333/fff', flex: 2 },
    { id: 2, title: 'Interior Design Trends', img: 'https://placehold.co/400x400/555/fff', flex: 1 },
    { id: 3, title: 'Sustainable Living', img: 'https://placehold.co/500x400/777/fff', flex: 1.5 },
    { id: 4, title: 'Investment Guide 2024', img: 'https://placehold.co/450x400/444/fff', flex: 1.2 },
    { id: 5, title: 'Community Living', img: 'https://placehold.co/550x400/666/fff', flex: 1.8 },
  ]);

  const handleViewAll = () => {
    const viewAllPost = {
      id: 'view-all',
      title: 'All Insights',
      img: 'https://placehold.co/1920x1080/222/fff?text=All+Insights'
    };
    if (onPostClick) onPostClick(viewAllPost);
  };

  const handlePostClick = (post) => {
    if (onPostClick) {
      onPostClick(post);
    }
  };

  return (
    <div className="blog-section-inner">
      <div className="section-header">
        <h3>Latest Insights</h3>
        <button className="load-more-btn" onClick={handleViewAll}>VIEW ALL</button>
      </div>
      <div className="horizontal-masonry">
        {blogPosts.map((post, index) => (
          <div 
            key={post.id} 
            className="masonry-item" 
            style={{ 
              flexGrow: post.flex,
              animationDelay: `${index * 0.1}s`
            }}
            onClick={() => handlePostClick(post)}
          >
            <img src={post.img} alt={post.title} loading="lazy" />
            <div className="blog-overlay">
              {post.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;