import React, { useState } from 'react';
import './BookVisitSection.css';
import Modal from '../Modal/Modal';

const BookVisitSection = ({ allProjects = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: '',
    date: '',
    time: '10:00'
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.project) newErrors.project = "Please select a project";
    if (!formData.date) newErrors.date = "Please select a date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Book Visit Form Data:', formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
        setShowModal(true);
        setFormData({ name: '', phone: '', email: '', project: '', date: '', time: '10:00' });
      }, 1500);
    }
  };

  return (
    <section id="book-visit" className="chapter">
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title="Visit Scheduled" 
        message="Thank you! Your private visit request has been submitted successfully. Our team will contact you shortly to confirm the details." 
      />

      <div className="get-in-touch-bg-pattern"></div>
      <div className="chapter-content">
        <div className="content-wrapper centered">
          <div 
            onClick={() => setIsOpen(!isOpen)} 
            style={{ cursor: 'pointer', userSelect: 'none' }}
            title={isOpen ? "Click to close" : "Click to open"}
          >
            <h4 className="chapter-subtitle">Experience Luxury</h4>
            <h2 className="chapter-title">
              Book a <span className="highlight">Private Visit</span>
              <span style={{ display: 'inline-block', marginLeft: '15px', fontSize: '0.8em', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>▼</span>
            </h2>
          </div>

          {isOpen && (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <p className="chapter-description">
                Schedule a personalized tour of our properties. Our dedicated team will guide you through the amenities and answer all your queries.
              </p>
          {isSubmitted ? (
            <div className="thank-you-message" style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>Visit Scheduled!</h3>
              <p style={{ marginBottom: '2rem', color: 'rgba(255,255,255,0.8)' }}>
                Your appointment request has been received. We will confirm the details shortly.
              </p>
              <button className="cta-button" onClick={() => setIsSubmitted(false)}>
                Book Another Visit
              </button>
            </div>
          ) : (
            <form className="inline-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="visit-name">Your Name</label>
                <input 
                  type="text" 
                  id="visit-name" 
                  name="name" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="visit-phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="visit-phone" 
                  name="phone" 
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="visit-email">Email Address</label>
                <input 
                  type="email" 
                  id="visit-email" 
                  name="email" 
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="visit-project">Interested Project</label>
                <select 
                  id="visit-project" 
                  name="project" 
                  value={formData.project} 
                  onChange={handleChange}
                  className={errors.project ? 'error' : ''}
                >
                  <option value="">Select a Project</option>
                  {allProjects.map((proj, index) => (
                    <option key={index} value={proj.name}>{proj.name} ({proj.type})</option>
                  ))}
                </select>
                {errors.project && <span className="error-message">{errors.project}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="visit-date">Preferred Date</label>
                <input 
                  type="date" 
                  id="visit-date" 
                  name="date" 
                  value={formData.date}
                  onChange={handleChange}
                  className={errors.date ? 'error' : ''}
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="visit-time">Preferred Time</label>
                <select id="visit-time" name="time" value={formData.time} onChange={handleChange}>
                  <option value="10:00">10:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="18:00">06:00 PM</option>
                </select>
              </div>
            </div>

            <button type="submit" className="cta-button" disabled={isSubmitting} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minWidth: '180px' }}>
              {isSubmitting ? (
                <>
                  <span style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #fff',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></span>
                  Booking...
                </>
              ) : 'Confirm Booking'}
            </button>
          </form>
          )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookVisitSection;