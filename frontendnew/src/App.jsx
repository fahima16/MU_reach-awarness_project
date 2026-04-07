import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Page link copied!');
  };

  return (
    <div className="App"> {/* <--- This is the missing Parent box! */}
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
            <li><a href="#leaders-section">LEADERSHIP</a></li>
            <li><a href="#alumni">ALUMNI</a></li>
            <li><a href="#visit-campus">VISIT CAMPUS</a></li>
            <li><a href="#">RESOURCES</a></li>
          </ul>

          <div className="nav-actions">
            <button className="btn-share" onClick={() => window.copyUrl && window.copyUrl()}>🔗 Share</button>
          </div>
        </div>
      </header>

      <main>

        <div className="navy-divider-container">
          <hr className="navy-line" />
        </div>

        <section className="hero">
          <img src="photo7.jpeg" alt="MU Campus" className="hero-image" />
          <div className="hero-caption">
            <h2>Change Your Education</h2>
            <p>Your journey at Metropolitan University starts here. Discover excellence in research and learning.</p>
          </div>
        </section>

        <div className="container">
          <section>
            <h3 className="sec-title">Welcome to Metropolitan University</h3>
            <div className="article-content">
              <img src="photo8.jpeg" alt="Welcome to MU" className="wrapped-photo" />
              <p><strong>A Legacy of Excellence in the Heart of Sylhet.</strong> Established in 2003 by the visionary educationist Dr. Toufique Rahman Chowdhury, Metropolitan University has evolved into a premier seat of higher learning in Bangladesh. Recently achieving the prestigious 'Permanent Charter' from the Government of Bangladesh, MU stands as the first private university in the Sylhet region.</p>
              <p>Guided by the motto 'Education, Not Just a Degree,' the university is committed to fostering a research-driven environment across its sprawling permanent campus in Bateshwar. With a community of over 6,000 students and a legacy of producing global leaders now working at tech giants like Google and Amazon, MU continues to bridge the gap between academic theory and industry innovation. As we look toward the future, the university remains dedicated to providing a transformative educational experience that prepares students for the challenges of the 4th Industrial Revolution. Our graduates are not just degree holders; they are innovators and problem-solvers ready to make a global impact.</p>
            </div>
          </section>
            <aside>
            <h3 className="sec-title">Campus Spotlight 📰</h3>
            <div className="article-content">
              <img src="photo9.jpeg" alt="Campus Spotlight" className="wrapped-photo" />
              <p><strong>Innovation Beyond the Classroom.</strong> Metropolitan University continues to lead the region in technological and academic breakthroughs. Our students recently secured top honors at the NASA International Space Apps Challenge (Sylhet Division), demonstrating world-class problem-solving skills.</p>
              <p>In line with global industry shifts, MU has pioneered the first BSc (Hons) in Data Science program in the region, focusing on AI and Machine Learning. Beyond academics, the MU Rover Scout Group and our award-winning Debating Society consistently earn national recognition.</p>
            </div>
          </aside>
          <section>
            <h3 className="sec-title">Welcome to Metropolitan University</h3>
            <div className="article-content">
              <img src="photo8.jpeg" alt="Welcome to MU" className="wrapped-photo" />
              <p><strong>A Legacy of Excellence in the Heart of Sylhet.</strong> Established in 2003 by the visionary educationist Dr. Toufique Rahman Chowdhury, Metropolitan University has evolved into a premier seat of higher learning in Bangladesh. Recently achieving the prestigious 'Permanent Charter' from the Government of Bangladesh, MU stands as the first private university in the Sylhet region.</p>
              <p>Guided by the motto 'Education, Not Just a Degree,' the university is committed to fostering a research-driven environment across its sprawling permanent campus in Bateshwar. With a community of over 6,000 students and a legacy of producing global leaders now working at tech giants like Google and Amazon, MU continues to bridge the gap between academic theory and industry innovation. As we look toward the future, the university remains dedicated to providing a transformative educational experience that prepares students for the challenges of the 4th Industrial Revolution. Our graduates are not just degree holders; they are innovators and problem-solvers ready to make a global impact.</p>
            </div>
          </section>

          <aside>
            <h3 className="sec-title">Campus Spotlight 📰</h3>
            <div className="article-content">
              <img src="photo9.jpeg" alt="Campus Spotlight" className="wrapped-photo" />
              <p><strong>Innovation Beyond the Classroom.</strong> Metropolitan University continues to lead the region in technological and academic breakthroughs. Our students recently secured top honors at the NASA International Space Apps Challenge (Sylhet Division), demonstrating world-class problem-solving skills.</p>
              <p>In line with global industry shifts, MU has pioneered the first BSc (Hons) in Data Science program in the region, focusing on AI and Machine Learning. Beyond academics, the MU Rover Scout Group and our award-winning Debating Society consistently earn national recognition.</p>
            </div>
          </aside>

          

        </div>
      </main>

      {/* --- MILESTONES SECTION --- */}
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
      
    </div> /* <--- This closes the Parent box! */
  )
}

export default App