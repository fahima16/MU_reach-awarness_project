"use client"; // ক্লিক এবং স্ক্রল লজিকের জন্য এটি প্রয়োজন

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  
  // শেয়ার ফাংশন
  const copyUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Page link copied!');
    }
  };

  // স্মার্ট নেভিগেশন হাইলাইটার (আপনার দেওয়া স্ক্রিপ্ট অনুযায়ী)
  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('#leaders-section') as HTMLElement;
      const navLink = document.querySelector('a[href="#leaders-section"]') as HTMLElement;
      
      if (section && navLink) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          navLink.style.color = "#c8a951"; 
          navLink.style.borderBottom = "2px solid #c8a951";
        } else {
          navLink.style.color = ""; 
          navLink.style.borderBottom = "none";
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header>
        <div className="nav-bar">
          <Link href="/" className="logo-area" style={{ textDecoration: 'none' }}>
            <div className="logo-icon" style={{ color: '#c8a951', fontSize: '1.4rem' }}>🎓</div>
            <div className="logo-text">
              <span style={{ color: '#c8a951', fontWeight: 600, fontSize: '1.1rem' }}>Metropolitan University</span>
            </div>
          </Link>

          <ul className="nav-links">
            <li><Link href="/" style={{ color: '#c8a951' }}>HOME</Link></li>
            <li><a href="#leaders-section">LEADERSHIP</a></li>
            <li><a href="#">VISIT CAMPUS</a></li>
            <li><Link href="/all-alumni">ALUMNI</Link></li>
            <li><a href="#">RESOURCES</a></li>
          </ul>

          <div className="nav-actions">
            <button className="btn-share" onClick={copyUrl}>🔗 Share</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <img src="/photo7.jpeg" alt="MU Campus" className="hero-image" />
          <div className="hero-caption">
            <h2>Change Your Education</h2>
            <p>Your journey at Metropolitan University starts here. Discover excellence in research and learning.</p>
          </div>
        </section>

        <div className="container">
          <section>
            <h3 className="sec-title">Welcome to Metropolitan University</h3>
            <div className="article-content">
              <img src="/photo8.jpeg" alt="Welcome to MU" className="wrapped-photo" />
              <p><strong>A Legacy of Excellence in the Heart of Sylhet.</strong> Established in 2003 by the visionary educationist Dr. Toufique Rahman Chowdhury, Metropolitan University has evolved into a premier seat of higher learning in Bangladesh. MU stands as the first private university in the Sylhet region.</p>
              <p>Guided by the motto 'Education, Not Just a Degree,' the university is committed to fostering a research-driven environment across its sprawling permanent campus in Bateshwar. </p>
            </div>
          </section>

          <aside>
            <h3 className="sec-title">Campus Spotlight 📰</h3>
            <div className="article-content">
              <img src="/photo9.jpeg" alt="Campus Spotlight" className="wrapped-photo" />
              <p><strong>Innovation Beyond the Classroom.</strong> Metropolitan University continues to lead the region in technological and academic breakthroughs.</p>
            </div>
          </aside>
        </div>
      </main>

      <div className="navy-divider-container">
        <hr className="navy-line" />
      </div>

      <section className="milestones-section">
        <h2 className="milestones-title">Our Pride & Milestones</h2>
        <div className="milestones-grid">
          <div className="milestone-card blue">
            <span className="m-icon">🎓</span>
            <h3>6,000+</h3>
            <p>Current Students</p>
          </div>
          <div className="milestone-card gold">
            <span className="m-icon">🏅</span>
            <h3>1st</h3>
            <p>Permanent Charter in Sylhet</p>
          </div>
          {/* বাকি মাইলস্টোন কার্ডগুলো এখানে বসবে */}
        </div>
      </section>

      <section id="leaders-section">
        <header className="teacher-hero">
          <span className="gold-label">— FACULTY LEADERSHIP</span>
          <h1>The Minds Shaping Tomorrow</h1>
        </header>

        <div className="leaders-grid">
          {/* Faculty Card 1 */}
          <div className="leader-card">
            <img src="https://i.pravatar.cc/150?u=11" alt="Faculty" />
            <p className="leader-dept">CSE Department</p>
            <h3 className="leader-name">Prof. Dr. M. Choudhury</h3>
            <div className="leader-info">
              <div>📍 Region: <strong>Sylhet</strong></div>
              <div>🎓 Focus: <strong>AI & Robotics</strong></div>
            </div>
          </div>
          {/* বাকি কার্ডগুলো হুবহু আগের মত থাকবে */}
        </div>

        <div className="btn-container" style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link href="/all-teachers" className="know-more-btn">
            Know More — View All Faculty
          </Link>
        </div>
      </section>
    </>
  );
}