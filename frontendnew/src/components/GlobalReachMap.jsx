import React from 'react';
import { motion } from 'framer-motion';
import './GlobalReachMap.css';

const GlobalReachMap = () => {
  const mapImage = "https://cdn.pixabay.com/photo/2013/07/12/12/54/world-map-146505_1280.png";

  const mapVariants = {
    initial: { 
      scale: 1, 
      x: "0%", 
      y: "0%", 
      opacity: 0.5 
    },
    zoom: { 
      scale: 0.8,        // ম্যাপ বড় দেখানোর জন্য এটি ১ এর বেশি হতে হবে
      x: "-2%",       // সিলেটকে মাঝখানে আনার জন্য
      y: "-5%", 
      opacity: 1,      // অপাসিটি সর্বোচ্চ ১ হয়
      transition: { duration: 5, ease: [0.45, 0.05, 0.55, 0.95], delay: 0.2 }
    }
  };

  return (
    <div className="global-reach-viewport white-theme"> 
      <div className="particles-container"></div>

      <motion.div 
        className="mu-world-wrapper"
        variants={mapVariants}
        initial="initial"
        // এটি স্ক্রল করে আসার পর অ্যানিমেশন শুরু করবে
        whileInView="zoom"
        viewport={{ once: false, amount: 0.2 }}
      >
        <img 
          src={mapImage} 
          alt="World Map" 
          className="mu-cinematic-map" 
        />
        
        <motion.div 
          className="sylhet-target-marker"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
        >
          <div className="mu-pulse-effect"></div>
          <div className="mu-pulse-effect secondary"></div>
          <div className="mu-golden-pin"></div>

          <motion.span 
            className="sylhet-label"
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.8 }}
          >
            SYLHET
          </motion.span>
        </motion.div>
      </motion.div>

      <div className="mu-map-caption">
        <motion.h2 
          className="mu-elegant-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 5 }}
        >
          Metropolitan University
        </motion.h2>
        <motion.p 
          className="mu-location-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 5.2 }}
        >
          SYLHET, BANGLADESH
        </motion.p>
      </div>
    </div>
  );
};

export default GlobalReachMap;