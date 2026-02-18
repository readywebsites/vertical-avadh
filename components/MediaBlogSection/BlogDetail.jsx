import React, { useEffect } from 'react';
import './BlogDetail.css';

const BlogDetail = ({ post, onBack, onSelectPost }) => {
  // Scroll to top when component mounts or post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) return null;

  // Dummy data for the "All Insights" view
  const allPosts = [
    { id: 1, title: 'The Future of Smart Homes', img: 'https://placehold.co/600x400/333/fff', date: 'Oct 24, 2023', excerpt: 'Discover how technology is reshaping modern living spaces with automation and connectivity.' },
    { id: 2, title: 'Interior Design Trends', img: 'https://placehold.co/400x400/555/fff', date: 'Oct 20, 2023', excerpt: 'Explore the top interior design trends that are dominating the luxury real estate market this year.' },
    { id: 3, title: 'Sustainable Living', img: 'https://placehold.co/500x400/777/fff', date: 'Oct 15, 2023', excerpt: 'Eco-friendly practices and green building certifications are becoming the new standard.' },
    { id: 4, title: 'Investment Guide 2024', img: 'https://placehold.co/450x400/444/fff', date: 'Oct 10, 2023', excerpt: 'A comprehensive guide to real estate investment opportunities in emerging markets.' },
    { id: 5, title: 'Community Living', img: 'https://placehold.co/550x400/666/fff', date: 'Oct 05, 2023', excerpt: 'The benefits of living in a connected community and how it enhances quality of life.' },
  ];

  if (post.id === 'view-all') {
    return (
      <div className="blog-detail-page">
        <div className="blog-detail-container">
          <button className="back-btn" onClick={onBack}>
            &larr; Back to Home
          </button>
          
          <header className="article-header">
            <h1>All Insights</h1>
            <p className="lead" style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
              Explore our latest news, articles, and updates.
            </p>
          </header>

          <div className="all-posts-grid">
            {allPosts.map(p => (
              <div key={p.id} className="post-card" onClick={() => onSelectPost && onSelectPost(p)}>
                <div className="post-card-image">
                  <img src={p.img} alt={p.title} loading="lazy" />
                </div>
                <div className="post-card-content">
                  <span className="post-date">{p.date}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="read-more-link">Read More &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-container">
        <button className="back-btn" onClick={onBack}>
          &larr; Back to Insights
        </button>

        <article className="blog-article">
          <header className="article-header">
            <span className="article-category">Insights</span>
            <h1>{post.title}</h1>
            <div className="article-meta">
              <span className="date">October 24, 2023</span>
              <span className="separator">•</span>
              <span className="read-time">5 min read</span>
            </div>
          </header>

          <div className="article-featured-image">
            <img src={post.img} alt={post.title} />
          </div>

          <div className="article-content">
            <p className="lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <h3>The Evolution of Luxury Living</h3>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            
            <blockquote>
              "Real estate is not just about building walls, it's about building communities and lifestyles."
            </blockquote>

            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>

            <h3>Sustainable Future</h3>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;