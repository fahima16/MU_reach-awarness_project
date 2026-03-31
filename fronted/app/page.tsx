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
              <p><strong>A Legacy of Excellence in the Heart of Sylhet.</strong> Established in 2003 by the visionary educationist Dr. Toufique Rahman Chowdhury, Metropolitan University has evolved into a premier seat of higher learning in Bangladesh. Recently achieving the prestigious 'Permanent Charter' from the Government of Bangladesh, MU stands as the first private university in the Sylhet region.</p>
          
              <p>Guided by the motto 'Education, Not Just a Degree,' the university is committed to fostering a research-driven environment across its sprawling permanent campus in Bateshwar. With a community of over 6,000 students and a legacy of producing global leaders now working at tech giants like Google and Amazon, MU continues to bridge the gap between academic theory and industry innovation.As we look toward the future, the university remains dedicated to providing a transformative educational experience that prepares students for the challenges of the 4th Industrial Revolution. Our graduates are not just degree holders; they are innovators and problem-solvers ready to make a global impact.</p>
            </div>
          </section>

          <aside>
            <h3 className="sec-title">Campus Spotlight 📰</h3>
            <div className="article-content">
              <img src="/photo9.jpeg" alt="Campus Spotlight" className="wrapped-photo" />
              <p><strong>Innovation Beyond the Classroom.</strong> Metropolitan University continues to lead the region in technological and academic breakthroughs. Our students recently secured top honors at the NASA International Space Apps Challenge (Sylhet Division), demonstrating world-class problem-solving skills.</p>
          
              <p>In line with global industry shifts, MU has pioneered the first BSc (Hons) in Data Science program in the region, focusing on AI and Machine Learning. Beyond academics, the MU Rover Scout Group and our award-winning Debating Society consistently earn national recognition.</p>
        </div>
          </aside>
        </div>
      </main>

      <div className="navy-divider-container">
        <hr 
          className="navy-line" 
          style={{ backgroundColor: '#0c1520', height: '2px', border: 'none', opacity: 0.2 }}
        />
      </div>

      <section className="milestones-section">
        <h2 className="milestones-title">Our Pride & Milestones</h2>
        <div className="milestones-grid">
          <div className="milestone-card blue">
            <span className="m-icon">🎓</span>
            <h3>6,000+</h3>
            <p>Current Students</p>
          </div>
          <div className="milestone-card green">
            <span className="m-icon">🏢</span>
            <h3>20+</h3>
            <p>Years of Excellence</p>
        </div>
        <div className="milestone-card purple">
            <span className="m-icon">📍</span>
            <h3>Global</h3>
            <p>Alumni Network</p>
        </div>
          <div className="milestone-card gold">
            <span className="m-icon">🏅</span>
            <h3>1st</h3>
            <p>Permanent Charter in Sylhet</p>
          </div>
        </div>

        <div className="highlights-row">
        <div className="h-item">✅ UGC Approved</div>
        <div className="h-item">✅ Ranked Top University in Sylhet</div>
        <div className="h-item">✅ 10,000+ Alumni Globally</div>
        <div className="h-item">✅ Modern Research Facilities</div>
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
              <div>⏱️ Exp: <strong>15+ Years</strong></div>
              <div>🎓 Focus: <strong>AI & Robotics</strong></div>
            </div>
          </div>

          <div className="leader-card">
              <img src="https://i.pravatar.cc/150?u=12" alt="Faculty"/>
              <p className="leader-dept">BBA Department</p>
              <h3 className="leader-name">Dr. Fahmida Liza</h3>
              <div className="leader-info">
                  <div>📍 Region: <strong>Dhaka</strong></div>
                  <div>⏱️ Exp: <strong>10+ Years</strong></div>
                  <div>🎓 Focus: <strong>Strategic Finance</strong></div>
              </div>
          </div>
          <div className="leader-card">
                <img src="https://i.pravatar.cc/150?u=13" alt="Faculty"/>
                <p className="leader-dept">EEE Department</p>
                <h3 className="leader-name">Prof. Ahmed Rafat</h3>
                <div className="leader-info">
                    <div>📍 Region: <strong>Chittagong</strong></div>
                    <div>⏱️ Exp: <strong>12+ Years</strong></div>
                    <div>🎓 Focus: <strong>Renewable Energy</strong></div>
                </div>
          </div>
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