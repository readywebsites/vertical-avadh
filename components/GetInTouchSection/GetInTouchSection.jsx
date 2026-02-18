import React, { useState } from 'react';
import './GetInTouchSection.css';
import Modal from '../Modal/Modal';

const GetInTouchSection = ({ allProjects = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    if (!formData.subject) newErrors.subject = "Please select a subject";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        console.log('Get In Touch Form Data:', formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
        setShowModal(true);
        setFormData({ name: '', phone: '', email: '', project: '', subject: '', message: '' });
      }, 1500);
    }
  };

  return (
    <section id="get-in-touch" className="chapter">
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title="Message Sent" 
        message="Thank you for contacting us! Your message has been received, and our team will get back to you soon." 
      />

      <div className="get-in-touch-bg-pattern"></div>
      <div className="chapter-content">
        <div className="content-wrapper centered">
          <div 
            onClick={() => setIsOpen(!isOpen)} 
            style={{ cursor: 'pointer', userSelect: 'none' }}
            title={isOpen ? "Click to close" : "Click to open"}
          >
            <h4 className="chapter-subtitle">Contact Us</h4>
            <h2 className="chapter-title">
              Get In <span className="highlight">Touch</span>
              <span style={{ display: 'inline-block', marginLeft: '15px', fontSize: '0.8em', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>▼</span>
            </h2>
          </div>

          {isOpen && (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <p className="chapter-description">
                Have questions about our projects or want to schedule a consultation? We are here to help you find your dream property.
              </p>
          {isSubmitted ? (
            <div className="thank-you-message" style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>Thank You!</h3>
              <p style={{ marginBottom: '2rem', color: 'rgba(255,255,255,0.8)' }}>
                Your message has been received. We will get back to you shortly.
              </p>
              <button className="cta-button" onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="inline-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  name="name" 
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="contact-phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="contact-phone" 
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
                <label htmlFor="contact-email">Email</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  name="email" 
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="contact-project">Interested Project</label>
                <select 
                  id="contact-project" 
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
                <label htmlFor="contact-subject">Subject</label>
                <select 
                  id="contact-subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange}
                  className={errors.subject ? 'error' : ''}
                >
                  <option value="">Select a Subject</option>
                  <option value="Sales">Sales Inquiry</option>
                  <option value="Support">Customer Support</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea 
                  id="contact-message" 
                  name="message" 
                  rows="4" 
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
            </div>

            <button type="submit" className="cta-button" disabled={isSubmitting} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minWidth: '160px' }}>
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
                  Sending...
                </>
              ) : 'Send Message'}
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

export default GetInTouchSection;