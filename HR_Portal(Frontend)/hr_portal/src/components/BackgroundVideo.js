// src/components/BackgroundVideo.js
import React from 'react';
import './BackgroundVideo.css'; // CSS file for styling

const BackgroundVideo = () => {
  return (
    <div className="video-container">
      <video autoPlay loop muted className="video">
        <source src="/videos/video-2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        {/* Add your overlay content here */}
        <h1>Welcome to Our HR Portal</h1>
        <p>Manage employees, candidates, and more efficiently.</p>
      </div>
    </div>
  );
};

export default BackgroundVideo;
