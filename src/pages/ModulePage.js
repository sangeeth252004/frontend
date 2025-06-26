// src/pages/ModulePage.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ModulePage.css';

const ModulePage = () => {
  const { semester, subject } = useParams();
  const navigate = useNavigate();

  return (
    <div className="module-page">
      <div className="container py-5">
        <button className="back-btn" onClick={() => navigate(`/subject/${semester}`)}>← Back to Subjects</button>

        <h2 className="module-title">Select Module for {subject} - {semester}</h2>
        <p className="module-subtitle">Choose a module to view its questions and answers</p>

        <div className="row mt-4">
          {[1, 2, 3, 4].map((mod) => (
            <div className="col-lg-3 col-md-6 mb-4" key={mod}>
              <div className="module-card">
                <h5 className="module-heading">Module {mod}</h5>
                <p className="module-desc">Includes Short & Long Answer Questions</p>
                <button
                  className="view-btn"
                  onClick={() => navigate(`/qa/${semester}/${subject}/${mod}`)}
                >
                  View Q&A →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModulePage;
