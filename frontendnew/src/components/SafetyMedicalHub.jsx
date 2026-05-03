import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react'; 
import './SafetyMedicalHub.css';

const SafetyMedicalHub = () => {
  const safetyLinks = [
    { 
      title: "Harassment Prevention Committee", 
      detail: "muna@metrouni.edu.bd",
      url: "mailto:muna@metrouni.edu.bd" 
    },
    { 
      title: "First Aid Locations", 
      detail: "Academic Building, 1st floor",
      url: null // Non-clickable location
    },
    { 
      title: "Anti-Ragging Committee", 
      detail: "vc@metrouni.edu.bd",
      url: "mailto:vc@metrouni.edu.bd" 
    },
    { 
      title: "Anti-Terrorism Committee", 
      detail: "vc@metrouni.edu.bd",
      url: "mailto:vc@metrouni.edu.bd" 
    },
    { 
      title: "Anti-Drug Committee", 
      detail: "srahaman@metrouni.edu",
      url: "mailto:srahaman@metrouni.edu" 
    }
  ];

  const handleAction = (url) => {
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <section className="safety-minimal-section">
      <div className="safety-minimal-container">
        <h1 className="safety-main-title">Safety & Support</h1>
        
        <p className="safety-description">
          Metropolitan University maintains a zero-tolerance policy towards harassment and drugs. 
          Contact our specialized committees for immediate support.
        </p>

        <div className="safety-list-wrapper">
          {safetyLinks.map((link, index) => (
            <motion.div 
              key={index}
              className={`safety-list-item ${!link.url ? 'no-click' : ''}`}
              whileHover={link.url ? { x: 10 } : {}}
              onClick={() => handleAction(link.url)}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="item-content">
                <span className="item-title">{link.title}</span>
                <span className="item-detail">{link.detail}</span>
              </div>
              {link.url && <ChevronRight className="item-arrow" size={24} />}
            </motion.div>
          ))}
        </div>

        <div className="safety-footer">
          <a href="mailto:vc@metrouni.edu.bd" className="footer-link">Contact Vice Chancellor Office</a>
        </div>
      </div>
    </section>
  );
};

export default SafetyMedicalHub;