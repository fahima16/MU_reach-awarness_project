"use client";

import { useEffect } from "react";
import "./faculty.css";

export default function FacultyPage() {

  useEffect(() => {

    // ── SCROLL REVEAL ──
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));

    // ── BARS ANIMATION ──
    const barObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".bar-fill,.district-bar-fill,.poll-bar-fill").forEach((bar: any) => {
            setTimeout(() => {
              bar.style.width = bar.dataset.width;
            }, 200);
          });

          const circle = e.target.querySelector("#donutCircle") as SVGCircleElement;
          if (circle) {
            setTimeout(() => {
              circle.style.strokeDashoffset = String(502 * (1 - 0.96));
            }, 300);
          }

          barObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll(".graphs-section,.map-section,.poll-section")
      .forEach(s => barObs.observe(s));

  }, []);

  // ── FUNCTIONS ──
  const toggleMenu = () => {
    document.getElementById("mobileMenu")?.classList.toggle("open");
  };

  const toggleHidden = (show: boolean) => {
    const f = document.getElementById("hiddenField");
    if (show) f?.classList.add("visible");
    else f?.classList.remove("visible");
  };

  const submitFeedback = (e: any) => {
    e.preventDefault();
    document.getElementById("feedbackForm")!.style.display = "none";
    document.getElementById("successMsg")!.classList.add("show");
  };

  const submitReg = (e: any) => {
    e.preventDefault();
    document.getElementById("regForm")!.style.display = "none";
    document.getElementById("regSuccessMsg")!.classList.add("show");
  };

  return (
    <>
      {/* NAV */}
      <nav>
        <a href="/" className="nav-link">Go Back</a>

        <div className="hamburger" onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
            <div className="hero-eyebrow">Faculty Panel</div>
          <h1 className="hero-title">
            The Minds <br /> Shaping <em>Tomorrow</em>
          </h1>
          <p className="hero-sub">
            Meet the dedicated educators of Metropolitan University — experts who inspire, guide, and transform the next generation of Bangladesh's leaders.
          </p>
          <div className="hero-btns">
          <a href="#teachers" className="btn-gold">Meet Our Teachers</a>
          <a href="#feedback-form" className="btn-ghost">Submit Feedback</a>
        </div>
        </div>

        <div className="hero-right">
          <div className="hero-stat">
            <div className="stat-num">320+</div>
            <div className="stat-info">
              <div className="stat-lbl">Expert Faculty</div>
              <div className="stat-desc">Across All Departments</div>
            </div>
          </div>
          <div className="hero-stat">
      <div className="stat-num">20+</div>
      <div className="stat-info">
        <div className="stat-lbl">Departments</div>
        <div className="stat-desc">Diverse academic fields</div>
      </div>
    </div>
    <div className="hero-stat">
      <div className="stat-num">96%</div>
      <div className="stat-info">
        <div className="stat-lbl">Satisfaction Rate</div>
        <div className="stat-desc">Faculty satisfaction score</div>
      </div>
    </div>
        </div>
      </section>

      <div className="dept-strip">
  <div className="strip-track">
    <span className="strip-item">CSE <span className="strip-dot"></span></span>
    <span className="strip-item">BBA <span className="strip-dot"></span></span>
    <span className="strip-item">Law <span className="strip-dot"></span></span>
    <span className="strip-item">EEE <span className="strip-dot"></span></span>
    <span className="strip-item">Pharmacy <span className="strip-dot"></span></span>
    <span className="strip-item">Architecture <span className="strip-dot"></span></span>
    <span className="strip-item">Civil Engineering <span className="strip-dot"></span></span>
    <span className="strip-item">English <span className="strip-dot"></span></span>
    <span className="strip-item">Biotechnology <span className="strip-dot"></span></span>
    <span className="strip-item">Mathematics <span className="strip-dot"></span></span>
    <span className="strip-item">CSE <span className="strip-dot"></span></span>
    <span className="strip-item">BBA <span className="strip-dot"></span></span>
    <span className="strip-item">Law <span className="strip-dot"></span></span>
    <span className="strip-item">EEE <span className="strip-dot"></span></span>
    <span className="strip-item">Pharmacy <span className="strip-dot"></span></span>
    <span className="strip-item">Architecture <span className="strip-dot"></span></span>
    <span className="strip-item">Civil Engineering <span className="strip-dot"></span></span>
    <span className="strip-item">English <span className="strip-dot"></span></span>
   
  </div>
</div>

      {/* TEACHERS */}
      <section className="section bg-cream" id="teachers">
        <div className="container">
            <div className="sec-header reveal">
      <div className="sec-eyebrow">Our Educators</div>
          <h2 className="sec-title">Meet Our Faculty</h2>
          <p className="sec-sub">Handpicked senior educators shaping academic excellence at Metropolitan University.</p>
    </div>

          <div className="teachers-grid">
            <div className="t-card reveal delay-1">

            <div className="t-card-accent"></div>
            <div className="t-card-body">
          <div className="t-card-num">01</div>
          <div className="t-card-top">
            <div className="t-avatar-wrap">
              <div className="t-avatar av1">AK</div>
              <div className="t-avatar-ring"></div>
            </div>
            <div className="t-card-info">
              <div className="t-name">Prof. Amir Khan</div>
              <div className="t-dept-badge">💻 CSE Department</div>
            </div>
          </div>
          <div className="t-meta">
            <div className="t-meta-item"><span className="t-meta-icon">📍</span> Sylhet District</div>
            <div className="t-meta-item"><span className="t-meta-icon">⏱️</span> 14 Years Exp.</div>
            <div className="t-meta-item">
              <span className="t-meta-icon">⭐</span>
              <div className="t-stars">
                <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span>
              </div> 4.9/5
            </div>
            <div className="t-meta-item"><span className="t-meta-icon">😊</span> Very Satisfied</div>
          </div>
          <div className="t-quote">"The students at MU are incredibly motivated. Watching them grow into professionals is the greatest reward of my career."</div>
        </div>
        <div className="t-card-footer">
          <div className="t-joined">Joined MU · 2010</div>
          <div className="t-arrow">↗</div>
        </div>
      </div>

      <div className="t-card reveal delay-2">
        <div className="t-card-accent"></div>
        <div className="t-card-body">
          <div className="t-card-num">02</div>
          <div className="t-card-top">
            <div className="t-avatar-wrap">
              <div className="t-avatar av2">SR</div>
              <div className="t-avatar-ring"></div>
            </div>
            <div className="t-card-info">
              <div className="t-name">Dr. Sabina Rahman</div>
              <div className="t-dept-badge">📊 BBA Department</div>
            </div>
          </div>
          <div className="t-meta">
            <div className="t-meta-item"><span className="t-meta-icon">📍</span> Dhaka District</div>
            <div className="t-meta-item"><span className="t-meta-icon">⏱️</span> 11 Years Exp.</div>
            <div className="t-meta-item">
              <span className="t-meta-icon">⭐</span>
              <div className="t-stars">
                <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span>
              </div> 4.8/5
            </div>
            <div className="t-meta-item"><span className="t-meta-icon">😊</span> Very Satisfied</div>
          </div>
          <div className="t-quote">"MU gives educators the freedom to innovate. I've been able to bring real-world business cases into every lecture."</div>
        </div>
        <div className="t-card-footer">
          <div className="t-joined">Joined MU · 2013</div>
          <div className="t-arrow">↗</div>
        </div>
      </div>

      <div className="t-card reveal delay-3">
        <div className="t-card-accent"></div>
        <div className="t-card-body">
          <div className="t-card-num">03</div>
          <div className="t-card-top">
            <div className="t-avatar-wrap">
              <div className="t-avatar av3">MH</div>
              <div className="t-avatar-ring"></div>
            </div>
            <div className="t-card-info">
              <div className="t-name">Prof. Masud Hossain</div>
              <div className="t-dept-badge">⚖️ Law Department</div>
            </div>
          </div>
          <div className="t-meta">
            <div className="t-meta-item"><span className="t-meta-icon">📍</span> Chittagong District</div>
            <div className="t-meta-item"><span className="t-meta-icon">⏱️</span> 18 Years Exp.</div>
            <div className="t-meta-item">
              <span className="t-meta-icon">⭐</span>
              <div className="t-stars">
                <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star empty">★</span>
              </div> 4.6/5
            </div>
            <div className="t-meta-item"><span className="t-meta-icon">😊</span> Satisfied</div>
          </div>
          <div className="t-quote">"Law is about justice and precision. MU's students embrace both with remarkable dedication and intellectual curiosity."</div>
        </div>
        <div className="t-card-footer">
          <div className="t-joined">Joined MU · 2008</div>
          <div className="t-arrow">↗</div>
        </div>
      </div>

      <div className="t-card reveal delay-4">
        <div className="t-card-accent"></div>
        <div className="t-card-body">
          <div className="t-card-num">04</div>
          <div className="t-card-top">
            <div className="t-avatar-wrap">
              <div className="t-avatar av4">FI</div>
              <div className="t-avatar-ring"></div>
            </div>
            <div className="t-card-info">
              <div className="t-name">Dr. Farida Islam</div>
              <div className="t-dept-badge">🔌 EEE Department</div>
            </div>
          </div>
          <div className="t-meta">
            <div className="t-meta-item"><span className="t-meta-icon">📍</span> Rajshahi District</div>
            <div className="t-meta-item"><span className="t-meta-icon">⏱️</span> 9 Years Exp.</div>
            <div className="t-meta-item">
              <span className="t-meta-icon">⭐</span>
              <div className="t-stars">
                <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span>
              </div> 4.9/5
            </div>
            <div className="t-meta-item"><span className="t-meta-icon">😊</span> Very Satisfied</div>
          </div>
          <div className="t-quote">"Engineering students here are hungry to learn. The lab facilities at MU allow me to teach beyond just theory."</div>
        </div>
        <div className="t-card-footer">
          <div className="t-joined">Joined MU · 2015</div>
          <div className="t-arrow">↗</div>
        </div>
      </div>

    </div><div className="know-more-bar reveal">
      <div className="know-more-text"><strong>320+ faculty members</strong> across all departments — explore every educator at MU.</div>
      <a href="all-teachers.html" className="btn-know">Know More — View All Teachers <span className="btn-know-arrow">→</span></a>
    </div>
    </div>
      </section>


      <section className="graphs-section" id="graphs">
  <div className="container">
    <div className="sec-header reveal" style={{ textAlign:'center'}}>
      <div className="sec-eyebrow" style={{justifyContent:'center'}}>Live Insights</div>
      <h2 className="sec-title sec-title-white">What Our Teachers Say</h2>
      <p className="sec-sub sec-sub-white" style={{margin:'0 auto'}}>Real feedback from faculty — updated automatically with every new submission.</p>
    </div>
    <div className="graphs-grid reveal">
      <div className="donut-wrap">
        <div className="donut-ring">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="16"/>
            <circle cx="0" cy="100" r="80" fill="none" stroke="url(#goldGrad)" stroke-width="16"
              stroke-dasharray="502" stroke-dashoffset="502" stroke-linecap="round"
              id="donutCircle"/>
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor:'#c8a951'}}/>
                <stop offset="100%" style={{stopColor:'#f0e0a8'}}/>
              </linearGradient>
            </defs>
          </svg>
          <div className="donut-center">
            <div className="donut-pct">96%</div>
            <div className="donut-lbl">Satisfied<br />Teachers</div>
          </div>
        </div>
        <div className="donut-caption">Based on 287 teacher responses</div>
      </div>
      <div className="bars-wrap">
        <div style={{marginBottom:'1rem'}}>
          <div className="sec-eyebrow" style={{color:'var(--gold)'}}>Key Metrics</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.6rem',fontWeight:'700',color:'var(--white)',marginBottom:'.4rem'}}>Student Behavior Ratings</div>
          <div style={{fontSize:'.82rem',color:'rgba(255,255,255,.4)'}}>Rated by faculty members across departments</div>
        </div>
        <div className="bar-item">
          <div className="bar-label-row"><span className="bar-label">Academic Engagement</span><span className="bar-val">4.8/5</span></div>
          <div className="bar-track"><div className="bar-fill" data-width="96%"></div></div>
        </div>
        <div className="bar-item">
          <div className="bar-label-row"><span className="bar-label">Classroom Behavior</span><span className="bar-val">4.7/5</span></div>
          <div className="bar-track"><div className="bar-fill" data-width="94%"></div></div>
        </div>
        <div className="bar-item">
          <div className="bar-label-row"><span className="bar-label">Assignment Quality</span><span className="bar-val">4.6/5</span></div>
          <div className="bar-track"><div className="bar-fill" data-width="92%"></div></div>
        </div>
        <div className="bar-item">
          <div className="bar-label-row"><span className="bar-label">Punctuality</span><span className="bar-val">4.5/5</span></div>
          <div className="bar-track"><div className="bar-fill" data-width="90%"></div></div>
        </div>
        <div className="bar-item">
          <div className="bar-label-row"><span className="bar-label">Participation</span><span className="bar-val">4.3/5</span></div>
          <div className="bar-track"><div className="bar-fill" data-width="86%"></div></div>
        </div>
      </div>
    </div>
    <div className="graphs-cta reveal">
      <a href="#" className="btn-outline-gold">View Full Dashboard →</a>
    </div>
  </div>
</section>

      {/* FEEDBACK FORM */}
      <section className="form-section" id="feedback-form">
        <div className="container">
          <form id="feedbackForm" onSubmit={submitFeedback}>
            <input type="text" placeholder="Name" className="form-input" required />

            <textarea className="form-textarea" placeholder="Your experience"></textarea>

            <div>
              <label>
                <input type="radio" name="recommend" onChange={() => toggleHidden(false)} />
                Yes
              </label>

              <label>
                <input type="radio" name="recommend" onChange={() => toggleHidden(true)} />
                No
              </label>
            </div>

            <div id="hiddenField" className="hidden-field">
              <textarea className="form-textarea" placeholder="Why not?"></textarea>
            </div>

            <button className="btn-submit">Submit</button>
          </form>

          <div id="successMsg" className="success-msg">
            Submitted Successfully
          </div>
        </div>
      </section>

    </>
  );
}