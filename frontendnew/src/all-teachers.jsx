import React, { useEffect, useState } from 'react';
import './all-teachers.css';

const AllTeachers = () => {
  // রেজিস্ট্রেশন ফর্মের জন্য স্টেট
  const [teachers, setTeachers]=useState([]);
  const [regData, setRegData] = useState({
    fullName: '', department: '', district: '', experience: '', employeeId: '', bio: '', recommended: true,
    whyNoMessage: '', satisfactionLevel: 'Very High',
  // ratings fields
  academicEngagement: 5,
  classroomBehavior: 5,
  resourceUtilization: 5,
  punctuality: 5,
  studentParticipation: 5
  });
  // ফটো আপলোডের জন্য আলাদা স্টেট
  const [photo, setPhoto] = useState(null);

  useEffect(()=> {fetchTeachers();}, []);

  const fetchTeachers = async () => {
    try {
      // তোমার ব্যাকএন্ড রাউট অনুযায়ী URL (ধরি localhost:5000)
      const response = await fetch('http://localhost:5000/api/teachers'); 
      const data = await response.json();
      setTeachers(data); // ডাটাবেজের সব টিচার এখন 'teachers' ভেরিয়েবলে
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };
  // ইনপুট হ্যান্ডলার ফাংশন
  const handleInputChange = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };


  const submitReg = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  // ১. সাধারণ টেক্সট ফিল্ডগুলো (Image 9 এর স্কিমা অনুযায়ী)
  formData.append('fullName', regData.fullName);
  formData.append('department', regData.department);
  formData.append('district', regData.district);
  formData.append('experience', Number(regData.experience)); // Number হতে হবে
  formData.append('employeeId', regData.employeeId);
  formData.append('bio', regData.bio);
  formData.append('recommended', regData.recommended);
  formData.append('satisfactionLevel', regData.satisfactionLevel);

  // ২. রেটিং অবজেক্টের ডাটা (Image 9 এর ratings সেকশন)
  // ব্যাকএন্ডে যেহেতু ratings একটি অবজেক্ট, তাই এভাবে পাঠাতে হবে
  formData.append('ratings[academicEngagement]', regData.academicEngagement);
  formData.append('ratings[classroomBehavior]', regData.classroomBehavior);
  formData.append('ratings[resourceUtilization]', regData.resourceUtilization);
  formData.append('ratings[punctuality]', regData.punctuality);
  formData.append('ratings[studentParticipation]', regData.studentParticipation);

  // ৩. ফটো (Image 9 এ photoUrl নামে আছে)
  if(photo) formData.append('photo', photo); 

  try {
    const response = await fetch('http://localhost:5000/api/teachers/register', {
      method: 'POST',
      body: formData 
    });

    const result = await response.json();
    if (response.ok) {
      alert("টিচার সফলভাবে রেজিস্টার হয়েছে!");
      fetchTeachers(); // নতুন লিস্ট দেখানোর জন্য
    } else {
      console.log("Backend Error:", result.error);
    }
  } catch (err) {
    alert("সার্ভারের সাথে কানেক্ট করা যাচ্ছে না!");
  }
};
  
  useEffect(() => {
    // ── SCROLL REVEAL ──
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, {threshold:.1});
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // ── BARS ANIMATION ──
    const barObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting){
          e.target.querySelectorAll('.bar-fill,.district-bar-fill,.poll-bar-fill').forEach(bar => {
            setTimeout(()=>{ bar.style.width = bar.dataset.width; }, 200);
          });
          // Donut animation
          const circle = e.target.querySelector('#donutCircle');
          if(circle){ setTimeout(()=>{ circle.style.strokeDashoffset = 502*(1-0.96); },300); }
          barObs.unobserve(e.target);
        }
      });
    },{threshold:.3});
    document.querySelectorAll('.graphs-section,.map-section,.poll-section').forEach(s=>barObs.observe(s));
  }, []);

  const toggleHidden = (show) => {
    const f = document.getElementById('hiddenField');
    if(show) f.classList.add('visible');
    else f.classList.remove('visible');
  }

  const submitFeedback = (e) => {
    e.preventDefault();
    document.getElementById('feedbackForm').style.display='none';
    document.getElementById('successMsg').classList.add('show');
  }

  /*const submitReg = (e) => {
    e.preventDefault();
    document.getElementById('regForm').style.display='none';
    document.getElementById('regSuccessMsg').classList.add('show');
  }*/

  const toggleMenu = () => {
    const m = document.getElementById('mobileMenu');
    m.classList.toggle('open');
  }

  return (
    <div className="teachers-page-wrapper">
      <div className="share-toast" id="shareToast">🔗 Link copied to clipboard!</div>

      <nav style={{borderBottom : 'none',boxShadow : 'none'}}>
       <div className="nav-left">
  <button 
    onClick={() => window.history.back()} 
    className="nav-link back-btn" 
    style={{
      background: 'rgba(59, 130, 246, 0.1)', // Shundor blue tint
      border: '1px solid rgba(59, 130, 246, 0.3)', 
      cursor: 'pointer', 
      color: '#3b82f6', 
      padding: '8px 16px', 
      borderRadius: '10px',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      outline: 'none'
    }}
    // Hover effect-er jonno nicher 2-ti line khub guruttopurno
    onMouseEnter={(e) => {
      e.currentTarget.style.background = '#3b82f6';
      e.currentTarget.style.color = 'white';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
      e.currentTarget.style.color = '#3b82f6';
    }}
  >
    <span style={{ marginRight: '5px' }}>←</span> Go back
  </button>
</div>
        <div className="nav-center"></div>
        <div className="nav-right">
          <div className="hamburger" onClick={toggleMenu} id="hamburger">
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      <div className="mobile-menu" id="mobileMenu">
        <a href="/leader" className="mobile-link">Leader</a>
      </div>

      <section className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">Faculty Panel</div>
          <h1 className="hero-title">The Minds<br />Shaping <em>Tomorrow</em></h1>
          <p className="hero-sub">Meet the dedicated educators of Metropolitan University — experts who inspire, guide, and transform the next generation of Bangladesh's leaders.</p>
          <div className="hero-btns">
            <a href="#teachers" className="btn-gold">Meet Our Teachers</a>
            <a href="#feedback-form" className="btn-ghost">Submit Feedback</a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-stat">
            <div className="stat-num">200+</div>
            <div className="stat-info">
              <div className="stat-lbl">Expert Faculty</div>
              <div className="stat-desc">Across all departments</div>
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
          {["CSE", "SWE", "Law & Justice", "EEE", "Data Science", "Economics", "English","CSE", "SWE", "Law & Justice", "EEE", "Data Science", "Economics", "English" ].map((item, index) => (
            <span key={index} className="strip-item">{item} <span className="strip-dot"></span></span>
          ))}
        </div>
      </div>

      <section className="section bg-cream" id="teachers">
        <div className="container">
          <div className="sec-header reveal">
            <div className="sec-eyebrow">Our Educators</div>
            <h2 className="sec-title">Meet Our Faculty Leaders</h2>
            <p className="sec-sub">Handpicked senior educators shaping academic excellence at Metropolitan University.</p>
          </div>

          <div className="teachers-grid">
            {/* Teacher Card 01 */}
            {/*<div className="t-card reveal delay-1">
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
            </div>8/}

            {/* Repeat similar structure for cards 02, 03, 04... আমি সময়ের অভাবে ছোট করছি না, তুমি কার্ডগুলো HTML থেকে এখানে পেস্ট করে className বদলে দিলেই হবে */}
            {/*<div className="t-card reveal delay-2">
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
            <div className="t-meta-item"><span class="t-meta-icon">😊</span> Satisfied</div>
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
      </div>*/}

          {teachers.length > 0 ? (
    teachers.map((t, index) => (
      <div className="t-card reveal visible" key={t._id || index}>
        <div className="t-card-accent"></div>
        <div className="t-card-body">
          {/* ইনডেক্স থেকে সিরিয়াল নাম্বার তৈরি (০১, ০২...) */}
          <div className="t-card-num">
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </div>
          
          <div className="t-card-top">
            <div className="t-avatar-wrap">
              {/* ডাটাবেজ থেকে আসা ইমেজ */}
              {t.photoUrl ? (
                <img src={`http://localhost:5000/${t.photoUrl}`} alt={t.fullName} className="t-avatar" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              ) : (
                <div className="t-avatar">{t.fullName?.charAt(0)}</div>
              )}
              <div className="t-avatar-ring"></div>
            </div>
            
            <div className="t-card-info">
              <div className="t-name">{t.fullName}</div>
              <div className="t-dept-badge">💻 {t.department} Department</div>
            </div>
          </div>

          <div className="t-meta">
            <div className="t-meta-item"><span className="t-meta-icon">📍</span> {t.district}</div>
            <div className="t-meta-item"><span className="t-meta-icon">⏱️</span> {t.experience} Years Exp.</div>
            <div className="t-meta-item"><span className="t-meta-icon">😊</span> {t.satisfactionLevel}</div>
          </div>

          <div className="t-quote">"{t.bio}"</div>
        </div>

        <div className="t-card-footer">
          <div className="t-joined">Joined MU · {new Date(t.createdAt).getFullYear()}</div>
          <div className="t-arrow">↗</div>
        </div>
      </div>
    ))
  ) : (
    <div className="no-data">কোনো টিচার ডাটা পাওয়া যায়নি।</div>
  )}

          
          </div>

         
        </div>
      </section>

      {/* --- Graphs Section --- */}
      <section className="graphs-section" id="graphs">
        <div className="container">
          <div className="sec-header reveal" style={{textAlign:'center'}}>
            <div className="sec-eyebrow" style={{justifyContent:'center'}}>Live Insights</div>
            <h2 className="sec-title sec-title-white">What Our Teachers Say</h2>
            <p className="sec-sub sec-sub-white" style={{margin:'0 auto'}}>Real feedback from faculty — updated automatically with every new submission.</p>
          </div>
          <div className="graphs-grid reveal">
            <div className="donut-wrap">
              <div className="donut-ring">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="16"/>
                  <circle cx="100" cy="100" r="80" fill="none" stroke="url(#goldGrad)" strokeWidth="16"
                    strokeDasharray="502" strokeDashoffset="502" strokeLinecap="round"
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
                <div style={{fontFamily:'Cormorant Garamond,serif', fontSize:'1.6rem', fontWeight:'700', color:'var(--white)', marginBottom:'.4rem'}}>Student Behavior Ratings</div>
                <div style={{fontSize:'.82rem', color:'rgba(255,255,255,.4)'}}>Rated by faculty members across departments</div>
              </div>
              {[
                {label: "Academic Engagement", val: "4.8/5", width: "96%"},
                {label: "Classroom Behavior", val: "4.7/5", width: "94%"},
                {label: "Assignment Quality", val: "4.6/5", width: "92%"},
                {label: "Punctuality", val: "4.5/5", width: "90%"},
                {label: "Participation", val: "4.3/5", width: "86%"}
              ].map((item, idx) => (
                <div key={idx} className="bar-item">
                  <div className="bar-label-row"><span className="bar-label">{item.label}</span><span className="bar-val">{item.val}</span></div>
                  <div className="bar-track"><div className="bar-fill" data-width={item.width}></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="map-section">
        <div className="container">
          <div className="sec-header reveal">
            <div className="sec-eyebrow">Geographic Reach</div>
            <h2 className="sec-title">Where Our Teachers Come From</h2>
            <p className="sec-sub">
              Faculty representing all regions of Bangladesh — a truly national university.
            </p>
          </div>

          <div className="map-grid reveal">
            <div className="map-visual">
              <div className="map-placeholder-icon">🗺️</div>
              <div className="map-placeholder-text">Interactive Bangladesh Map</div>
              <div className="map-placeholder-sub">
                Leaflet.js map renders here — showing teacher districts
              </div>
              <div className="map-dots">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="map-dot"></div>
                ))}
              </div>
            </div>

            <div className="district-stats">
              <div className="district-title">Top Districts by Faculty Count</div>
              <div className="district-list">
                {[
                  { rank: '#1', name: 'Sylhet', count: '48 teachers', width: '100%' },
                  { rank: '#2', name: 'Dhaka', count: '41 teachers', width: '85%' },
                  { rank: '#3', name: 'Chittagong', count: '35 teachers', width: '73%' },
                  { rank: '#4', name: 'Rajshahi', count: '28 teachers', width: '58%' },
                  { rank: '#5', name: 'Khulna', count: '22 teachers', width: '46%' },
                ].map((item, index) => (
                  <div className="district-item" key={index}>
                    <div className="district-rank-row">
                      <div className="district-rank">{item.rank}</div>
                      <div className="district-name">{item.name}</div>
                      <div className="district-count">{item.count}</div>
                    </div>
                    <div className="district-bar-track">
                      <div className="district-bar-fill" data-width={item.width}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Feedback Form --- */}
      <section className="form-section" id="feedback-form">
        <div className="container form-grid">
          <div className="form-grid">
            <div className="form-left reveal">
              <div className="sec-eyebrow">Share Your Voice</div>
              <h2 className="sec-title">Your Experience<br />Matters</h2>
              <p className="sec-sub">Help Metropolitan University grow by sharing your honest feedback as a faculty member.</p>


            <div className="form-points">
          <div className="form-point">
            <div className="form-point-icon">🔒</div>
            <div className="form-point-text"><strong>100% Secure</strong>Negative responses are private — only admin can view detailed reasons.</div>
          </div>
          <div className="form-point">
            <div className="form-point-icon">📊</div>
            <div className="form-point-text"><strong>Real Impact</strong>Your feedback directly updates the live dashboard and graphs.</div>
          </div>
          <div className="form-point">
            <div className="form-point-icon">⚡</div>
            <div className="form-point-text"><strong>Takes 2 Minutes</strong>Quick and easy — just a few fields to complete.</div>
          </div>
        </div>
        </div>
      
            <div className="form-right reveal delay-2">
              <form id="feedbackForm" onSubmit={submitFeedback}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" name= "fullName" 
                  value = {regData.fullName} onChange={handleInputChange}
                  className="form-input" placeholder="e.g. Dr. Your Name" required />
                </div>
                
                {/* Department & District Row */}
              {/*<div className="form-row">
              <div className="form-group">
              <label className="form-label">Department</label>
              <select className="form-select" required>
              <option value="">Select Department</option>
              <option>CSE</option><option>BBA</option><option>Law</option>
              <option>EEE</option><option>Pharmacy</option><option>Architecture</option>
              <option>Civil Engineering</option><option>English</option><option>Biotechnology</option>
              </select>
            </div>


  <div className="form-group">
    <label className="form-label">District</label>
    <select className="form-select" required>
      <option value="">Select District</option>
      <option>Sylhet</option><option>Dhaka</option><option>Chittagong</option>
      <option>Rajshahi</option><option>Khulna</option><option>Barisal</option>
      <option>Rangpur</option><option>Mymensingh</option>
    </select>
  </div>
</div>*/}
            <div className="form-row">
  {/* Department Selection */}
  <div className="form-group">
    <label className="form-label">Department</label>
    <select 
      className="form-select" 
      name="department" // ১. স্টেটের ভ্যারিয়েবল নামের সাথে মিল
      value={regData.department} // ২. স্টেট থেকে ভ্যালু পড়া
      onChange={handleInputChange} // ৩. সিলেক্ট করলে স্টেট আপডেট করা
      required
    >
      <option value="">Select Department</option>
      <option value="CSE">CSE</option>
      <option value="BBA">BBA</option>
      <option value="Law">Law</option>
      <option value="EEE">EEE</option>

      <option value="English">English</option>

    </select>
  </div>

  {/* District Selection */}
  <div className="form-group">
    <label className="form-label">District</label>
    <select 
      className="form-select" 
      name="district" // স্টেটের সাথে মিল
      value={regData.district} 
      onChange={handleInputChange} 
      required
    >
      <option value="">Select District</option>
      <option value="Sylhet">Sylhet</option>
      <option value="Dhaka">Dhaka</option>
      <option value="Chittagong">Chittagong</option>
      <option value="Rajshahi">Rajshahi</option>
      <option value="Khulna">Khulna</option>
      <option value="Barisal">Barisal</option>
      <option value="Rangpur">Rangpur</option>
      <option value="Mymensingh">Mymensingh</option>
    </select>
  </div>
</div>

{/* Experience & Employee ID Row */}
{/*<div className="form-row">
  <div className="form-group">
    <label className="form-label">Years of Experience at MU</label>
    <select className="form-select" required>
      <option value="">Select Experience</option>
      <option>Less than 1 year</option><option>1–3 years</option>
      <option>4–7 years</option><option>8–12 years</option><option>13+ years</option>
    </select>
  </div>
  <div className="form-group">
    <label className="form-label">Employee ID</label>
    <input type="text" className="form-input" placeholder="e.g. MU-2010-042" required />
  </div>
</div>*/}

<div className="form-row">
  {/* Experience Selection */}
  <div className="form-group">
    <label className="form-label">Years of Experience at MU</label>
    <select 
      className="form-select" 
      name="experience" // স্টেটের নামের সাথে মিল
      value={regData.experience} 
      onChange={handleInputChange} 
      required
    >
      <option value="">Select Experience</option>
      <option value="1">Less than 1 year</option>
      <option value="3">1–3 years</option>
      <option value="7">4–7 years</option>
      <option value="12">8–12 years</option>
      <option value="15">13+ years</option>
    </select>
  </div>

  {/* Employee ID Input */}
  <div className="form-group">
    <label className="form-label">Employee ID</label>
    <input 
      type="text" 
      name="employeeId" // স্টেটের নামের সাথে মিল (I বড় হাতের)
      className="form-input" 
      placeholder="e.g. MU-2010-042" 
      value={regData.employeeId} 
      onChange={handleInputChange} 
      required 
    />
  </div>
</div>

{/* Star Rating Section */}
<div className="form-group">
  <label className="form-label">Rate Student Behavior</label>
  <div className="star-rating">
    <input type="radio" name="stars" id="s5" value="5" /><label htmlFor="s5">★</label>
    <input type="radio" name="stars" id="s4" value="4" /><label htmlFor="s4">★</label>
    <input type="radio" name="stars" id="s3" value="3" /><label htmlFor="s3">★</label>
    <input type="radio" name="stars" id="s2" value="2" /><label htmlFor="s2">★</label>
    <input type="radio" name="stars" id="s1" value="1" /><label htmlFor="s1">★</label>
  </div>
</div>

{/* Satisfaction Level Section */}
{/*<div className="form-group">
  <label className="form-label">Satisfaction Level</label>
  <div className="radio-group">
    <label className="radio-opt"><input type="radio" name="satisfaction" value="very-high" required /><span>😊 Very High</span></label>
    <label className="radio-opt"><input type="radio" name="satisfaction" value="high" /><span>🙂 High</span></label>
    <label className="radio-opt"><input type="radio" name="satisfaction" value="medium" /><span>😐 Medium</span></label>
    <label className="radio-opt"><input type="radio" name="satisfaction" value="low" /><span>😔 Low</span></label>
  </div>
</div>*/}

<div className="form-group">
  <label className="form-label">Satisfaction Level</label>
  <div className="radio-group">
    {/* Very High */}
    <label className="radio-opt">
      <input 
        type="radio" 
        name="satisfactionLevel" // স্টেটের ভ্যারিয়েবল নামের সাথে হুবহু মিল
        value="Very High" 
        checked={regData.satisfactionLevel === "Very High"} // এটি রেডিও বাটন সিলেক্টেড রাখবে
        onChange={handleInputChange} 
        required 
      />
      <span>😊 Very High</span>
    </label>

    {/* High */}
    <label className="radio-opt">
      <input 
        type="radio" 
        name="satisfactionLevel" 
        value="High" 
        checked={regData.satisfactionLevel === "High"} 
        onChange={handleInputChange} 
      />
      <span>🙂 High</span>
    </label>

    {/* Medium */}
    <label className="radio-opt">
      <input 
        type="radio" 
        name="satisfactionLevel" 
        value="Medium" 
        checked={regData.satisfactionLevel === "Medium"} 
        onChange={handleInputChange} 
      />
      <span>😐 Medium</span>
    </label>

    {/* Low */}
    <label className="radio-opt">
      <input 
        type="radio" 
        name="satisfactionLevel" 
        value="Low" 
        checked={regData.satisfactionLevel === "Low"} 
        onChange={handleInputChange} 
      />
      <span>😔 Low</span>
    </label>
  </div>
</div>

{/* Experience Textarea */}
{/*<div className="form-group">
  <label className="form-label">Your Experience</label>
  <textarea className="form-textarea" placeholder="Share your teaching experience at MU..."></textarea>
</div>
                <div className="form-group">
                  <label className="form-label">Would you recommend MU to other educators?</label>
                  <div className="radio-group">
                    <label className="radio-opt"><input type="radio" name="recommend" value="yes" onChange={() => toggleHidden(false)} required /><span>✅ Yes</span></label>
                    <label className="radio-opt"><input type="radio" name="recommend" value="no" onChange={() => toggleHidden(true)} /><span>❌ No</span></label>
                  </div>
                </div>
                <div className="hidden-field" id="hiddenField">
                  <div className="form-group">
                    <div className="hidden-note">🔒 This response is private — only admin can view it</div>
                    <label className="form-label">Why not? (Admin only)</label>
                    <textarea className="form-textarea" placeholder="Please share your concerns confidentially..."></textarea>
                  </div>
                </div>*/}

                <div className="form-group">
  <label className="form-label">Your Experience</label>
  <textarea 
    className="form-textarea" 
    name="bio" // স্টেটের 'bio' এর সাথে মিল
    value={regData.bio}
    onChange={handleInputChange}
    placeholder="Share your teaching experience at MU..."
  ></textarea>
</div>

<div className="form-group">
  <label className="form-label">Would you recommend MU to other educators?</label>
  <div className="radio-group">
    <label className="radio-opt">
      <input 
        type="radio" 
        name="recommended" // স্টেটের সাথে মিল
        value="true" 
        checked={regData.recommended === true || regData.recommended === 'true'}
        onChange={(e) => {
          setRegData({...regData, recommended: true});
          toggleHidden(false); // তোমার আগের ফাংশনটি কল হবে
        }} 
        required 
      />
      <span>✅ Yes</span>
    </label>
    <label className="radio-opt">
      <input 
        type="radio" 
        name="recommended" 
        value="false" 
        checked={regData.recommended === false || regData.recommended === 'false'}
        onChange={(e) => {
          setRegData({...regData, recommended: false});
          toggleHidden(true); // 'No' দিলে হিডেন ফিল্ড দেখাবে
        }} 
      />
      <span>❌ No</span>
    </label>
  </div>
</div>

{/* 'No' সিলেক্ট করলে এই ঘরটি আসবে */}
<div className="hidden-field" id="hiddenField" style={{ display: regData.recommended ? 'none' : 'block' }}>
  <div className="form-group">
    <div className="hidden-note">🔒 This response is private — only admin can view it</div>
    <label className="form-label">Why not? (Admin only)</label>
    <textarea 
      className="form-textarea" 
      name="whyNoMessage" // স্টেটের সাথে মিল
      value={regData.whyNoMessage}
      onChange={handleInputChange}
      placeholder="Please share your concerns confidentially..."
    ></textarea>
  </div>
</div>
                <button type="submit" className="btn-submit">Submit Feedback →</button>
              </form>
              <div className="success-msg" id="successMsg">✅ Thank you! Your feedback has been submitted and the dashboard has been updated.</div>
            </div>
          </div>
        </div>
      </section>


      <section className="poll-section">
      <div className="container">
        <div className="poll-inner">
          <div className="sec-eyebrow" style={{ justifyContent: 'center', color: 'var(--gold)' }}>
            Live Poll
          </div>
          <h2 className="sec-title sec-title-white reveal" style={{ textAlign: 'center' }}>
            Would You Recommend MU<br />to Other Educators?
          </h2>
          
          <div className="poll-bars reveal">
            {/* YES বার */}
            <div className="poll-bar-row">
              <div className="poll-bar-label">YES</div>
              <div className="poll-bar-track">
                <div 
                  className="poll-bar-fill poll-yes-fill" 
                  data-width="94%" 
                  style={{ width: '0%', transition: 'width 1.5s ease-in-out' }}
                ></div>
              </div>
              <div className="poll-pct">94%</div>
            </div>

            {/* NO বার */}
            <div className="poll-bar-row">
              <div className="poll-bar-label" style={{ color: 'var(--steel)' }}>NO</div>
              <div className="poll-bar-track">
                <div 
                  className="poll-bar-fill poll-no-fill" 
                  data-width="6%" 
                  style={{ width: '0%', transition: 'width 1.5s ease-in-out' }}
                ></div>
              </div>
              <div className="poll-pct poll-no-pct">6%</div>
            </div>
          </div>
          
          <div className="poll-total">
            Based on 287 teacher responses · Last updated: just now
          </div>
        </div>
      </div>
    </section>

    <section className="reg-section" id="register">
  <div className="container">
    <div className="reg-grid">
      {/* বাম পাশের টেক্সট এবং প্রিভিউ কার্ড */}
      <div className="reveal">
        <div className="sec-eyebrow">Join Our Panel</div>
        <h2 className="sec-title">Are You an<br />MU Teacher?</h2>
        <p className="sec-sub">Register to appear on our faculty showcase. Your profile will be visible to students and visitors automatically.</p>
        
        <div className="preview-card">
          <div className="preview-label">✨ Your profile will look like this</div>
          <div className="preview-card-top">
            <div className="preview-avatar">👤</div>
            <div>
              <div className="preview-name">Your Name Here</div>
              <div className="preview-dept">Your Department · Your District</div>
            </div>
          </div>
          <div className="preview-fields">
            <div className="preview-field medium"></div>
            <div className="preview-field short"></div>
            <div className="preview-field medium"></div>
          </div>
        </div>
      </div>

      {/* ডান পাশের রেজিস্ট্রেশন ফর্ম */}
      <div className="reveal delay-2">
        <form id="regForm" onSubmit={(e) => {
          e.preventDefault();
          document.getElementById('regSuccessMsg').style.display = 'block';
        }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" placeholder="Prof. / Dr. Your Name" required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Department</label>
              <select className="form-select" required>
                <option value="">Select</option>
                <option>CSE</option><option>BBA</option><option>Law</option>
                <option>EEE</option><option>Pharmacy</option><option>Architecture</option>
                <option>Civil Engineering</option><option>English</option><option>Biotechnology</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">District</label>
              <select className="form-select" required>
                <option value="">Select</option>
                <option>Sylhet</option><option>Dhaka</option><option>Chittagong</option>
                <option>Rajshahi</option><option>Khulna</option><option>Barisal</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Years of Experience</label>
              <input type="number" className="form-input" placeholder="e.g. 12" min="0" max="50" />
            </div>
            <div className="form-group">
              <label className="form-label">Employee ID</label>
              <input type="text" className="form-input" placeholder="e.g. MU-2010-042" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Short Bio</label>
            <textarea className="form-textarea" style={{ minHeight: '80px' }} placeholder="Brief description of your academic background and expertise..."></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Upload Photo</label>
            <input type="file" className="form-input" accept="image/*" style={{ padding: '0.65rem 1rem' }} />
          </div>

          <button type="submit" className="btn-gold" style={{ width: '100%', padding: '1rem', fontSize: '0.82rem', letterSpacing: '0.15em' }}>
            Register & Join Faculty Panel →
          </button>
        </form>

        <div className="success-msg" id="regSuccessMsg" style={{ display: 'none', marginTop: '20px' }}>
          🎉 Registration successful! Your profile will appear on the All Teachers page shortly.
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Footer remains same, just change class to className */}
      <footer>
  <div className="container">
    <div className="footer-grid">
      {/* Brand Section */}
      <div>
        <div className="footer-brand">🎓 Metropolitan University</div>
        <div className="footer-desc">
          A leading private university in Sylhet, Bangladesh. Committed to academic excellence and shaping the leaders of tomorrow.
        </div>
        <div className="footer-socials">
          <a 
    className="social" 
    href="https://www.facebook.com/share/1Bm393EyEE/?mibextid=wwXIfr" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    fb
  </a>
  <a 
    className="social" 
    href="https://www.metrouni.edu.bd/" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    web
  </a>
         
        </div>
      </div>

      {/* Quick Links */}
      

      {/* Teachers Section */}
      <div>
        <div className="footer-head">Teachers</div>
        <ul className="footer-links">
          <li><a href="/all-teachers">All Teachers</a></li>
          <li><a href="#register">Register</a></li>
          <li><a href="#feedback-form">Feedback Form</a></li>
          <li><a href="#graphs">Stats & Graphs</a></li>
        </ul>
      </div>

      {/* Contact Section */}
      <div>
        <div className="footer-head">Contact</div>
        <ul className="footer-links">
          <li><a href="#">📍 Bateshwar, Sylhet</a></li>
          <li><a href="#">📞 +880-821-123456</a></li>
          <li><a href="#">✉ info@metrouni.edu.bd</a></li>
          <li><a href="#">🚌 Bus Schedule</a></li>
        </ul>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="footer-bottom">
      <div className="footer-copy">© 2026 Metropolitan University, Sylhet. All rights reserved.</div>
      <div className="footer-ugc">UGC Approved · Est. 2003</div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default AllTeachers;