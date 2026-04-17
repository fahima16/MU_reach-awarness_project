import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './all-alumni.css';
import AlumniRegistration from './components/AlumniRegistration';

const AllAlumni = () => {
    // স্লাইডারের জন্য স্টেট
    const [currentSlide, setCurrentSlide] = useState(0);

    const testimonials = [
        {
            text: "MU was the foundation of my professional life.",
            author: "Rakib Hasan, Amazon"
        },
        {
            text: "The alumni network here is incredibly supportive.",
            author: "Sarah Khan, Meta"
        }
    ];

    // স্লাইডার অটোমেটিক চেঞ্জ করার লজিক
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="alumni-page-wrapper" style={{ backgroundColor: '#050a18', color: 'white', minHeight: '100vh', scrollBehavior: 'smooth' }}>
            {/* Header */}
            <header className="nav-header" style={{ padding: '20px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="nav-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to="/" className="nav-link" style={{ color: 'white', textDecoration: 'none', fontWeight: '600', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '8px 20px', borderRadius: '50px' }}>
                        Connect with Index <i className="fas fa-users"></i>
                    </Link>
                </div>
            </header>

            <div className="alumni_container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                {/* Stats Bar */}
                <div className="stats-bar" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', margin: '60px 0', background: 'rgba(255, 255, 255, 0.03)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center' }}>
                    <div className="stat-item"><h2 style={{ color: '#3b82f6', fontSize: '2.5rem', margin: '0' }}>12+</h2><p style={{ color: '#a0a0a0' }}>🌍 Countries</p></div>
                    <div className="stat-item"><h2 style={{ color: '#3b82f6', fontSize: '2.5rem', margin: '0' }}>500+</h2><p style={{ color: '#a0a0a0' }}>🏢 Companies</p></div>
                    <div className="stat-item"><h2 style={{ color: '#3b82f6', fontSize: '2.5rem', margin: '0' }}>3,000+</h2><p style={{ color: '#a0a0a0' }}>👥 Graduates</p></div>
                    <div className="stat-item"><h2 style={{ color: '#3b82f6', fontSize: '2.5rem', margin: '0' }}>20</h2><p style={{ color: '#a0a0a0' }}>⭐ Years of Excellence</p></div>
                </div>

                {/* Filter Section */}
                <div className="filter-section" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '25px', borderRadius: '15px', display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '40px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div className="search-box" style={{ flex: '1', minWidth: '200px', position: 'relative' }}>
                        <i className="fas fa-search" style={{ position: 'absolute', left: '15px', top: '15px', color: '#a0a0a0' }}></i>
                        <input type="text" placeholder="Search alumni..." style={{ width: '100%', padding: '12px 40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }} />
                    </div>
                    <select style={{ flex: '1', padding: '12px', borderRadius: '10px', background: '#101827', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}><option>Department (All)</option><option>CSE</option><option>BBA</option></select>
                    <select style={{ flex: '1', padding: '12px', borderRadius: '10px', background: '#101827', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}><option>Country (All)</option><option>USA</option><option>UK</option></select>
                    <select style={{ flex: '1', padding: '12px', borderRadius: '10px', background: '#101827', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}><option>Batch Year</option><option>2019</option><option>2018</option></select>
                </div>

                {/* Alumni Grid */}
                <div className="alumni-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px', marginBottom: '80px' }}>
                    <div className="alumni-card" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '20px', textAlign: 'center' }}>
                        <img src="https://i.pravatar.cc/150?u=1" className="card-img" style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '15px', border: '2px solid #3b82f6' }} alt="Alumni" />
                        <h3>Ahmed Rahman</h3>
                        <p style={{ color: '#3b82f6' }}>Google • CSE</p>
                    </div>
                    <div className="alumni-card" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '20px', textAlign: 'center' }}>
                        <img src="https://i.pravatar.cc/150?u=2" className="card-img" style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '15px', border: '2px solid #3b82f6' }} alt="Alumni" />
                        <h3>Nusrat Jahan</h3>
                        <p style={{ color: '#3b82f6' }}>Microsoft • BBA</p>
                    </div>
                </div>

                {/* Featured Story */}
                {/* Featured Story */}
<div className="featured-story" style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
    gap: '40px', 
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(0,0,0,0))', 
    padding: '50px', 
    borderRadius: '30px', 
    border: '1px solid rgba(255, 255, 255, 0.1)', 
    marginBottom: '20px', /* Onek koman hobe ekhane */
    alignItems: 'center' 
}}>
    <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600" className="featured-img" style={{ width: '100%', borderRadius: '20px' }} alt="Featured Story" />
    <div className="story-text">
        <span style={{ color: '#3b82f6', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem' }}>Featured Journey</span>
        <h2 style={{ fontSize: '2.2rem', margin: '10px 0' }}>From Sylhet to Google Dublin</h2>
        <p>Meet Tanvir Ishrak, Class of '16.</p>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', fontStyle: 'italic', borderLeft: '4px solid #3b82f6' }}>
            "MU gave me the logic, the world gave me the platform."
        </div>
    </div>
</div>

{/* Global Presence Map */}
<div className="map-section" style={{ textAlign: 'center', marginBottom: '80px', paddingTop: '0px' }}> {/* Padding top 0 koro */}
    <h2 style={{ marginBottom: '20px' }}>Our Global Presence</h2> {/* Title-er nicher gap-o komano holo */}
    <div className="map-placeholder" style={{ width: '100%', height: '400px', background: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg') no-repeat center", backgroundSize: 'contain', position: 'relative', opacity: '0.4', filter: 'invert(1)' }}>
        <div className="pin" style={{ position: 'absolute', width: '12px', height: '12px', background: '#ff3e3e', borderRadius: '50%', top: '30%', left: '20%' }} title="USA"></div>
        <div className="pin" style={{ position: 'absolute', width: '12px', height: '12px', background: '#ff3e3e', borderRadius: '50%', top: '40%', left: '65%' }} title="Bangladesh"></div>
    </div>
</div>

                {/* Testimonial Slider */}
                <div className="testimonial-slider" style={{ maxWidth: '800px', margin: '0 auto 80px auto', textAlign: 'center', padding: '40px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '24px' }}>
                    <div className="slide active">
                        <p style={{ fontSize: '1.2rem' }}>"{testimonials[currentSlide].text}"</p>
                        <h4 style={{ color: '#3b82f6' }}>- {testimonials[currentSlide].author}</h4>
                    </div>
                </div>

                {/* Join CTA */}
                <div className="join-cta" style={{ background: 'linear-gradient(45deg, #1d4ed8, #3b82f6)', padding: '60px', textAlign: 'center', borderRadius: '30px', marginBottom: '50px' }}>
                    <p>Are you a MU Graduate?</p>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Join our Alumni Network</h2>
                    {/* ID link updated here */}
                    <a href="#alumni-reg-form" style={{ display: 'inline-block', padding: '15px 40px', background: 'white', color: '#1d4ed8', textDecoration: 'none', borderRadius: '50px', fontWeight: 'bold', marginTop: '20px' }}>Register Here </a>
                </div>

                {/* --- ADDED REGISTRATION FORM SECTION --- */}
                <div id="alumni-reg-form" style={{ paddingBottom: '100px' }}>
                    <AlumniRegistration />
                </div>
            </div>
        </div>
    );
};


export default AllAlumni;

