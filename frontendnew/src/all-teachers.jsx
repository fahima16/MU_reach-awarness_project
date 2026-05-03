import React, { useEffect, useState } from 'react';
import './all-teachers.css';
import axios from 'axios';


const TeacherComplaintPanel = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await axios.get('https://mu-reach-awarness-project.onrender.com/api/teachers/complaints');
                setComplaints(res.data.data);
            } catch (err) {
                console.error("Error", err);
            }
        };
        fetchComplaints();
    }, []);

    return (
        <div style={{ padding: '20px', background: '#fff0f0', borderRadius: '10px', marginTop: '20px', textAlign: 'left' }}>
            <h3 style={{ color: '#d9534f' }}>Urgent Teacher Complaints</h3>
            {complaints.length > 0 ? complaints.map((c) => (
                <div key={c._id} style={{ background: '#fff', padding: '15px', marginBottom: '10px', borderRadius: '8px', borderLeft: '5px solid #d9534f' }}>
                    <p><strong>Teacher:</strong> {c.fullName} ({c.employeeId})</p>
                    <p style={{ color: '#721c24', background: '#fff5f5', padding: '8px', borderRadius: '5px' }}>
                        <strong>Reason:</strong> {c.whyNoMessage}
                    </p>
                </div>
            )) : <p>No complaints yet.</p>}
        </div>
    );
};

const AllTeachers = () => {

  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [passInput, setPassInput] = useState("");

const handleLogin = () => {
    if (passInput === "1234") { // তোমার পছন্দমতো পাসওয়ার্ড দাও
        setIsAdminAuth(true);
        setShowAdminLogin(false);
    } else {
        alert("Wrong Password!");
    }
};
  const [districtStats, setDistrictStats] = useState([]);
  const defaultDistricts = [
  { _id: 'Sylhet', totalTeachers: 0 },
  { _id: 'Dhaka', totalTeachers: 0 },
  { _id: 'Chittagong', totalTeachers: 0 },
  { _id: 'Rajshahi', totalTeachers: 0 },
  { _id: 'Khulna', totalTeachers: 0 }
];


  useEffect(() => {
    const fetchDistrictStats = async () => {
      try {
      const response = await axios.get('https://mu-reach-awarness-project.onrender.com/api/teachers/stats-by-district');
     
      // ডাটাবেজ থেকে আসা ডেটাকে ডিফল্ট ডিস্ট্রিক্টগুলোর সাথে মিশিয়ে ফেলা (Merge)
      const mergedData = defaultDistricts.map(defDist => {
        const found = response.data.find(d => d._id === defDist._id);
        return found ? found : defDist;
      });


      // এরপর ডাটাবেজের অন্য কোনো নতুন জেলা থাকলে সেগুলোকেও যোগ করা (যদি সেরা ৫-এ থাকে)
      const dbOnlyDistricts = response.data.filter(
        d => !defaultDistricts.find(def => def._id === d._id)
      );


      const finalDisplay = [...mergedData, ...dbOnlyDistricts]
        .sort((a, b) => b.totalTeachers - a.totalTeachers) // সংখ্যা অনুযায়ী সাজানো
        .slice(0, 5); // সব সময় সেরা ৫টি দেখানো


      setDistrictStats(finalDisplay);
    } catch (err) {
      console.error("Error:", err);
      setDistrictStats(defaultDistricts); // এরর হলে অন্তত ডিফল্টগুলো দেখাবে
    }
  };
    fetchDistrictStats();
  }, []);


 
  const [stats, setStats] = useState({
    yesPercentage: 0,
    noPercentage: 0,
    totalTeachers: 0,
    overallPercentage: 0,
    individualRatings: {
    academic: 0,
    behavior: 0,
    resources: 0,
    punctuality: 0,
    participation: 0
  }
  });


  useEffect(() => {
    const fetchStats = async () => {
      try {
       
        const response = await axios.get('https://mu-reach-awarness-project.onrender.com/api/teachers/feedback-stats');
        if (response.data && response.data.individualRatings) {
          setStats({
            yesPercentage: response.data.yesPercentage,
            noPercentage: response.data.noPercentage,
            totalTeachers: response.data.totalTeachers,
            overallPercentage: response.data.overallPercentage || 0,
          // ব্যাকএন্ড থেকে আসা individualRatings অবজেক্টটি এখানে ম্যাপ হচ্ছে
          individualRatings: {
            academic: Number(response.data.individualRatings?.academic || 0),
            behavior: Number(response.data.individualRatings?.behavior || 0),
            resources: Number(response.data.individualRatings?.resources || 0),
            punctuality: Number(response.data.individualRatings?.punctuality || 0),
            participation: Number(response.data.individualRatings?.participation || 0)
          }
          });
        }
      } catch (err) {
        console.error("Poll fetch error:", err);
      }
    };
    fetchStats();
  }, []);
  // রেজিস্ট্রেশন ফর্মের জন্য স্টেট
  const [teachers, setTeachers]=useState([]);
  const [loading, setLoading] = useState(true);
  const [regData, setRegData] = useState({
    fullName: '', department: '', district: '', experience: '', ex_details: '', employeeId: '', bio: '', recommended: 'true',
    whyNoMessage: '', satisfactionLevel: '',
  // ratings fields
  academicEngagement: 0,
  classroomBehavior: 0,
  resourceUtilization: 0,
  punctuality: 0,
  studentParticipation: 0
  });
 
  // ফটো আপলোডের জন্য আলাদা স্টেট
  const [photo, setPhoto] = useState(null);


  useEffect(()=> {fetchTeachers();}, []);


  const fetchTeachers = async () => {


    try {


      const response = await axios.get('https://mu-reach-awarness-project.onrender.com/api/teachers');


// কনসোলে চেক করো ডাটা আসলে কী ফরম্যাটে আসছে


        console.log("Backend response:", response.data);






// যদি সরাসরি অ্যারে আসে তবে এটা কাজ করবে


        setTeachers(response.data);


      } catch (err) {


      console.error("Data load error:", err);


  }


}
  // ইনপুট হ্যান্ডলার ফাংশন
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegData({
      ...regData,
      [name]: type === 'checkbox' ? checked : value
    });
  };




  const submitReg = async (e) => {
  e.preventDefault();
  const formData = new FormData();


  // ১. সাধারণ টেক্সট ফিল্ডগুলো (Image 9 এর স্কিমা অনুযায়ী)
  formData.append('fullName', regData.fullName);
    formData.append('department', regData.department);
    formData.append('district', regData.district);
    //formData.append('years_experience', Number(regData.years_experience || 0));
    formData.append('experience', Number(regData.experience));
    formData.append('ex_details', regData.ex_details);
    formData.append('employeeId', regData.employeeId); // This is the KEY
    formData.append('bio', regData.bio);
    formData.append('recommended', regData.recommended);
    formData.append('satisfactionLevel', regData.satisfactionLevel);
    formData.append('whyNoMessage', regData.whyNoMessage);


    // রেটিং অবজেক্ট (ব্যাকএন্ডের রিকোয়ারমেন্ট অনুযায়ী)
    formData.append('academicEngagement', Number(regData.academicEngagement));
    formData.append('classroomBehavior', Number(regData.classroomBehavior));
    formData.append('resourceUtilization', Number(regData.resourceUtilization));
    formData.append('punctuality', Number(regData.punctuality));
    formData.append('studentParticipation', Number(regData.studentParticipation));


  // ৩. ফটো (Image 9 এ photoUrl নামে আছে)
  //if(photo) formData.append('photo', photo);
  formData.append('photoUrl', regData.photoUrl);


  try {
      const response = await axios.post('https://mu-reach-awarness-project.onrender.com/api/teachers/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });


      if (response.data.success) {
        alert("Data successfully synced with Database!");
        //setRegData({ ...regData, fullName: '', bio: '' }); // Form clear
        setRegData({fullName: '', department: '', district: '', experience: '', ex_details: '', employeeId: '',
          bio: '', recommended: '', satisfactionLevel: '', academicEngagement: 0, classroomBehavior: 0,
          resourceUtilization: 0, punctuality: 0, studentParticipation: 0
        })
        setPhoto(null);
        fetchTeachers(); // সাথে সাথে ড্যাশবোর্ড আপডেট হবে
      }
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || "Server error"));
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
          /*const circle = e.target.querySelector('#donutCircle');
          if(circle){
            const currentPercentage = stats.overallPercentage || 0;
            const offsetValue = 502*(1-currentPercentage/100);
            setTimeout(()=>{ circle.style.strokeDashoffset = offsetValue; },300); }
          barObs.unobserve(e.target);*/
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
            <div className="stat-num">{stats.overallPercentage}%</div>
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


            {teachers && teachers.length > 0 ? (
  // filter দিয়ে নিশ্চিত করছি যেন শুধু নাম আছে এমন টিচারদের দেখায়
  teachers.filter(t => t.fullName).map((teacher, index) => (
    <div className="t-card reveal visible" key={teacher._id || index}>
      <div className="t-card-accent"></div>
      <div className="t-card-body">
       
        {/* কার্ড নম্বর ঠিক করা হয়েছে: এখানে ব্যাকটিক্স (`) হবে */}
        <div className="t-card-num">
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </div>
       
        <div className="t-card-top">
          <div className="t-avatar-wrap">
            {teacher.photoUrl ? (
              <img
                /* ইমেজের সোর্সেও ব্যাকটিক্স (`) দিতে হবে */
                //src={`https://mu-reach-awarness-project.onrender.com/${teacher.photoUrl?.replace(/\\/g, '/')}`}
                src={teacher.photoUrl}
                alt={teacher.fullName}
                className="t-avatar"
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <div className="t-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gold)', color: 'white', fontSize: '1.2rem' }}>
                {teacher.fullName?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="t-avatar-ring"></div>
          </div>
         
          <div className="t-card-info">
            <div className="t-name">{teacher.fullName}</div>
            <div className="t-dept-badge">{teacher.department} Department</div>
          </div>
        </div>


        <div className="t-meta">
          <div className="t-meta-item">
            <span className="t-meta-icon"></span> {teacher.district} District
          </div>
          <div className="t-meta-item">
            <span className="t-meta-icon"></span> {teacher.experience} Years Exp.
          </div>
          <div className="t-meta-item">
            <span className="t-meta-icon"></span> {teacher.satisfactionLevel || 'Satisfied'}
          </div>
        </div>


        <div className="t-quote">
          <strong>Bio:</strong> "{teacher.bio || "No bio provided."}"
        </div>


        <div className="t-quote">
          <strong>Experience:</strong> "{teacher.ex_details || "No experience provided."}"
        </div>


                <div className="t-content-area" style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--steel)' }}>
 
  {/* যদি Bio থাকে তবে সেটা দেখাবে */}
  {/*{teacher.bio && (
    <div className="t-bio" style={{ marginBottom: '8px', fontStyle: 'italic' }}>
       <strong>Bio:</strong> {teacher.bio}
    </div>
  )}*/}


  {/* যদি Experience (String) থাকে তবে সেটা দেখাবে */}
  {/*{teacher.experience && (
    <div className="t-exp-details" style={{ borderTop: teacher.bio ? '1px solid #eee' : 'none', paddingTop: teacher.bio ? '5px' : '0' }}>
       <strong>Expertise:</strong> {teacher.experience}
    </div>
  )}*/}


  {/* যদি কোনটাই না থাকে তবে ডিফল্ট টেক্সট */}
  {/*{!teacher.bio && !teacher.experience && (
    <div className="t-no-info">Dedicated faculty member at MU.</div>
  )}*/}


</div>


       
      </div>


      {/*<div className="t-card-footer">
        <div className="t-joined">
          Joined MU · {teacher.createdAt ? new Date(teacher.createdAt).getFullYear() : '2026'}
        </div>
        <div className="t-arrow">↗</div>
      </div>*/}
    </div>
  ))
) : (
  <div className="no-data-msg" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--steel)' }}>
     No faculty profiles found. Please register to see your card here!
  </div>
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
                    strokeDasharray="502"  strokeLinecap="round"
                    id="donutCircle"
                    style={{strokeDashoffset:stats.overallPercentage?502*(1-stats.overallPercentage/100):502, transition: 'stroke-dashoffset 1.5s ease-in-out'}}
                    />
                  <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor:'#c8a951'}}/>
                      <stop offset="100%" style={{stopColor:'#f0e0a8'}}/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="donut-center">
                  <div className="donut-pct">{stats.overallPercentage}%</div>
                  <div className="donut-lbl">Satisfied<br />Teachers</div>
                </div>
              </div>
              <div className="donut-caption">Based on {stats.totalTeachers} teacher responses</div>
            </div>
            <div className="bars-wrap">
              <div style={{marginBottom:'1rem'}}>
                <div className="sec-eyebrow" style={{color:'var(--gold)'}}>Key Metrics</div>
                <div style={{fontFamily:'Cormorant Garamond,serif', fontSize:'1.6rem', fontWeight:'700', color:'var(--white)', marginBottom:'.4rem'}}>Student Behavior Ratings</div>
                <div style={{fontSize:'.82rem', color:'rgba(255,255,255,.4)'}}>Rated by faculty members across departments</div>
              </div>
              {/*{[
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
              ))}*/}
              {[
    { label: "Academic Engagement", key: "academic" },
    { label: "Classroom Behavior", key: "behavior" },
    { label: "Assignment Quality", key: "resources" }, // backend এ resources নামে আছে
    { label: "Punctuality", key: "punctuality" },
    { label: "Participation", key: "participation" }
  ].map((item, idx) => {
    // এখানে stats.individualRatings থেকে ভ্যালু নেওয়া হচ্ছে
    const ratingValue = stats.individualRatings ? stats.individualRatings[item.key] : 0;
    const barWidth = (ratingValue / 5) * 100;


    return (
      <div key={idx} className="bar-item">
        <div className="bar-label-row">
          <span className="bar-label">{item.label}</span>
          <span className="bar-val">{ratingValue}/5</span>
        </div>
        <div className="bar-track">
          {/* data-width অ্যানিমেশনের জন্য, এবং সরাসরি width ও দেওয়া হলো যেন ডাটা আসার সাথে সাথে দেখায় */}
          <div
            className="bar-fill"
            data-width={`${barWidth}%`}
            style={{ width: `${barWidth}%`, transition: 'width 1s ease-in-out' }}
          ></div>
        </div>
      </div>
    );
  })}
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
                {/*{[
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
                ))}*/}
               {districtStats.map((item, index) => {
    const topCount = districtStats[0]?.totalTeachers || 1;
    const barWidth = item.totalTeachers > 0 ? (item.totalTeachers / topCount) * 100 : 5; // ০ হলেও ছোট একটা দাগ দেখাবে


    return (
      <div className="district-item" key={index}>
        <div className="district-rank-row">
          <div className="district-rank">#{index + 1}</div>
          <div className="district-name">{item._id}</div>
          <div className="district-count">{item.totalTeachers} teachers</div>
        </div>
        <div className="district-bar-track">
          <div
            className="district-bar-fill"
            style={{
              width: `${barWidth}%`,
              transition: 'width 1s ease-in-out',
              backgroundColor: item.totalTeachers > 0 ? 'var(--gold)' : '#e7cf31' // ডাটা না থাকলে হালকা কালার
            }}
          ></div>
        </div>
      </div>
    );
  })}
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
              <form id="regForm" onSubmit={submitReg}>
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
      name="department" 
      value={regData.department} 
      onChange={handleInputChange} 
      required
    >
      <option value="">Select Department</option>
      <option value="CSE">CSE</option>
      <option value="BBA">BBA</option>
      <option value="Law">LL.B</option>
      <option value="EEE">EEE</option>
      <option value="Economics">Economics</option>
      
      <option value="ETE">ETE</option>
      <option value="Data Science">Data Science</option>
      <option value="SWE">SWE</option>


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
{/*<div className="form-group">
  <label className="form-label">Rate Student Behavior</label>
  <div className="star-rating">
    <input type="radio" name="stars" id="s5" value="5" /><label htmlFor="s5">★</label>
    <input type="radio" name="stars" id="s4" value="4" /><label htmlFor="s4">★</label>
    <input type="radio" name="stars" id="s3" value="3" /><label htmlFor="s3">★</label>
    <input type="radio" name="stars" id="s2" value="2" /><label htmlFor="s2">★</label>
    <input type="radio" name="stars" id="s1" value="1" /><label htmlFor="s1">★</label>
  </div>
</div>*/}


<div className="form-group">
  <label className="form-label" style={{marginBottom: '15px', display: 'block', fontWeight: 'bold'}}>Rate Student Behavior (1-5 Stars)</label>
 
  {[
    { label: "Academic Engagement", name: "academicEngagement" },
    { label: "Classroom Behavior", name: "classroomBehavior" },
    { label: "Resource Utilization", name: "resourceUtilization" },
    { label: "Punctuality", name: "punctuality" },
    { label: "Student Participation", name: "studentParticipation" }
  ].map((item, idx) => (
    <div key={idx} className="rating-row" style={{marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <span style={{fontSize: '0.9rem', color: 'var(--steel)'}}>{item.label}</span>
      <div className="star-rating">
        {[5, 4, 3, 2, 1].map(num => (
          <React.Fragment key={num}>
            <input
              type="radio"
              name={item.name}
              id={`${item.name}-${num}`}
              value={num}
              checked={Number(regData[item.name]) === num}
              onChange={(e) => setRegData({...regData, [item.name]: Number(e.target.value)})}
            />
            <label htmlFor={`${item.name}-${num}`}></label>
          </React.Fragment>
        ))}
      </div>
    </div>
  ))}
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
      <span>Very High</span>
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
      <span>High</span>
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
      <span>Medium</span>
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
      <span>Low</span>
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
    name="ex_details" // স্টেটের 'bio' এর সাথে মিল
    value={regData.ex_details}
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
      <span>Yes</span>
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
      <span>No</span>
    </label>
  </div>
</div>


{/* 'No' সিলেক্ট করলে এই ঘরটি আসবে */}
<div className="hidden-field" id="hiddenField" style={{ display: regData.recommended ? 'none' : 'block' }}>
  <div className="form-group">
    <div className="hidden-note">This response is private — only admin can view it</div>
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
              <div className="success-msg" id="successMsg">Thank you! Your feedback has been submitted and the dashboard has been updated.</div>
              {/* --- Teacher Page Admin Area --- */}
<div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
    <p 
        onClick={() => !isAdminAuth && setShowAdminLogin(!showAdminLogin)} 
        style={{ cursor: 'pointer', color: '#999', fontSize: '0.8rem' }}
    >
        {isAdminAuth ? "Admin View Active" : " Admin Access (For Complaints)"}
    </p>

    {showAdminLogin && !isAdminAuth && (
        <div style={{ marginTop: '10px' }}>
            <input 
                type="password" 
                placeholder="Password" 
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button onClick={handleLogin} style={{ marginLeft: '5px', cursor: 'pointer' }}>Enter</button>
        </div>
    )}

    {/* ৩. পাসওয়ার্ড মিলে গেলে তোমার সেই প্যানেলটি দেখাবে */}
    {isAdminAuth && (
        <div style={{ marginTop: '20px' }}>
            <TeacherComplaintPanel /> 
        </div>
    )}
</div>
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
                  /*data-width="94%" */
                  style={{ width: `${stats.yesPercentage}%`, transition: 'width 1.5s ease-in-out' }}
                  /*style={{ width: '0%', transition: 'width 1.5s ease-in-out' }}*/
                ></div>
              </div>
              <div className="poll-pct">{stats.yesPercentage}%</div>
            </div>


            {/* NO বার */}
            <div className="poll-bar-row">
              <div className="poll-bar-label" style={{ color: 'var(--steel)' }}>NO</div>
              <div className="poll-bar-track">
                <div
                  className="poll-bar-fill poll-no-fill"
                  /*data-width="6%" */
                  style={{ width: `${stats.noPercentage}%`, transition: 'width 1.5s ease-in-out' }}
                  /*style={{ width: '0%', transition: 'width 1.5s ease-in-out' }}*/
                ></div>
              </div>
              <div className="poll-pct poll-no-pct">{stats.noPercentage}%</div>
            </div>
          </div>
         
          <div className="poll-total">
            {/*Based on 287 teacher responses · Last updated: just now*/}
            Based on {stats.totalTeachers} teacher responses ·
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
          <div className="preview-label">Your profile will look like this</div>
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
        {/*<form id="regForm" onSubmit={(e) => {
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
          </div>*/}


          <form id="regForm" onSubmit={submitReg}>
  {/* Full Name Field */}
  <div className="form-group">
    <label className="form-label">Full Name</label>
    <input
      type="text"
      name="fullName"
      className="form-input"
      placeholder="Prof. / Dr. Your Name"
      value={regData.fullName}
      onChange={handleInputChange}
      required
    />
  </div>


  <div className="form-row">
    {/* Department Field */}
    <div className="form-group">
      <label className="form-label">Department</label>
      <select
        className="form-select"
        name="department"
        value={regData.department}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Department</option>
      <option value="CSE">CSE</option>
      <option value="BBA">BBA</option>
      <option value="Law">LL.B</option>
      <option value="EEE">EEE</option>
      <option value="Economics">Economics</option>
      
      <option value="ETE">ETE</option>
      <option value="Data Science">Data Science</option>
      <option value="SWE">SWE</option>
        <option value="English">English</option>
       
      </select>
    </div>


    {/* District Field */}
    <div className="form-group">
      <label className="form-label">District</label>
      <select
        className="form-select"
        name="district"
        value={regData.district}
        onChange={handleInputChange}
        required
      >
        <option value="">Select</option>
        <option value="Sylhet">Sylhet</option>
        <option value="Dhaka">Dhaka</option>
        <option value="Chittagong">Chittagong</option>
        <option value="Rajshahi">Rajshahi</option>
        <option value="Khulna">Khulna</option>
        <option value="Barisal">Barisal</option>
      </select>
    </div>
  </div>


  <div className="form-row">
    {/* Experience Field */}
    <div className="form-group">
      <label className="form-label">Years of Experience</label>
      <input
        type="number"
        name="experience"
        className="form-input"
        placeholder="e.g. 12"
        min="0"
        max="50"
        value={regData.experience}
        onChange={handleInputChange}
      />
    </div>


    {/* Employee ID Field (The Connector) */}
    <div className="form-group">
      <label className="form-label">Employee ID</label>
      <input
        type="text"
        name="employeeId"
        className="form-input"
        placeholder="e.g. MU-2010-042"
        value={regData.employeeId}
        onChange={handleInputChange}
        required
      />
    </div>
  </div>


  {/* Bio Field */}
  <div className="form-group">
    <label className="form-label">Short Bio</label>
    <textarea
      name="bio"
      className="form-textarea"
      style={{ minHeight: '80px' }}
      placeholder="Brief description of your academic background and expertise..."
      value={regData.bio}
      onChange={handleInputChange}
    ></textarea>
  </div>


  {/* Photo Upload Field */}
  {/*<div className="form-group">
    <label className="form-label">Upload Photo</label>
    <input
      type="file"
      className="form-input"
      accept="image/*"
      style={{ padding: '0.65rem 1rem' }}
      onChange={(e) => setPhoto(e.target.files[0])}
    />
  </div>*/}
  {/* Photo URL Input Field */}
<div className="form-group">
  <label className="form-label">Profile Photo URL</label>
  <input
    type="url"
    name="photoUrl" // তোমার মডেল এবং handleChange এর সাথে মিল রেখে
    className="form-input"
    placeholder="Paste image link (e.g. ImgBB or Cloudinary link)"
    style={{ padding: '0.65rem 1rem' }}
    value={regData.photoUrl} // তোমার স্টেট ভেরিয়েবল
    onChange={handleInputChange} // তোমার সাধারণ handleChange ফাংশন
  />
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