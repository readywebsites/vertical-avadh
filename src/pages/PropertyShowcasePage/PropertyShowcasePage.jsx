import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import styles from './PropertyShowcasePage.module.css';
import Modal from '../../../components/Modal/Modal';

// Import all project data sources
import { onGoingProjects, completedProjects } from '../../../data/residentialProjects.js';
import corporateProjects from '../../../components/CorporateSection/corporateProjects.js';
import clubProjects from '../../../components/ClubSection/clubProjects.js';

const ProjectShowcasePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Contact Form State
    const [contactFormData, setContactFormData] = useState({
        fullName: '',
        contactNumber: '',
        email: '',
        message: ''
    });
    const [contactErrors, setContactErrors] = useState({});
    const [isContactSubmitting, setIsContactSubmitting] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);

    // Accordion State
    const [activeAccordion, setActiveAccordion] = useState(null);
    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    // Gallery State
    const [showAllPhotos, setShowAllPhotos] = useState(false);

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
        
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBrochureSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (validate()) {
            setIsSubmitting(true);
            
            // Simulate API call
            setTimeout(() => {
                console.log('Brochure Download Request:', { ...formData, project: property?.title });
                setIsSubmitting(false);
                setShowModal(true);
                setFormData({ name: '', email: '', phone: '' });
            }, 1500);
        }
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactFormData(prev => ({ ...prev, [name]: value }));
        if (contactErrors[name]) {
            setContactErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateContact = () => {
        const newErrors = {};
        if (!contactFormData.fullName.trim()) newErrors.fullName = "Full Name is required";
        
        if (!contactFormData.contactNumber.trim()) {
            newErrors.contactNumber = "Contact Number is required";
        } else if (!/^\d{10}$/.test(contactFormData.contactNumber.replace(/\D/g, ''))) {
            newErrors.contactNumber = "Please enter a valid 10-digit phone number";
        }

        if (!contactFormData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(contactFormData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!contactFormData.message.trim()) newErrors.message = "Message is required";

        setContactErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        if (isContactSubmitting) return;

        if (validateContact()) {
            setIsContactSubmitting(true);
            
            // Simulate API call
            setTimeout(() => {
                console.log('Contact Form Request:', { ...contactFormData, project: property?.title });
                setIsContactSubmitting(false);
                setShowContactModal(true);
                setContactFormData({ fullName: '', contactNumber: '', email: '', message: '' });
            }, 1500);
        }
    };

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const scrollToChapter = (chapterNumber) => {
        navigate(`/#chapter-${chapterNumber}`);
    };

    // Combine all projects to search by ID
    const allProjects = [
        ...onGoingProjects,
        ...completedProjects,
        ...corporateProjects,
        ...clubProjects
    ];

    // Compute property data directly - no state needed for synchronous transformation
    const projectData = allProjects.find(p => p.id.toString() === id);
    const property = projectData ? {
        ...projectData,
        description: "A detailed description of this amazing property goes here. It highlights the key selling points, the lifestyle, and the unique value proposition of investing in or living here. We can use multiple paragraphs to elaborate on the architecture, design philosophy, and community.",
        bhk: projectData.bhk || "3 & 4 BHK",
        area: projectData.area || "2500 - 4000 Sq. Ft.",
        status: projectData.status || "Under Construction",
        price: projectData.price || "Price on Request",
        features: ["State-of-the-art Gymnasium", "Swimming Pool", "Landscaped Gardens", "24/7 Security", "Children's Play Area"],
        amenitiesCategories: [
            {
                category: "Indoor Amenities",
                items: ["State-of-the-art Gymnasium", "Indoor Games Room", "Library / Reading Lounge", "Multipurpose Hall", "Yoga & Meditation Area"]
            },
            {
                category: "Outdoor Amenities",
                items: ["Swimming Pool with Deck", "Landscaped Gardens", "Children's Play Area", "Jogging / Walking Track", "Senior Citizen Sit-out"]
            },
            {
                category: "Safety & Security",
                items: ["24/7 Security Surveillance", "CCTV Monitoring", "Video Door Phone", "Intercom Facility", "Fire Fighting System"]
            },
            {
                category: "Convenience",
                items: ["High-speed Elevators", "Power Backup for Common Areas", "Rainwater Harvesting", "Sewage Treatment Plant", "Ample Car Parking"]
            }
        ],
        gallery: [
            "https://via.placeholder.com/1200x800.png?text=Main+Exterior+View",
            "https://via.placeholder.com/800x600.png?text=Living+Room",
            "https://via.placeholder.com/800x600.png?text=Master+Bedroom",
            "https://via.placeholder.com/800x600.png?text=Modern+Kitchen",
            "https://via.placeholder.com/800x600.png?text=Swimming+Pool",
            "https://via.placeholder.com/800x600.png?text=Gymnasium",
            "https://via.placeholder.com/800x600.png?text=Garden+Area",
            "https://via.placeholder.com/800x600.png?text=Club+House",
        ],
        brochureUrl: "/path/to/brochure.pdf",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube embed URL
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.819561314769!3d-6.19474139551539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sNational%20Monument!5e0!3m2!1sen!2sid!4v1622543950512!5m2!1sen!2sid"
    } : null;

    // Carousel Auto-play
    useEffect(() => {
        if (property?.gallery?.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % property.gallery.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [property]);

    const nextSlide = () => {
        if (property?.gallery) {
            setCurrentSlide((prev) => (prev + 1) % property.gallery.length);
        }
    };

    const prevSlide = () => {
        if (property?.gallery) {
            setCurrentSlide((prev) => (prev - 1 + property.gallery.length) % property.gallery.length);
        }
    };

    if (!property) {
        return <div className={styles.error}>Property not found. <Link to="/">Go Home</Link></div>;
    }

    return (
        <>
            <Navbar 
                isMobileMenuOpen={isMobileMenuOpen} 
                toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                isSearchOpen={isSearchOpen} 
                toggleSearch={setIsSearchOpen} 
                scrollToChapter={scrollToChapter} 
                activeChapter={null} 
            />
            <Modal 
                isOpen={showModal} 
                onClose={() => setShowModal(false)} 
                title="Brochure Sent" 
                message={`Thank you for your interest in ${property.title}. The brochure has been sent to your email address.`} 
            />
            <Modal 
                isOpen={showContactModal} 
                onClose={() => setShowContactModal(false)} 
                title="Message Sent" 
                message={`Thank you for your interest in ${property.title}. We have received your message and will contact you shortly.`} 
            />
            
            {/* 1. Hero Header with Title and Location */}
            <header className={styles.heroSection}> 
                {/* Carousel Images */}
                {property.gallery.map((img, index) => (
                    <div
                        key={index}
                        className={`${styles.heroSlide} ${currentSlide === index ? styles.heroSlideActive : ''}`}
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}

                {/* Overlay */}
                <div className={styles.heroOverlay}></div>
                
                {/* Content */}
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>{property.title}</h1>
                    <p className={styles.heroLocation}>
                        <i className="fas fa-map-marker-alt" style={{ color: '#eab308' }}></i> {property.location}
                    </p>
                </div>

                {/* Navigation Arrows */}
                <button onClick={prevSlide} className={`${styles.navButton} ${styles.prevButton}`}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <button onClick={nextSlide} className={`${styles.navButton} ${styles.nextButton}`}>
                    <i className="fas fa-chevron-right"></i>
                </button>

                {/* Indicators */}
                <div className={styles.indicators}>
                    {property.gallery.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`${styles.indicator} ${currentSlide === index ? styles.indicatorActive : ''}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </header>
            
            <div className={styles.showcaseContainer}>
                <main className={styles.mainContent}>
                    {/* Column 1: Project Highlights (25%) */}
                    <div className={styles.infoColumn}>
                        <h3 className={styles.columnTitle}>Project Highlights</h3>
                        <ul className={styles.highlightsList}>
                            <li>
                                <span className={styles.label}>Configuration</span>
                                <strong>{property.bhk}</strong>
                            </li>
                            <li>
                                <span className={styles.label}>Area</span>
                                <strong>{property.area}</strong>
                            </li>
                            <li>
                                <span className={styles.label}>Status</span>
                                <strong>{property.status}</strong>
                            </li>
                            <li>
                                <span className={styles.label}>Price</span>
                                <strong>{property.price}</strong>
                            </li>
                            <li>
                                <span className={styles.label}>Location</span>
                                <strong>{property.location}</strong>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Description & Features (50%) */}
                    <div className={styles.descriptionColumn}>
                        <h2 className={styles.sectionTitle}>About {property.title}</h2>
                        <p className={styles.descriptionText}>{property.description}</p>
                        
                        <h3 className={styles.subTitle}>Amenities & Features</h3>
                        <div className={styles.featuresGrid}>
                            {property.features.map((feature, index) => (
                                <div key={index} className={styles.featureItem}>
                                    <i className="fas fa-check-circle" style={{color: '#eab308'}}></i> {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: Brochure Form (25%) */}
                    <div className={styles.formColumn}>
                        <h3 className={styles.formTitle}>Download Brochure</h3>
                        <p className={styles.formSubtitle}>Register to receive the e-brochure.</p>
                        <form className={styles.brochureForm} onSubmit={handleBrochureSubmit} noValidate>
                            <div className={styles.inputGroup}>
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="Name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={errors.name ? {borderColor: '#ff4d4d'} : {}}
                                />
                                {errors.name && <span style={{color: '#ff4d4d', fontSize: '0.75rem', display: 'block', marginTop: '4px'}}>{errors.name}</span>}
                            </div>
                            <div className={styles.inputGroup}>
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={errors.email ? {borderColor: '#ff4d4d'} : {}}
                                />
                                {errors.email && <span style={{color: '#ff4d4d', fontSize: '0.75rem', display: 'block', marginTop: '4px'}}>{errors.email}</span>}
                            </div>
                            <div className={styles.inputGroup}>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    placeholder="Phone" 
                                    value={formData.phone}
                                    onChange={handleChange}
                                    style={errors.phone ? {borderColor: '#ff4d4d'} : {}}
                                />
                                {errors.phone && <span style={{color: '#ff4d4d', fontSize: '0.75rem', display: 'block', marginTop: '4px'}}>{errors.phone}</span>}
                            </div>
                            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>Processing... <i className="fas fa-spinner fa-spin"></i></>
                                ) : (
                                    <>Download Now <i className="fas fa-download"></i></>
                                )}
                            </button>
                        </form>
                    </div>
                </main>

                {/* Amenities Accordion Section */}
                <section className={styles.amenitiesSection}>
                    <h2 className={styles.sectionTitle} style={{textAlign: 'center', marginBottom: '2rem'}}>Premium Amenities</h2>
                    <div className={styles.accordionContainer}>
                        {property.amenitiesCategories.map((category, index) => (
                            <div key={index} className={styles.accordionItem}>
                                <button 
                                    className={`${styles.accordionHeader} ${activeAccordion === index ? styles.activeHeader : ''}`}
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span>{category.category}</span>
                                    <i className={`fas fa-chevron-down ${activeAccordion === index ? styles.rotateIcon : ''}`}></i>
                                </button>
                                <div 
                                    className={`${styles.accordionContent} ${activeAccordion === index ? styles.showContent : ''}`}
                                >
                                    <ul>
                                        {category.items.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* NEW: Full Width Gallery Section (Bento Grid) */}
                <section className={styles.gallerySection}>
                    <div className={styles.galleryHeader}>
                        <h2 className={styles.sectionTitle}>Image Gallery</h2>
                        <button className={styles.viewAllBtn} onClick={() => setShowAllPhotos(true)}>
                            <i className="fas fa-th"></i> View All Photos
                        </button>
                    </div>
                    
                    <div className={styles.bentoGrid}>
                        {/* Main Large Image (Index 0) */}
                        <div className={styles.mainPhoto} onClick={() => setShowAllPhotos(true)}>
                            {property.gallery[0] && <img src={property.gallery[0]} alt="Main View" />}
                        </div>
                        
                        {/* Side Grid (Indices 1-4) */}
                        <div className={styles.subPhotoGrid}>
                            {property.gallery.slice(1, 5).map((img, idx) => (
                                <div key={idx} className={styles.subPhotoItem} onClick={() => setShowAllPhotos(true)}>
                                    <img src={img} alt={`Gallery View ${idx + 2}`} />
                                    {/* Show overlay on the last item if there are more photos */}
                                    {idx === 3 && property.gallery.length > 5 && (
                                        <div className={styles.moreOverlay}>
                                            +{property.gallery.length - 5} More
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Full Screen Gallery Modal */}
                {showAllPhotos && (
                    <div className={styles.fullScreenGallery}>
                        <div className={styles.galleryNav}>
                            <button className={styles.closeGalleryBtn} onClick={() => setShowAllPhotos(false)}>
                                <i className="fas fa-arrow-left"></i> Back to Property
                            </button>
                            <h3>{property.title} - Gallery</h3>
                        </div>
                        <div className={styles.allPhotosGrid}>
                            {property.gallery.map((img, idx) => (
                                <div key={idx} className={styles.fullPhotoItem}>
                                    <img src={img} alt={`Full Gallery ${idx + 1}`} loading="lazy" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Media Section: Gallery, Video, Map (Moved below main content) */}
                <div className={styles.mediaSection}>
                    <div className={styles.mediaLeft}>
                        {/* 4. YouTube Video Link */}
                        <section>
                            <h2>Project Video</h2>
                            <div className={styles.videoWrapper}>
                                <iframe
                                    src={property.videoUrl}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </section>
                    </div>

                    <div className={styles.mediaRight}>
                        {/* 5. Google Map for Project Location */}
                        <section>
                            <h2>Project Location</h2>
                            <div className={styles.mapWrapper}>
                                <iframe
                                    src={property.mapUrl}
                                    width="600"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Project Location Map"
                                ></iframe>
                            </div>
                        </section>
                    </div>
                </div>

                {/* 6. Contact Us Section */}
                <section className={styles.contactSection}>
                    <h2>Interested in this Property?</h2>
                    <p>Our relationship manager is ready to assist you. Get in touch today!</p>
                    
                    <form className={styles.brochureForm} onSubmit={handleContactSubmit} noValidate style={{maxWidth: '600px', margin: '2rem auto', textAlign: 'left'}}>
                        <div className={styles.inputGroup}>
                            <input 
                                type="text" 
                                name="fullName"
                                placeholder="Full Name" 
                                value={contactFormData.fullName}
                                onChange={handleContactChange}
                                style={contactErrors.fullName ? {borderColor: '#ff4d4d'} : {}}
                            />
                            {contactErrors.fullName && <span style={{color: '#ff4d4d', fontSize: '0.75rem', display: 'block', marginTop: '4px'}}>{contactErrors.fullName}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <input 
                                type="tel" 
                                name="contactNumber"
                                placeholder="Contact Number" 
                                value={contactFormData.contactNumber}
                                onChange={handleContactChange}
                                style={contactErrors.contactNumber ? {borderColor: '#ff4d4d'} : {}}
                            />
                            {contactErrors.contactNumber && <span style={{color: '#ff4d4d', fontSize: '0.75rem', display: 'block', marginTop: '4px'}}>{contactErrors.contactNumber}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Email" 
                                value={contactFormData.email}
                                onChange={handleContactChange}
                                style={contactErrors.email ? {borderColor: '#ff4d4d'} : {}}
                            />
                            {contactErrors.email && <span style={{color: '#ff4d4d', fontSize: '0.75rem', display: 'block', marginTop: '4px'}}>{contactErrors.email}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <textarea 
                                name="message"
                                placeholder="Message" 
                                rows="4"
                                value={contactFormData.message}
                                onChange={handleContactChange}
                                style={{
                                    width: '100%', 
                                    padding: '12px 15px', 
                                    border: contactErrors.message ? '1px solid #ff4d4d' : '1px solid #ddd', 
                                    borderRadius: '5px', 
                                    fontSize: '1rem',
                                    fontFamily: 'inherit',
                                    resize: 'vertical'
                                }}
                            ></textarea>
                            {contactErrors.message && <span style={{color: '#ff4d4d', fontSize: '0.75rem', display: 'block', marginTop: '4px'}}>{contactErrors.message}</span>}
                        </div>
                        <button type="submit" className={styles.submitButton} disabled={isContactSubmitting}>
                            {isContactSubmitting ? (
                                <>Sending... <i className="fas fa-spinner fa-spin"></i></>
                            ) : (
                                <>Send Message <i className="fas fa-paper-plane"></i></>
                            )}
                        </button>
                    </form>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default ProjectShowcasePage;