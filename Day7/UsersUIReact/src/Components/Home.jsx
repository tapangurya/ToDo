/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Users, ChevronRight } from 'lucide-react';
import '../../CSS/Home.css';

const Home = () => {
  // Animation presets
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <motion.div
      className="home-hero"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Background Decorative Elements */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <motion.div className="logo-wrapper" variants={fadeInUp}>
        <div className="standard-logo">
          <Rocket className="logo-icon" size={40} />
          <span>DevPortal</span>
        </div>
      </motion.div>

      <motion.div className="hero-content" variants={fadeInUp}>
        <h1>
          Manage Your Team <br />
          <span>With Precision.</span>
        </h1>
        <p>
          A comprehensive dashboard to streamline user registration and team
          management with real-time updates.
        </p>
      </motion.div>

      <motion.div className="home-buttons" variants={fadeInUp}>
        <Link to="/userform" className="btn-primary-gradient">
          Get Started <ChevronRight size={18} />
        </Link>

        <Link to="/userslist" className="btn-secondary-outline">
          <Users size={18} style={{ marginRight: '8px' }} />
          View Directory
        </Link>
      </motion.div>

      <motion.div className="hero-stats" variants={fadeInUp}>
        <div className="stat-item">
          <b>10k+</b> <span>Active Users</span>
        </div>
        <div className="divider"></div>
        <div className="stat-item">
          <b>99.9%</b> <span>Uptime</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
