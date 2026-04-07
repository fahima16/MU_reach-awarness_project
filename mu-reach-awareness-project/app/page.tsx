'use client';

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function HomePage() {
  // ১. স্টেট ম্যানেজমেন্ট (Journey Calculator এর জন্য)
  const [journey, setJourney] = useState({ name: '', dist: 0, cost: 0, bus: '', visible: false });

  const [mapTitle, setMapTitle] = useState('Dhaka Division');
  const [mapSubtitle, setMapSubtitle] = useState('The Educational Heart');

  const lineChartRef = useRef<any>(null);
  const barChartRef = useRef<any>(null);

  const [activeSection, setActiveSection]=useState('');

  let myLineChart: any, myBarChart: any;

  // ২. শেয়ার ফাংশন
  const sharePage = () => {
    if (navigator.share) {
      navigator.share({ title: 'MU Teachers', url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // ৩. জার্নি ক্যালকুলেটর ফাংশন
  const showJourney = (name: string, dist: number, cost: number, bus: string) => {
    setJourney({ name, dist, cost, bus, visible: true });
  };

  useEffect(() => {
    const ctxLine = lineChartRef.current.getContext('2d');
    const ctxBar = barChartRef.current.getContext('2d');

    myLineChart = new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          data: [20, 40, 35, 55, 45],
          borderColor: '#c8a951',
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0,
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });

    myBarChart = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Dhaka', 'Sylhet', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'],
        datasets: [{
          data: [70, 85, 60, 50, 45, 40, 35, 30],
          backgroundColor: ['#5dade2','#f4d03f','#58d68d','#eb984e','#af7ac5','#ec7063','#48c9b0','#a569bd'],
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

  }, []);

  const updateLiveMap = (title: string, sub: string) => {
    setMapTitle(title + " Division");
    setMapSubtitle(sub);
  };

  // ৪. স্ক্রল হাইলাইটার (Navigation Active Class)
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id") || "";
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header>
        <div className="nav-bar">
          <a href="/" className="logo-area" style={{ textDecoration: 'none' }}>
            <div className="logo-icon" style={{ color: '#c8a951', fontSize: '1.4rem' }}>🎓</div>
            <div className="logo-text">
              <span style={{ color: '#c8a951', fontWeight: 600, fontSize: '1.1rem' }}>Metropolitan University</span>
            </div>
          </a>

          <ul className="nav-links">
            <li><a href="/" style={{ color: '#c8a951' }}>HOME</a></li>
            <li><a href="#leaders-section" className={activeSection === 'leaders-section' ? 'active' : ''}onClick={(e)=>setActiveSection('leaders-section')}>LEADERSHIP</a></li>
            <li><a href="#visit-campus" className={activeSection === 'visit-campus' ? 'active' : ''}onClick={()=>{setActiveSection('visit-campus');}}>VISIT CAMPUS</a></li>
            <li><a href="#">ALUMNI</a></li>
            <li><a href="#">RESOURCES</a></li>
          </ul>

          <div className="nav-actions">
            <button className="btn-share" onClick={sharePage}>🔗 Share</button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
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
              <p>Guided by the motto 'Education, Not Just a Degree,' the university is committed to fostering a research-driven environment across its sprawling permanent campus in Bateshwar. With a community of over 6,000 students and a legacy of producing global leaders now working at tech giants like Google and Amazon, MU continues to bridge the gap between academic theory and industry innovation. As we look toward the future, the university remains dedicated to providing a transformative educational experience that prepares students for the challenges of the 4th Industrial Revolution. Our graduates are not just degree holders; they are innovators and problem-solvers ready to make a global impact.</p>
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
        <hr className="navy-line" />
      </div>

      {/* Milestones Section */}
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

      {/* Faculty Leadership Section */}
      <section id="leaders-section">
        <header className="teacher-hero">
          <span className="gold-label">— FACULTY LEADERSHIP</span>
          <h1>The Minds Shaping Tomorrow</h1>
        </header>

        <section className="leaders2-section">
          <div className="leaders-grid">
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
              <img src="https://i.pravatar.cc/150?u=12" alt="Faculty" />
              <p className="leader-dept">BBA Department</p>
              <h3 className="leader-name">Dr. Fahmida Liza</h3>
              <div className="leader-info">
                <div>📍 Region: <strong>Dhaka</strong></div>
                <div>⏱️ Exp: <strong>10+ Years</strong></div>
                <div>🎓 Focus: <strong>Strategic Finance</strong></div>
              </div>
            </div>

            <div className="leader-card">
              <img src="https://i.pravatar.cc/150?u=13" alt="Faculty" />
              <p className="leader-dept">EEE Department</p>
              <h3 className="leader-name">Prof. Ahmed Rafat</h3>
              <div className="leader-info">
                <div>📍 Region: <strong>Chittagong</strong></div>
                <div>⏱️ Exp: <strong>12+ Years</strong></div>
                <div>🎓 Focus: <strong>Renewable Energy</strong></div>
              </div>
            </div>
          </div>

          <div className="btn-container">
            <a href="#" className="know-more-btn">
              Know More — View All Faculty <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }}></i>
            </a>
          </div>
            <div className="faculty-bottom-photo" style={{ marginTop: '30px', textAlign: 'center' }}>
              <img 
            src="/photo11.jpeg"  // আপনার ছবির নাম এখানে দিন
            alt="Faculty Group" 
            style={{ 
              width: '100%', 
              maxWidth: '800px', // আপনি চাইলে ছোট-বড় করতে পারেন
              borderRadius: '12px', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)' 
           }} 
          />
        </div>
        </section>
      </section>

      {/* Visit Campus Section */}
      <section id="visit-campus" className="visit-campus-section" style={{ padding: 0, margin: 0 }}>
        <hr className="section-divider" />
        <div className="map-top-image">
          <img src="/photo11.bmp" alt="Campus View" />
        </div>

        <div className="map-guide-box">
          <div className="container">
            <h2 className="section-title" style={{ color: '#c8a951' }}>Visit Campus</h2>
            <p className="section-subtitle">Plan your journey to Metropolitan University. One click to see travel costs and distance.</p>

            <div className="city-grid">
              <button className="city-btn" onClick={() => showJourney('Dhaka', 240, 600, 'Green Line / Train')}>Dhaka</button>
              <button className="city-btn" onClick={() => showJourney('Chittagong', 310, 800, 'S. Alam / Hanif')}>Chittagong</button>
              <button className="city-btn" onClick={() => showJourney('Rajshahi', 450, 1200, 'Desh Travels')}>Rajshahi</button>
              <button className="city-btn" onClick={() => showJourney('Khulna', 500, 1500, 'Hanif Enterprise')}>Khulna</button>
              <button className="city-btn" onClick={() => showJourney('Barisal', 480, 1400, 'Sakura')}>Barisal</button>
              <button className="city-btn" onClick={() => showJourney('Mymensingh', 210, 550, 'Ena / Soukhin')}>Mymensingh</button>
              <button className="city-btn" onClick={() => showJourney('Rangpur', 430, 1100, 'Hanif / SR Travels')}>Rangpur</button>
            </div>

            {journey.visible && (
              <div id="journey-result" className="journey-card">
                <h3 style={{ color: '#001f3f', borderBottom: '2px solid #c8a951', paddingBottom: '10px', marginBottom: '20px' }}>
                  Plan for {journey.name}
                </h3>
                <div className="info-row">
                  <div className="info-item">
                    <strong>Distance</strong>
                    <p>{journey.dist} km</p>
                  </div>
                  <div className="info-item">
                    <strong>Est. Cost</strong>
                    <p>৳{journey.cost}</p>
                  </div>
                  <div className="info-item">
                    <strong>Transport</strong>
                    <p>{journey.bus}</p>
                  </div>
                </div>
                <div className="housing-note">
                  <p style={{ color: '#444' }}>🏠 <strong>Accommodation:</strong> University Hostels and private mess options are available near the Bateshwar campus.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="reach-awareness-container">

          <h2 className="reach-title">MU Across Bangladesh & Beyond</h2>
          <div className="reach-underline"></div>

          <div className="reach-flex-layout">

            <div className="division-selector">

              <div className="div-card active" onClick={() => updateLiveMap('Dhaka','The Educational Heart')}>
                <h3>Dhaka</h3>
                <p>Capital Connectivity</p>
              </div>

              <div className="div-card" onClick={() => updateLiveMap('Sylhet','Campus Home Division')}>
                <h3>Sylhet</h3>
                <p>Home of MU</p>
              </div>

              <div className="div-card" onClick={() => updateLiveMap('Chittagong','Coastal Reach')}>
                <h3>Chittagong</h3>
                <p>Southern Gateway</p>
              </div>

              <div className="div-card" onClick={() => updateLiveMap('Rajshahi','Silk City')}>
                <h3>Rajshahi</h3>
                <p>Knowledge Center</p>
              </div>
              <div className="div-card" onClick={()=>updateLiveMap('Khulna', 'Industrial Reach')}>
                <h3>Khulna</h3>
                <p>Southern Link</p>
            </div>
            <div className="div-card" onClick={()=>updateLiveMap('Barisal', 'Riverine Outreach')}>
                <h3>Barisal</h3>
                <p>Venice of Bengal</p>
            </div>
            <div className="div-card" onClick={()=>updateLiveMap('Rangpur', 'Northern Gateway')}>
                <h3>Rangpur</h3>
                <p>North-End Link</p>
            </div>
            <div className="div-card" onClick={()=>updateLiveMap('Mymensingh', 'Cultural Connectivity')}>
                <h3>Mymensingh</h3>
                <p>Old Brahmaputra Hub</p>
            </div>

            </div>

            <div className="live-console">
              

              <div className="live-console">

  <div className="console-top">
    <span className="status-dot">●</span> 
    <span className="live-label">LIVE SYSTEM STATUS</span>

    <h4>{mapTitle}</h4>
    <p>{mapSubtitle}</p>
  </div>

  <div className="chart-box" style={{ height: '180px' }}>
    <p className="chart-label">Growth Trend</p>
    <canvas ref={lineChartRef}></canvas>
  </div>

  <div className="chart-box" style={{ height: '250px' }}>
    <p className="chart-label">Reach Percentage by Division</p>
    <canvas ref={barChartRef}></canvas>
  </div>

  <div className="console-bottom">
    <p>Network: <strong>MU Reach v3.0 (2026)</strong></p>
    <button className="live-btn">Update Live</button>
  </div>

</div>

            </div>

          </div>

        </section>
    </>
  );
}