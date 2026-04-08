import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';

function App() {
  const [count, setCount] = useState(0);
  
  // 1. URL Copy Function
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Page link copied!');
  };

  // 2. Scroll Highlight Logic


 useEffect(() => {
    const handleScroll = () => {
      // Amra shob ID wala section track korchi
      const sections = ['home-section', 'leaders-section', 'alumni']; 
      const scrollPos = window.scrollY + 250; // Offset ektu baralam jate agey dhorbe

      sections.forEach(id => {
        const section = document.getElementById(id);
        const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (section && navLink) {
          const offsetTop = section.offsetTop;
          const height = section.offsetHeight;

          if (scrollPos >= offsetTop && scrollPos < offsetTop + height) {
            navLink.classList.add('active-link');
          } else {
            navLink.classList.remove('active-link');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Ekbar call kora jate load hobar sathe sathe kaj kore
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <header>
        <div className="nav-bar">
          <a href="/" className="logo-area" style={{ textDecoration: 'none' }}>
            <div className="logo-icon" style={{ color: '#c8a951', fontSize: '1.4rem' }}>🎓</div>
            <div className="logo-text">
              <span style={{ color: '#c8a951', fontWeight: 600, fontSize: '1.1rem' }}>Metropolitan University</span>
            </div>
          </a>

        
          <ul className="nav-links">
  {/* '/' er bodole '#' link gulo ekhon logic-er sathe connect hobe */}
  <li>
    <a href="#home-section">HOME</a>
  </li>
  
  <li>
    <a href="#leaders-section">LEADERSHIP</a>
  </li>
  
  <li>
    <a href="#alumni">ALUMNI</a>
  </li>
  
  <li>
    <a href="#visit-campus">VISIT CAMPUS</a>
  </li>
  
  <li>
    <a href="#resources">RESOURCES</a>
  </li>
</ul>

          <div className="nav-actions">
            <button className="btn-share" onClick={copyUrl}>🔗 Share</button>
          </div>
        </div>
      </header>

      <main>
  {/* Shobar upore ID bishano holo jate 'HOME' highlight hoy */}
  <section id="home-section">
    <div className="navy-divider-container">
      <hr className="navy-line" />
    </div>

    <section className="hero">
      <img src="photo7.jpeg" alt="MU Campus" className="hero-image" />
      <div className="hero-caption">
        <h2>Change Your Education</h2>
        <p>
          Your journey at Metropolitan University starts here. Discover excellence in research and learning.
        </p>
      </div>
    </section>

    <div className="container">
      {/* Welcome Section */}
      <section>
        <h3 className="sec-title">Welcome to Metropolitan University</h3>
        <div className="article-content">
          <img src="photo8.jpeg" alt="Welcome to MU" className="wrapped-photo" />
          <p>
            <strong>A Legacy of Excellence in the Heart of Sylhet.</strong> Established in 2003 by the visionary educationist Dr. Toufique Rahman Chowdhury, Metropolitan University has evolved into a premier seat of higher learning in Bangladesh. Recently achieving the prestigious 'Permanent Charter' from the Government of Bangladesh, MU stands as the first private university in the Sylhet region.
          </p>
          <p>
            Guided by the motto 'Education, Not Just a Degree,' the university is committed to fostering a research-driven environment across its sprawling permanent campus in Bateshwar. With a community of over 6,000 students and a legacy of producing global leaders now working at tech giants like Google and Amazon, MU continues to bridge the gap between academic theory and industry innovation. As we look toward the future, the university remains dedicated to providing a transformative educational experience that prepares students for the challenges of the 4th Industrial Revolution. Our graduates are not just degree holders; they are innovators and problem-solvers ready to make a global impact.
          </p>
        </div>
      </section>

      {/* Campus Spotlight Section */}
      <aside>
        <h3 className="sec-title">Campus Spotlight 📰</h3>
        <div className="article-content">
          <img src="photo9.jpeg" alt="Campus Spotlight" className="wrapped-photo" />
          <p>
            <strong>Innovation Beyond the Classroom.</strong> Metropolitan University continues to lead the region in technological and academic breakthroughs. Our students recently secured top honors at the NASA International Space Apps Challenge (Sylhet Division), demonstrating world-class problem-solving skills.
          </p>
          <p>
            In line with global industry shifts, MU has pioneered the first BSc (Hons) in Data Science program in the region, focusing on AI and Machine Learning. Beyond academics, the MU Rover Scout Group and our award-winning Debating Society consistently earn national recognition.
          </p>
        </div>
      </aside>
    </div>
  </section> {/* --- End of home-section --- */}
</main>
      {/* --- MILESTONES SECTION --- */}
      <section className="milestones-section">
        <div className="milestones-header">
          <h1 className="milestones-main-title">Our Pride & Milestones</h1>
          <div className="gold-gradient-line"></div>
          <p className="milestones-sub-text">Celebrating excellence across campus and beyond</p>
        </div>

        <div className="mu-main-container">
          <div className="navy-header-box">
            <h3>Recent Club Achievements</h3>
            <p>Our student clubs continue to shine on national and international stages</p>
          </div>

          <div className="club-showcase-grid">
            <div className="showcase-card">
              <div className="image-container">
                <img src="football.jpg" alt="Football" />
                <span className="badge-champions">CHAMPIONS</span>
              </div>
              <h4>MU Football Club</h4>
              <span>Champions League Winners 2025</span>
            </div>
            <div className="showcase-card">
              <div className="image-container">
                <img src="rugby.jpg" alt="Rugby" />
                <span className="badge-rising">RISING STARS</span>
              </div>
              <h4>MU Rugby Club</h4>
              <span>Regional Tournament Semi-Finalists</span>
            </div>
            <div className="showcase-card">
              <div className="image-container">
                <img src="athletics.jpg" alt="Athletics" />
                <span className="badge-record">RECORD BREAKERS</span>
              </div>
              <h4>MU Athletics Club</h4>
              <span>National Pride & Excellence</span>
            </div>
          </div>
          
          <div className="footer-detail-text">
            <p>The MU Football Club recently clinched the Inter-University Champions League title in a stunning display of athletic prowess and strategic excellence. The final match, held at the National Stadium, saw our team triumph...</p>
          </div>
        </div>

        <div className="milestones-grid">
          <div className="milestone-card blue"><h3>6,000+</h3><p>Current Students</p></div>
          <div className="milestone-card green"><h3>20+</h3><p>Years of Excellence</p></div>
          <div className="milestone-card purple"><h3>Global</h3><p>Alumni Network</p></div>
          <div className="milestone-card gold"><h3>1st</h3><p>Permanent Charter</p></div>
        </div>
      </section>

      {/* --- LEADERS SECTION --- */}
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
            <a href="/all-teachers" className="know-more-btn">
              Know More — View All Faculty <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }}></i>
            </a>
          </div>
        </section>
      </section>



      {/* --- ALUMNI SECTION START --- */}
<section id="alumni" className="alumni-main-section">
    <div className="header-content">
        <h1>Our Graduates, <span className="highlight">Global Impact</span></h1>
        <p>Building the future with Metropolitan University alumni.</p>
    </div>

    <div className="alumni-wrapper">
        {/* Card 1 */}
        <div className="glass-card">
            <div className="profile-area">
                <img src="photo5.jpeg" alt="Nafiul Adnan Chowdhury" />
                <a href="https://www.linkedin.com/in/nafiul-adnan/" target="_blank" rel="noreferrer" className="social-badge">
                    <i className="fab fa-linkedin-in"></i>
                </a>
            </div>
            <div className="card-info">
                <h3>Nafiul Adnan Chowdhury</h3>
                <span className="batch">CSE • Class of 2018</span>
                <div className="company-logo">
                    <i className="fab fa-microsoft"></i> <span>Security Software Engineer</span>
                </div>
            </div>
        </div>

        {/* Card 2 */}
        <div className="glass-card">
            <div className="profile-area">
                <img src="photo4.jpeg" alt="Majharul Islam Rafat" />
                <a href="#" className="social-badge"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <div className="card-info">
                <h3>Majharul Islam Rafat</h3>
                <span className="batch">BBA • Class of 2019</span>
                <div className="company-logo">
                    <img src="https://www.genesys.com/favicon.ico" className="icon-img" alt="logo" /> 
                    <span>Senior Software Engineer</span>
                </div>
            </div>
        </div>

        {/* Card 3 */}
        <div className="glass-card">
            <div className="profile-area">
                <img src="photo3.jpeg" alt="Foysol Ahmed Shuvo" />
                <a href="https://www.linkedin.com/in/foysol-ahmed-shuvo/" target="_blank" rel="noreferrer" className="social-badge">
                    <i className="fab fa-linkedin-in"></i>
                </a>
            </div>
            <div className="card-info">
                <h3>Foysol Ahmed Shuvo</h3>
                <span className="batch">EEE • Class of 2017</span>
                <div className="company-logo">
                    <img src="https://www.agoda.com/favicon.ico" className="icon-img" alt="logo" /> 
                    <span>Software Engineer</span>
                </div>
            </div>
        </div>

        {/* Card 4 */}
        <div className="glass-card">
            <div className="profile-area">
                <img src="photo2.jpeg" alt="Amanur Rahman" />
                <a href="https://www.linkedin.com/in/amanur-rahman/" target="_blank" rel="noreferrer" className="social-badge">
                    <i className="fab fa-linkedin-in"></i>
                </a>
            </div>
            <div className="card-info">
                <h3>Amanur Rahman</h3>
                <span className="batch">English • Class of 2020</span>
                <div className="company-logo">
                    <i className="fab fa-google"></i> <span>Software Engineer</span>
                </div>
            </div>
        </div>
    </div>

    <div className="btn-container">
        <a href="/all-alumni" className="view-all-link">
            View All Alumni <i className="fas fa-arrow-right"></i>
        </a>
    </div>
</section>
{/* --- ALUMNI SECTION END --- */}



    </div>
  );
}

export default App;