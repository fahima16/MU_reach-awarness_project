import { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';
import AllAlumni from './all-alumni';
import AllTeachers from './all-teachers';

const AdminFeedbackPanel = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // তোমার ব্যাকএন্ড রুট থেকে ডাটা নিয়ে আসা
                const res = await axios.get('https://mu-reach-awarness-project.onrender.com/api/feedback/admin/suggestions');
                setMessages(res.data);
            } catch (err) {
                console.error("Loading", err);
            }
        };
        fetchMessages();
    }, []);

    return (
        <div style={{ padding: '40px', background: '#f8f9fa', borderRadius: '15px', marginTop: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#001f3f', borderBottom: '4px solid #e6b634', paddingBottom: '10px' }}>
                Admin Dashboard: Student Feedback
            </h2>
            <div style={{ marginTop: '20px' }}>
                {messages.length > 0 ? messages.map((m) => (
                    <div key={m._id} style={{ 
                        background: '#fff', padding: '20px', marginBottom: '15px', 
                        borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        borderLeft: m.vote === 'No' ? '6px solid #ff4d4d' : '6px solid #2ecc71'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong style={{ fontSize: '1.1rem' }}>Vote: {m.vote}</strong>
                            <small style={{ color: '#888' }}>{new Date(m.createdAt).toLocaleString()}</small>
                        </div>
                        <p style={{ marginTop: '10px', fontSize: '1rem', color: '#333', fontStyle: 'italic' }}>
                            "{m.suggestion}"
                        </p>
                    </div>
                )) : (
                    <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>No feedback available yet.</p>
                )}
            </div>
        </div>
    );
};
const RecommendationPoll = () => {
  // ১. স্টেটগুলো ব্যাকএন্ডের ডাটার সাথে ম্যাচ করে সেট করা
  const [voted, setVoted] = useState(false);
  const [choice, setChoice] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [voteStats, setVoteStats] = useState({ yesPercentage: 0, noPercentage: 0 });

  // ২. পেজ লোড হলে ডাটাবেজ থেকে লাইভ পারসেন্টেজ নিয়ে আসা
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('https://mu-reach-awarness-project.onrender.com/api/feedback/stats');
        setVoteStats(res.data);
      } catch (err) {
        console.error("Stats আনতে সমস্যা হচ্ছে:", err);
      }
    };
    fetchStats();
  }, []);

  // ৩. ভোট এবং সাজেশন সাবমিট করার ফাংশন
  const handleVoteSubmit = async (selectedType, isSuggestion = false) => {
    try {
      // ব্যাকএন্ডে ডাটা পাঠানো
      await axios.post('https://mu-reach-awarness-project.onrender.com/api/feedback/vote', {
        vote: selectedType === 'yes' ? 'Yes' : 'No',
        suggestion: isSuggestion ? suggestion : ""
      });

      if (!isSuggestion) {
        setChoice(selectedType);
        setVoted(true);
      } else {
        alert("Thank you for your suggestions!");
      }

      // ডাটা সাবমিট হওয়ার পর লাইভ রেজাল্ট আবার আপডেট করা
      const updatedRes = await axios.get('https://mu-reach-awarness-project.onrender.com/api/feedback/stats');
      setVoteStats(updatedRes.data);
    } catch (err) {
      console.error("Voting failed:", err);
      alert("Error submitting vote. Please check backend.");
    }
  };

  return (
    <div className="poll-card-premium" style={{ 
      backgroundColor: '#ffffff', padding: '40px', borderRadius: '15px',
      color: '#001f3f', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
    }}>
      
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '900', textTransform: 'uppercase', color: '#001f3f', margin: '0' }}>
          The Voice of Our Students
        </h2>
        <div style={{ width: '70px', height: '5px', background: '#e6b634', marginTop: '12px' }}></div>
        <p style={{ marginTop: '20px', fontSize: '1.1rem', color: '#444', lineHeight: '1.5' }}>
          Share your recommendation and help us inspire the next generation of scholars.
        </p>
      </div>

      {/* লাইভ রেজাল্ট বার - এখন ডাটাবেজ থেকে আসবে */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', marginBottom: '8px' }}>
            <span>Yes, I Recommend</span>
            <span style={{ color: '#e6b634' }}>{voteStats.yesPercentage}%</span>
          </div>
          <div style={{ background: '#f0f0f0', height: '12px', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${voteStats.yesPercentage}%`, background: '#e6b634', height: '100%', transition: 'width 1s ease' }}></div>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', marginBottom: '8px' }}>
            <span>No</span>
            <span>{voteStats.noPercentage}%</span>
          </div>
          <div style={{ background: '#f0f0f0', height: '12px', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${voteStats.noPercentage}%`, background: '#001f3f', height: '100%', transition: 'width 1s ease' }}></div>
          </div>
        </div>
      </div>

      {!voted ? (
        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            onClick={() => handleVoteSubmit('yes')} 
            style={{ flex: 1, padding: '14px', background: '#e6b634', color: '#001f3f', border: 'none', borderRadius: '6px', fontWeight: '800', cursor: 'pointer' }}
          > Vote Yes </button>
          <button 
            onClick={() => handleVoteSubmit('no')} 
            style={{ flex: 1, padding: '14px', background: 'transparent', color: '#001f3f', border: '2px solid #001f3f', borderRadius: '6px', fontWeight: '800', cursor: 'pointer' }}
          > Vote No </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#001f3f', padding: '15px', border: '1px dashed #e6b634', borderRadius: '8px' }}>
          Feedback Received. Thank you!
        </div>
      )}

      {/* No সিলেক্ট করলে সাজেশন বক্স */}
      {choice === 'no' && (
        <div style={{ marginTop: '30px', padding: '25px', background: '#001f3f', borderRadius: '12px', color: '#fff', borderLeft: '6px solid #e6b634' }}>
          <p style={{ color: '#e6b634', marginBottom: '15px', fontWeight: '700' }}>How can we improve?</p>
          <textarea 
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="Your suggestions are private..." 
            rows="3"
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: 'none', marginBottom: '15px', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
          />
          <button 
            onClick={() => handleVoteSubmit('no', true)}
            style={{ width: '100%', padding: '12px', background: '#e6b634', color: '#001f3f', border: 'none', borderRadius: '6px', fontWeight: '800', cursor: 'pointer' }}
          >
            Submit Suggestions
          </button>
        </div>
      )}
    </div>
  );
};

function AppContents() {

  
  const [count, setCount] = useState(0);
   // --- MOVE THIS TO THE TOP (OUTSIDE AppContents) ---
   const [inputPass, setInputPass] = useState(""); // পাসওয়ার্ড টাইপ করার জন্য
const [isAuthorized, setIsAuthorized] = useState(false); 
const [showLogin, setShowLogin] = useState(false);
const [selectedDistrict, setSelectedDistrict] = useState('Dhaka');
const [activeLocation, setActiveLocation] = useState({ title: 'Dhaka', sub: 'The Educational Heart' });
const lineChartRef = useRef(null);
const barChartRef = useRef(null);
// পাসওয়ার্ড মিলেছে কি না

// পাসওয়ার্ড চেক করার ফাংশন
const handleAdminLogin = () => {
    if (inputPass === "1234") { // তোমার সিক্রেট পাসওয়ার্ড
        setIsAuthorized(true);
        setShowLogin(false);
    } else {
        alert("Wrong password! Try again");
    }
};


  
  
  // 1. URL Copy Function
  const copyUrl = async() => {
    const shareUrl=`${window.location.origin}/reach`;
    try{
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied: " + shareUrl);
    }
    catch(err){
      console.error("Failed to copy the link:", err);
    }
    
    alert('Page link copied!');
  };
   
  const [journey, setJourney] = useState({ visible: false, name: '', dist: 0, cost: 0, bus: '' });
  const [videoUrl, setVideoUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  
  
  // --- ADDED: Auto-scroll Target Reference ---
  const resultRef = useRef(null);

  const location = useLocation();
  const hideHeader = location.pathname === '/all-alumni' || location.pathname === '/all-teachers';

  const handleShowJourney = (name, dist, cost, bus) => {
    setJourney({ visible: true, name, dist, cost, bus });

    // --- AUTO SCROLL LOGIC ---
    // Click korle 100ms por automatic smooth scroll hoye costing panel-e niye jabe
    setTimeout(() => {
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const openMUVideo = (url) => { setVideoUrl(url); setShowModal(true); };
  const closeMUVideo = () => { setVideoUrl(""); setShowModal(false); };

  /*const updateLiveMap = (e, title, sub) => {
    document.querySelectorAll('.div-card').forEach(card => card.classList.remove('active'));
    e.currentTarget.classList.add('active');

    document.getElementById('map-title').innerText = title + " Division";
    document.getElementById('map-subtitle').innerText = sub;

    if (barChartRef.current && lineChartRef.current) {
        const labels = ['Dhaka', 'Sylhet', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];
        const index = labels.indexOf(title);
        if (index !== -1) {
            barChartRef.current.data.datasets[0].data[index] = Math.floor(Math.random() * (98 - 80) + 80);
            barChartRef.current.update();
            lineChartRef.current.data.datasets[0].data = Array.from({length: 12}, () => Math.floor(Math.random() * 80));
            lineChartRef.current.update();
        }
    }
  };*/

  /*const fetchReachStats = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/reach/all-stats');
        const data = await res.json();
        
        if (barChartRef.current && lineChartRef.current) {
            // Bar Chart Update
            barChartRef.current.data.labels = data.barData.map(d => d._id);
            barChartRef.current.data.datasets[0].data = data.barData.map(d => d.total);
            barChartRef.current.update();

            // Line Chart Update
            lineChartRef.current.data.labels = data.lineData.map(d => d._id);
            lineChartRef.current.data.datasets[0].data = data.lineData.map(d => d.total);
            lineChartRef.current.update();
        }
    } catch (err) {
        console.error("Stats fetching error");
    }
};*/

const fetchReachStats = async () => {
    try {
        const res = await fetch('https://mu-reach-awarness-project.onrender.com/api/reach/all-stats');
        const data = await res.json();
        
        // ডিস্ট্রিক্টের সিরিয়াল স্থির করার জন্য একটি লিস্ট
        const fixedLabels = ['Dhaka', 'Sylhet', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];
        const fixedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // বর্তমান মাসের ইনডেক্স বের করা (এপ্রিল হলে ৩ আসবে)
        const currentMonthIndex = new Date().getMonth();

        if (barChartRef.current && lineChartRef.current) {
            // --- ১. বার চার্ট ফিক্সড করা ---
            // ব্যাকএন্ড ডাটাকে একটি অবজেক্টে নিয়ে আসা যাতে সহজে খুঁজে পাওয়া যায়
            const statsMap = {};
            data.barData.forEach(item => {
                statsMap[item._id] = item.total;
            });

            // আমাদের fixedLabels অনুযায়ী ডাটা সাজানো (যদি ডাটা না থাকে তবে ০ বসবে)
            const sortedBarData = fixedLabels.map(label => statsMap[label] || 0);

            barChartRef.current.data.labels = fixedLabels;
            barChartRef.current.data.datasets[0].data = sortedBarData;
            barChartRef.current.update();

            // --- ২. লাইন চার্ট আপডেট করা ---
            /*if (data.lineData && data.lineData.length > 0) {
                // মাস অনুযায়ী সাজানো (যদি ব্যাকএন্ড থেকে মাসের নাম আসে)
                lineChartRef.current.data.labels = data.lineData.map(d => d._id); 
                lineChartRef.current.data.datasets[0].data = data.lineData.map(d => d.total);
                lineChartRef.current.update();
            } else {
                // যদি লাইন ডাটা খালি থাকে তবে ডামি ডাটা দিয়ে চেক করতে পারো
                console.log("Line data is empty from backend");
            }*/
           const lineStatsMap = {}; 
            data.lineData.forEach(item => {
                lineStatsMap[item._id] = item.total; 
            });
           const progressiveLineData = fixedMonths.map((month, index) => {
                // যদি মাসটি বর্তমান মাসের পরের মাস হয় (Future), তবে null দাও
                if (index > currentMonthIndex) {
                    return null; 
                }
                // আগের মাস বা বর্তমান মাসের ডাটা থাকলে দাও, না থাকলে ০
                //return lineStatsMap[month] || 0;
                return lineStatsMap[month] !== undefined ? lineStatsMap[month] : 0;
            });

            lineChartRef.current.data.labels = fixedMonths; // Jan-Dec সবসময় নিচে থাকবে
            lineChartRef.current.data.datasets[0].data = progressiveLineData;
            
            // নিচের লাইনটি নিশ্চিত করে যে ফিউচার মাসের গ্যাপগুলো যেন কানেক্ট না হয়
            lineChartRef.current.options.scales.y.suggestedMax = 10;
            lineChartRef.current.options.spanGaps = false;
            
            lineChartRef.current.update();
        }
    } catch (err) {
        console.error("Stats fetch failed:", err);
    }
};

// ২. ক্লিক করলে ব্যাকএন্ডে পাঠানো এবং UI চেঞ্জ করা
const updateLiveMap = async (e, title, sub) => {
    setSelectedDistrict(title);
    setActiveLocation({ title, sub });

    try {
        await fetch('https://mu-reach-awarness-project.onrender.com/api/reach/click', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ districtName: title })
        });
        fetchReachStats(); // ক্লিক করার পর চার্ট রিফ্রেশ
    } catch (err) {
        console.log("Click save failed");
    }
};

  useEffect(() => {
    const ctxLine = document.getElementById('lineChart')?.getContext('2d');
    const ctxBar = document.getElementById('barChart')?.getContext('2d');

    if (ctxLine && ctxBar && window.Chart) {
      lineChartRef.current = new window.Chart(ctxLine, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{ 
                data: [], 
                borderColor: '#c8a951', 
                borderWidth: 3, 
                tension: 0.4, 
                pointRadius: 2, 
                fill: false 
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false, 
            animation: {
                duration: 1000, 
                easing: 'easeOutQuart',
                suggestedMax: 100
            },
            plugins: { 
                legend: { display: false } 
            }, 
            scales: { 
                y: { 
                    display: false, // গ্রিড লাইন দেখাবে না
                    beginAtZero: true // এই লাইনটি নিশ্চিত করবে ডাটা নিচ থেকে উপরে উঠবে
                    
                }, 
                x: { 
                    ticks: { color: '#aaa', font: { size: 10 } } 
                } 
            } 
        }
    });

      barChartRef.current = new window.Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{ 
              data: [], 
              backgroundColor: ['#5dade2', '#f4d03f', '#58d68d', '#eb984e', '#af7ac5', '#ec7063', '#48c9b0', '#a569bd'],
              borderRadius: 5
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100, ticks: { color: '#aaa', font: { size: 9 } } }, x: { ticks: { color: '#fff', font: { size: 9 } } } } }
      });
    }
    // ব্যাকএন্ড থেকে প্রথমবার ডাটা নিয়ে আসা
    fetchReachStats();
    // ১. ডাটাবেজ থেকে ডাটা এনে চার্ট আপডেট করা

    return () => {
        if (lineChartRef.current) lineChartRef.current.destroy();
        if (barChartRef.current) barChartRef.current.destroy();
    };
  }, []);

  
useEffect(() => {
  const handleScroll = () => {
    // Array-te 'resources' add koro
    const sections = ['home-section', 'leaders-section', 'alumni', 'visit-campus', 'resources']; 
    const scrollPos = window.scrollY + 300; 

    sections.forEach(id => {
      const section = document.getElementById(id);
      const navLink = document.querySelector(`.nav-links li a[href="#${id}"]`);

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
  handleScroll(); 
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    /*<Router>*/
    <div className="App">
      {!hideHeader && (
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
      )}
      
      <Routes>
          <Route path="/" element={
            <>
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

      <section>
        <h3 className="sec-title">Architects of Academic Excellence</h3>
        <div className="article-content">
          <img src="photo13.jpeg" alt="Welcome to MU" className="wrapped-photo" />
          <p>
            <strong>A Tradition of Scholarly Brilliance and Innovation.</strong> The faculty at Metropolitan University represents a sophisticated blend of seasoned academic leadership and forward-thinking research energy. These educators are more than just lecturers; they serve as dedicated mentors who bridge the gap between complex theoretical frameworks and real-world professional applications. By fostering an environment of open dialogue and intellectual curiosity, they empower students to push beyond the boundaries of the standard curriculum. Whether through guiding intricate technical projects or spearheading local research initiatives, the faculty members remain committed to cultivating a culture of excellence that prepares the next generation of leaders to navigate an ever-evolving global landscape.
          </p>
          <p>
            Beyond the lecture hall, our faculty members act as architects of success, transforming ambitious student ideas into functional, real-world realities. This unwavering commitment to excellence serves as the ultimate catalyst for the next generation, fostering a culture of innovation that is recognized as the bedrock of our institution’s prestige.
          </p>
        </div>
      </section>

       <aside>
        <h3 className="sec-title">MU Cafetaria 📰</h3>
        <div className="article-content">
          <img src="Photo12.jpeg" alt="Campus Spotlight" className="wrapped-photo" />
          <p>
            <strong>A Hub of Connection: Where Flavor Meets Innovation.</strong> The Metropolitan University cafeteria is more than just a dining space; it is the social and creative center of our campus community. Designed with a modern aesthetic and a commitment to quality, it provides a refreshing environment where students from all departments gather to exchange ideas over a meal. From quick snacks during lecture breaks to deep discussions over lunch, the cafeteria serves as the primary space for building the connections that define university life.
          </p>
          {/*<p>
            In line with global industry shifts, MU has pioneered the first BSc (Hons) in Data Science program in the region, focusing on AI and Machine Learning. Beyond academics, the MU Rover Scout Group and our award-winning Debating Society consistently earn national recognition.
          </p>*/}
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
            <h3>Club Achievements</h3>
            <p>Our student clubs continue to shine on national and international stages</p>
          </div>

          <div className="club-showcase-grid">
            <div className="showcase-card">
              <div className="image-container">
                <img src="/sports.jpeg" alt="Football" />
                <span className="badge-champions">CHAMPIONS</span>
              </div>
              <h4>MU Sports Club</h4>
     
            </div>
            <div className="showcase-card">
              <div className="image-container">
                <img src="/islamic.jpeg" alt="Rugby" />
                <span className="badge-rising">RISING STARS</span>
              </div>
              <h4>MU Islamic Society</h4>
           
            </div>
            <div className="showcase-card">
              <div className="image-container">
                <img src="/bncc.jpeg" alt="Athletics" />
                <span className="badge-record">RECORD BREAKERS</span>
              </div>
              <h4>MU BNCC Platoon</h4>
         
            </div>
          </div>
          
          <div className="footer-detail-text">
            <p>Metropolitan University fosters a vibrant and inclusive campus environment through a diverse range of student-led clubs and organizations. These platforms empower students to excel beyond academics by engaging in technical innovation through the MU Robotics Club and SWE Innovators Forum, or by honing leadership and diplomatic skills in the MU Model United Nations (MUN) and Debating Club. The university also emphasizes discipline and national service through the BNCC Platoon, alongside social responsibility and community welfare through the MU Social Services Club and Rover Scouts. For those interested in spiritual growth, the arts, and physical fitness, organizations such as the Islamic Society, MU Photographic Society, Cultural Club, Sports Club, and Cycling Association provide creative outlets and promote a healthy, balanced lifestyle. Together, these organizations form a dynamic ecosystem that builds leadership, teamwork, and professional expertise among the student body.</p>
          </div>
        </div>

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

      {/* --- LEADERS SECTION --- */}
      <section id="leaders-section">
        <header className="teacher-hero">
          <span className="gold-label">— FACULTY LEADERSHIP</span>
          <h1>The Minds Shaping Tomorrow</h1>
        </header>

        <section className="leaders2-section">
          <div className="leaders-grid">
            <div className="leader-card">
              <img src="lwader2.jpeg" alt="Faculty" />
              <p className="leader-dept">Dr. Toufique Rahman Chowdhury</p>
              <h3 className="leader-name">Founder & Chairman</h3>
              <div className="leader-info">
                <div>📍 Region: <strong>Sylhet</strong></div>
                <div>⏱️ Exp: <strong>15+ Years</strong></div>
              
              </div>
            </div>
            <div className="leader-card">
              <img src="leader1.jpeg" alt="Faculty" />
              <p className="leader-dept">Mr. Tanwir Rahman Chowdhury</p>
              <h3 className="leader-name">Chairman
                 Board of Trustees</h3>
              <div className="leader-info">
                <div>📍 Region: <strong>Sylhet</strong></div>
                <div>⏱️ Exp: <strong>10+ Years</strong></div>
          
              </div>
            </div>
            <div className="leader-card">
              <img src="leader3.jpeg" alt="Faculty" />
              <p className="leader-dept">Professor
Dr Mohammad Jahirul Hoque</p>
              <h3 className="leader-name"> Vice Chancellor</h3>
              <div className="leader-info">
                <div>📍 Region: <strong>Dhaka</strong></div>
                <div>⏱️ Exp: <strong>10+ Years</strong></div>
          
              </div>
            </div>
          </div>
          {/*<div className="btn-container">
            <a href="/all-teachers" className="know-more-btn">
              Know More — View All Faculty <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }}></i>
            </a>
          </div>*/}
          <div className="btn-container">
            <Link to="/all-teachers" className="know-more-btn">
                Know More — View All Faculty <i className="fas fa-arrow-right"></i>
            </Link>
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
        {/*<a href="/all-alumni" className="view-all-link">
            View All Alumni <i className="fas fa-arrow-right"></i>
        </a>*/}
        <Link to="/all-alumni" className="view-all-link">
                View All Alumni <i className="fas fa-arrow-right"></i>
            </Link>
    </div>
</section>
{/* --- ALUMNI SECTION END --- */}
<section id="visit-campus" className="visit-campus-section" style={{  minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f4f4f4', // or your preferred background
    padding: '80px 20px'  }}>
    <hr className="section-divider" />

    <div className="map-top-image">
        <img src="/newphoto.jpg" alt="Campus View" />
    </div>

    <div id="transportation" style ={{paddingTop: '10px' }}></div>
    <div className="map-guide-box">
    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h2 className="section-title" style={{ color: '#e6b634', textAlign: 'center', marginBottom: '10px' }}>Visit Campus</h2>
        <p className="section-subtitle" style={{ textAlign: 'center', color: '#ffffff', marginBottom: '30px' }}>Plan your journey to Metropolitan University. One click to see travel costs and distance.</p>
        
        {/* City Grid - Forced to be Column/Grid layout */}
      <div className="city-grid">
    <button className="city-btn" onClick={() => handleShowJourney('Dhaka', 240, 600, 'Green Line / Train')}>Dhaka</button>
    <button className="city-btn" onClick={() => handleShowJourney('Chittagong', 310, 800, 'S. Alam / Hanif')}>Chittagong</button>
    <button className="city-btn" onClick={() => handleShowJourney('Rajshahi', 450, 1200, 'Desh Travels')}>Rajshahi</button>
    <button className="city-btn" onClick={() => handleShowJourney('Khulna', 500, 1500, 'Hanif Enterprise')}>Khulna</button>
    <button className="city-btn" onClick={() => handleShowJourney('Barisal', 480, 1400, 'Sakura')}>Barisal</button>
    <button className="city-btn" onClick={() => handleShowJourney('Mymensingh', 210, 550, 'Ena / Soukhin')}>Mymensingh</button>
    
    <div className="rangpur-wrapper">
        <button className="city-btn" onClick={() => handleShowJourney('Rangpur', 430, 1100, 'Hanif / SR Travels')}>Rangpur</button>
    </div>
</div>

{/* Modal Fix: Eita ensure korbe jeno kalo aboron na ashe */}
{showModal && (
    <div className="mu-modal" style={{ display: 'flex', position: 'fixed', zIndex: 9999, top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', alignItems: 'center', justifyContent: 'center' }} onClick={closeMUVideo}>
        <span className="mu-close" style={{ position: 'absolute', top: '20px', right: '35px', color: '#fff', fontSize: '40px', cursor: 'pointer' }} onClick={closeMUVideo}>&times;</span>
        <div className="mu-modal-content" style={{ width: '80%', maxWidth: '800px' }} onClick={e => e.stopPropagation()}>
            <iframe width="100%" height="450" src={videoUrl} frameBorder="0" allowFullScreen></iframe>
        </div>
    </div>
)}

        {/* Costing Result Box - Exactly as your HTML design */}

        <div ref={resultRef}></div>
        {journey.visible && (
            
            <div id="journey-result" className="journey-card" style={{ 
                display: 'block', 
                background: '#fff', 
                padding: '25px', 
                borderRadius: '12px', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                marginTop: '20px'
            }}>
                <h3 style={{ color: '#001f3f', borderBottom: '2px solid #c8a951', paddingBottom: '10px', marginBottom: '20px' }}>Journey Details: {journey.name}</h3>
                <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                    <div className="info-item">
                        <strong style={{ display: 'block', color: '#666', fontSize: '14px' }}>Distance</strong>
                        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#001f3f' }}><span>{journey.dist}</span> km</p>
                    </div>
                    <div className="info-item">
                        <strong style={{ display: 'block', color: '#666', fontSize: '14px' }}>Est. Cost</strong>
                        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#001f3f' }}>৳<span>{journey.cost}</span></p>
                    </div>
                    <div className="info-item">
                        <strong style={{ display: 'block', color: '#666', fontSize: '14px' }}>Transport</strong>
                        <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#001f3f' }}>{journey.bus}</p>
                    </div>
                </div>
                <div className="housing-note" style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
                    <p style={{ color: '#444', margin: 0 }}>🏠 <strong>Accommodation:</strong> University Hostels and private mess options are available near the Bateshwar campus.</p>
                </div>
            </div>
        )}
    </div>
</div>
    
    <div id="reach-dashboard" style ={{paddingTop: '10px' }}></div>
    <div className="reach-awareness-container">
        <h2 className="reach-title">MU Across Bangladesh & Beyond</h2>
        <div className="reach-underline"></div>

        <div className="reach-flex-layout">
            {/*<div className="division-selector">
                <div className="div-card active" onClick={(e) => updateLiveMap(e, 'Dhaka', 'The Educational Heart')}>
                    <h3>Dhaka</h3>
                    <p>Capital Connectivity</p>
                </div>
                <div className="div-card" onClick={(e) => updateLiveMap(e, 'Sylhet', 'Campus Home Division')}>
                    <h3>Sylhet</h3>
                    <p>Home of MU</p>
                </div>
                <div className="div-card" onClick={(e) => updateLiveMap(e, 'Chittagong', 'Coastal Reach')}>
                    <h3>Chittagong</h3>
                    <p>Southern Gateway</p>
                </div>
                <div className="div-card" onClick={(e) => updateLiveMap(e, 'Rajshahi', 'Silk City Education')}>
                    <h3>Rajshahi</h3>
                    <p>Knowledge Center</p>
                </div>
                <div className="div-card" onClick={(e) => updateLiveMap(e, 'Khulna', 'Industrial Reach')}>
                    <h3>Khulna</h3>
                    <p>Southern Link</p>
                </div>
                <div className="div-card" onClick={(e) => updateLiveMap(e, 'Barisal', 'Riverine Outreach')}>
                    <h3>Barisal</h3>
                    <p>Venice of Bengal</p>
                </div>
                <div className="div-card" onClick={(e) => updateLiveMap(e, 'Rangpur', 'Northern Gateway')}>
                    <h3>Rangpur</h3>
                    <p>North-End Link</p>
                </div>
                <div className="div-card" onClick={(e) => updateLiveMap(e, 'Mymensingh', 'Cultural Connectivity')}>
                    <h3>Mymensingh</h3>
                    <p>Old Brahmaputra Hub</p>
                </div>
            </div>*/}

            <div className="division-selector">
        {[
            { name: 'Dhaka', sub: 'Capital Connectivity' },
            { name: 'Sylhet', sub: 'Home of MU' },
            { name: 'Chittagong', sub: 'Coastal Reach' },
            { name: 'Rajshahi', sub: 'Silk City Education' },
            { name: 'Khulna', sub: 'Industrial Reach' },
            { name: 'Barisal', sub: 'Riverine Outreach' },
            { name: 'Rangpur', sub: 'Northern Gateway' },
            { name: 'Mymensingh', sub: 'Cultural Connectivity' }
        ].map((d) => (
            <div 
                key={d.name} 
                /* এখানে active-district ক্লাস যোগ হবে যদি সিলেক্টেড হয় */
                className={`div-card ${selectedDistrict === d.name ? 'active-district' : ''}`} 
                onClick={(e) => updateLiveMap(e, d.name, d.sub)}
            >
                <h3>{d.name}</h3>
                <p>{d.sub}</p>
            </div>
        ))}
    </div>
            <div className="live-console">
                <div className="console-top">
                    <span className="status-dot">●</span> <span className="live-label">LIVE SYSTEM STATUS</span>
                    <h4 id="map-title">{activeLocation.title} Division</h4>
                    <p id="map-subtitle">{activeLocation.sub}</p>
                </div>
                <div className="chart-box" style={{ width: '100%', height: '180px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
                    <p className="chart-label" style={{ fontSize: '11px', color: '#c8a951', fontWeight: 'bold' }}>Growth Trend</p>
                    <canvas id="lineChart"></canvas>
                </div>
                <div className="chart-box" style={{ width: '100%', height: '250px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px' }}>
                    <p className="chart-label" style={{ fontSize: '11px', color: '#c8a951', fontWeight: 'bold' }}>Reach Percentage</p>
                    <canvas id="barChart"></canvas>
                </div>
            </div>
        </div>
        {/*</div>*/}
        

         <div className="recommendation-banner" style={{ 
     display: 'flex', 
    flexWrap: 'wrap', 
    backgroundColor: '#ffffff', // Background white kora hoyeche
    marginTop: '50px',
    border: '1px solid #eee'
}}>
   
    <div className="banner-left" style={{ flex: '1', minWidth: '300px' }}>
      
     <img src="cartoon.jpg" alt="MU" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
       </div>

       <div className="banner-right" style={{ flex: '1', minWidth: '300px' }}>
        {/* Component call korle baki shob auto chole ashbe */}
        <RecommendationPoll />

        {/* --- Admin Area Logic Start --- */}
<div style={{ marginTop: '50px', textAlign: 'center' }}>
    
    {/* Admin Area লেখা - এটি সবসময় দেখা যাবে */}
    <h4 
        onClick={() => !isAuthorized && setShowLogin(!showLogin)} 
        style={{ 
            cursor: 'pointer', 
            color: '#888', 
            fontSize: '0.9rem',
            borderBottom: '1px dashed #888',
            display: 'inline-block'
        }}
    >
        {isAuthorized ? 'Admin Dashboard Active' : 'Admin Area ▼'}
    </h4>

    {/* পাসওয়ার্ড কার্ড - শুধু showLogin true হলেই আসবে */}
    {showLogin && !isAuthorized && (
        <div style={{ 
            marginTop: '15px', 
            background: '#fff', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            display: 'inline-block'
        }}>
            <input 
                type="password" 
                placeholder="Enter Password" 
                value={inputPass}
                onChange={(e) => setInputPass(e.target.value)}
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <button 
                onClick={handleAdminLogin}
                style={{ marginLeft: '10px', padding: '8px 15px', background: '#001f3f', color: '#fff', borderRadius: '5px', cursor: 'pointer', border: 'none' }}
            >
                Enter
            </button>
        </div>
    )}

    {/* পাসওয়ার্ড মিলে গেলে তোমার সেই ফাংশন কল হবে */}
    {isAuthorized && <AdminFeedbackPanel />}
    
</div>
{/* --- Admin Area Logic End --- */}

        
       </div>
    </div>
    {/*</div>*/}
        
        <div className="life-mu-container" style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid #eee' }}>
            <h2 style={{ textAlign: 'center', color: '#001f3f', fontSize: '2.5rem' }}>Life at MU</h2>
            <div className="life-video-grid">
                <div className="mu-video-card" onClick={() => openMUVideo('/modern campus.mp4')}>
                    <img src="/modern campus.jpeg" alt="Modern Campus" /><div className="mu-video-overlay"><h3>Modern Campus</h3></div>
                </div>
                <div className="mu-video-card" onClick={() => openMUVideo('/student life.mp4')}>
                    <img src="/student life photo.jpeg" alt="Student Life" /><div className="mu-video-overlay"><h3>Student Life</h3></div>
                </div>
                <div className="mu-video-card" onClick={() => openMUVideo('/evening.mp4')}>
                    <img src="/evening photo.jpeg" alt="Evening Views" /><div className="mu-video-overlay"><h3>Evening Views</h3></div>
                </div>
                <div className="mu-video-card" onClick={() => openMUVideo('/academic building.mp4')}>
                    <img src="/academing photo.jpeg" alt="Academic Buildings" /><div className="mu-video-overlay"><h3>Academic Buildings</h3></div>
                </div>
            </div>
        </div>
        

      
    </div>
    </section>
 <section id="resources" className="footer-premium">
  <div className="footer-container">
    
    {/* --- THE END TITLE (Now Perfectly Centered) --- */}
    <div className="the-end-title-wrapper">
      <h1>THE END</h1>
      <div className="title-divider"></div>
      <p>Thank you for exploring our campus journey.</p>
    </div>

    {/* --- 8 WHITE BOXES GRID --- */}
    <div className="horizontal-box-grid">
      {/*<a href = "https://www.metrouni.edu.bd/" target="_blank" rel="noreferrer" className="card-link">
        <div className="mini-card-white"><span>🌐</span><h5>Official Site</h5><p>Visit Now</p></div>
      </a>*/}
      {/*<div className="mini-card-white"><span>🌐</span><h5>Official Site</h5><p>Visit Now</p></div>*/}
      <div className="mini-card-white"><span>🌐</span><h5>Official Site</h5>
          <a href = "https://www.metrouni.edu.bd/" target="_blank" rel="noreferrer" className="plain-link"> Visit Now
        </a>
      </div>
      {/*<div className="mini-card-white"><span>🚌</span><h5>Transport</h5><p>Schedules</p></div>*/}
      <div className="mini-card-white"><span>🚌</span><h5>Transport</h5>
          <a href = "#transportation" className="plain-link">
          Schedules
        </a>
      </div>
      {/*<div className="mini-card-white"><span>📞</span><h5>Call Us</h5><p>+880 1313-05</p></div>*/}
      <div className="mini-card-white"><span>📞</span><h5>Call Us</h5>
          <a href = "tel:+8801313057859" className="plain-link"> 
            +880 1313057859
          </a>
        </div>
      {/*<div className="mini-card-white"><span>📍</span><h5>Location</h5><p>Sylhet, BD</p></div>*/}
      <div className="mini-card-white"><span>📍</span><h5>Location</h5>
          <a href = "https://www.google.com/maps/place/Sylhet+Metropolitan+University/@25.7526154,89.8043258,17z/data=!4m6!3m5!1s0x3750552bc71c899d:0x804e438bcc32b390!8m2!3d25.7526154!4d89.8043258!16s%2Fm%2F02wcjss?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D"
           target="_blank" rel="noreferrer" className="plain-link">
            Sylhet, BD
          </a>
      </div>
      {/*<div className="mini-card-white"><span>🎓</span><h5>Our Graduates</h5><p>Global Impact</p></div>*/}
      <div className="mini-card-white"><span>🎓</span><h5>Our Graduates</h5>
          <a href="/all-alumni" className="plain-link"> 
            Global Impact
          </a>
      </div>

      <div className="mini-card-white"><span>💰</span><h5>Campus Costing</h5><p>Fees & Funding</p></div>
      {/*<div className="mini-card-white"><span>🇧🇩</span><h5>MU Across BD</h5><p>Our Presence</p></div>*/}
      <div className="mini-card-white"><span>🇧🇩</span><h5>MU Across BD</h5>
        <a href = "#reach-dashboard" className="plain-link">
          Our Presence
        </a>
      </div>
      {/*<div className="mini-card-white"><span>🤝</span><h5>Partnerships</h5><p>Collaborations</p></div>*/}
      <div className="mini-card-white"><span>🤝</span><h5>Partnerships</h5>
          <a href = "https://www.metrouni.edu.bd/" target="_blank" rel="noreferrer" className="plain-link"> Collaboration
        </a>
      </div>



    </div>

  </div>
</section>

    </>
          } />
          
          {/*<Route path="/all-alumni" element={<AllAlumni />} />
          <Route path="/all-teachers" element={<AllTeachers />} />*/}
          
        </Routes>

    {/* Modal Fix: ONLY shows when showModal is true */}
    {showModal && (
        <div className="mu-modal" style={{ display: 'flex', position: 'fixed', zIndex: 9999, top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', alignItems: 'center', justifyContent: 'center' }} onClick={closeMUVideo}>
            <span className="mu-close" style={{ position: 'absolute', top: '20px', right: '35px', color: '#fff', fontSize: '40px', cursor: 'pointer' }} onClick={closeMUVideo}>&times;</span>
            <div className="mu-modal-content" style={{ width: '80%', maxWidth: '800px' }} onClick={e => e.stopPropagation()}>
                <iframe width="100%" height="450" src={videoUrl} frameBorder="0" allowFullScreen title="MU Video"></iframe>
            </div>
        </div>
    )}


    </div>
    /*</Router>*/
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContents />} />
        <Route path="/reach" element={<AppContents />} />
        <Route path="/all-alumni" element={<AllAlumni />} />
          <Route path="/all-teachers" element={<AllTeachers />} />
      </Routes>
      {/*<AppContents />*/}
    </Router>
  );
}

export default App;