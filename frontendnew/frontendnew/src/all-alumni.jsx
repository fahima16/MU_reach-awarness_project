import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './all-alumni.css';
import AlumniRegistration from './components/AlumniRegistration';

const AllAlumni = () => {
    // স্লাইডারের জন্য স্টেট
    const [alumniList, setAlumniList] = useState([]); // ডাটাবেজ থেকে আসা মেইন লিস্ট
    const [search, setSearch] = useState('');
    const [dept, setDept] = useState('All');
    const [country, setCountry] = useState('All');
    const [batch, setBatch] = useState('');
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
    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                // তোমার ব্যাকএন্ড পোর্টের সাথে URL মিলিয়ে নিও (যেমন: 5000)
                const res = await axios.get(`https://mu-reach-awarness-project.onrender.com/api/alumni?search=${search}&department=${dept}&country=${country}&batchYear=${batch}`);
                setAlumniList(res.data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchAlumni();
    }, [search, dept, country, batch]);

    // স্লাইডার অটোমেটিক চেঞ্জ করার লজিক
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const getMapPosition = (countryName) => {
        const positions = {
            'USA': { top: '30%', left: '18%' },
            'Canada': { top: '25%', left: '15%' },
            'UK': { top: '28%', left: '48%' },
            'Bangladesh': { top: '55%', left: '72%' },
            'Germany': { top: '30%', left: '52%' },
            'Australia': { top: '75%', left: '85%' },
        };
        return positions[countryName] || { top: '50%', left: '50%' }; // ডিফল্ট পজিশন
    };

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
                {/*<div className="filter-section" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '25px', borderRadius: '15px', display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '40px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div className="search-box" style={{ flex: '1', minWidth: '200px', position: 'relative' }}>
                        <i className="fas fa-search" style={{ position: 'absolute', left: '15px', top: '15px', color: '#a0a0a0' }}></i>
                        <input type="text" placeholder="Search alumni..." style={{ width: '100%', padding: '12px 40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }} />
                    </div>
                    <select style={{ flex: '1', padding: '12px', borderRadius: '10px', background: '#101827', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}><option>Department (All)</option><option>CSE</option><option>BBA</option></select>
                    <select style={{ flex: '1', padding: '12px', borderRadius: '10px', background: '#101827', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}><option>Country (All)</option><option>USA</option><option>UK</option></select>
                    <select style={{ flex: '1', padding: '12px', borderRadius: '10px', background: '#101827', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}><option>Batch Year</option><option>2019</option><option>2018</option></select>
                </div>*/}

                <div className="filter-section" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '25px', borderRadius: '15px', display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '40px' }}>
                    <div className="search-box" style={{ flex: '2', minWidth: '200px', position: 'relative' }}>
                        <i className="fas fa-search" style={{ position: 'absolute', left: '15px', top: '15px', color: '#a0a0a0' }}></i>
                        <input 
                            type="text" 
                            placeholder="Search by name..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '100%', padding: '12px 40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} 
                        />
                    </div>
                    <select onChange={(e) => setDept(e.target.value)} style={{ flex: '1', padding: '12px', borderRadius: '10px', background: '#101827', color: 'white' }}>
                        <option value="All">Department (All)</option>
                        <option value="CSE">CSE</option>
                        <option value="BBA">BBA</option>
                        <option value="English">English</option>
                    </select>
                    <select onChange={(e) => setCountry(e.target.value)} style={{ flex: '1', padding: '12px', borderRadius: '10px', background: '#101827', color: 'white' }}>
                        <option value="All">Country (All)</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                        <option value="Bangladesh">Bangladesh</option>
                    </select>
                    <input 
                        type="number" 
                        placeholder="Year" 
                        onChange={(e) => setBatch(e.target.value)}
                        style={{ flex: '0.5', padding: '12px', borderRadius: '10px', background: '#101827', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }} 
                    />
                </div>

                {/* Alumni Grid */}
                {/*<div className="alumni-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px', marginBottom: '80px' }}>
                    <div className="alumni-card" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '20px', textAlign: 'center' }}>
                        <img src="alumni2.jpeg" className="card-img" style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '15px', border: '2px solid #3b82f6' }} alt="Alumni" />
                        <h3>Emrul Chowdhury</h3>
                        <p style={{ color: '#3b82f6' }}>Software Engineer • Amazon</p>
                    </div>
                    <div className="alumni-card" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '20px', textAlign: 'center' }}>
                        <img src="alumni3.jpeg" className="card-img" style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '15px', border: '2px solid #3b82f6' }} alt="Alumni" />
                        <h3>Mahmudul Hasan</h3>
                        <p style={{ color: '#3b82f6' }}>Practice Manager • Canada</p>
                    </div>

                    <div className="alumni-card" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '20px', textAlign: 'center' }}>
                        <img src="ALUMNI4.jpeg" className="card-img" style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '15px', border: '2px solid #3b82f6' }} alt="Alumni" />
                        <h3>Syeda Sadia Alam</h3>
                        <p style={{ color: '#3b82f6' }}>PhD Fellow  • USA</p>
                    </div>
                </div>*/}

                <div className="alumni-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px', marginBottom: '80px' }}>
                    {alumniList.map((alumni) => (
                        <div key={alumni._id} className="alumni-card" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '20px', textAlign: 'center' }}>
                            <img src={alumni.photoUrl || 'default-alumni.png'} className="card-img" style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '15px', border: '2px solid #3b82f6', objectFit: 'cover' }} alt={alumni.fullName} />
                            <h3>{alumni.fullName}</h3>
                            <p style={{ color: '#3b82f6' }}>{alumni.recentInvolvement}</p>
                            <p style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>{alumni.department} • {alumni.country}</p>
                        </div>
                    ))}
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
    <img src="alumni.png" className="featured-img" style={{ width: '100%', borderRadius: '20px' }} alt="Featured Story" />
    <div className="story-text">
        <span style={{ color: '#3b82f6', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem' }}>Featured Journey</span>
        <h2 style={{ fontSize: '2.5rem', margin: '10px 0' }}>From Sylhet to Queen's University , Canada</h2>
        <p style={{ marginBottom: '45px', color: '#a0a0a0' }}>Fully Funded PhD | CSE 37th</p>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', fontStyle: 'italic', borderLeft: '4px solid #3b82f6' }}>
        "MU gave me the logic, the world gave me the platform."
    </div>
    </div>
</div>

{/* Global Presence Map */}
<div className="map-section" style={{ textAlign: 'center', marginBottom: '80px', paddingTop: '0px' }}> {/* Padding top 0 koro */}
    <h2 style={{ marginBottom: '20px' }}>Our Global Presence</h2> {/* Title-er nicher gap-o komano holo */}
    <div className="map-wrapper" style={{ position: 'relative', width: '100%', height: '500px', background: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg') no-repeat center", backgroundSize: 'contain', filter: 'invert(1)', opacity: '0.6' }}>
                        {alumniList.map((alumni, index) => {
                            const pos = getMapPosition(alumni.country);
                            return (
                                <div 
                                    key={index}
                                    className="glowing-pin" 
                                    style={{ 
                                        position: 'absolute', 
                                        width: '12px', height: '12px', 
                                        background: '#3b82f6', borderRadius: '50%', 
                                        top: pos.top, left: pos.left,
                                        boxShadow: '0 0 15px #3b82f6',
                                        cursor: 'pointer'
                                    }} 
                                    /*title={`${alumni.fullName} (${alumni.country})`} // মাউস রাখলে নাম ও দেশ দেখাবে*/
                                    
                                >
                                <span className="tooltip-text" style={{
                    visibility: 'hidden',
                    width: '120px',
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    textAlign: 'center',
                    borderRadius: '6px',
                    padding: '5px 0',
                    position: 'absolute',
                    zIndex: '1',
                    bottom: '125%', 
                    left: '50%',
                    marginLeft: '-60px',
                    opacity: '0',
                    transition: 'opacity 0.3s'
                }}>
                    ({alumni.country})
                </span>
                                </div>
                            );
                        })}
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

