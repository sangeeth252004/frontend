// src/pages/QAViewPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './QAViewPage.css';

const QAViewPage = () => {
  const { semester, subject, module } = useParams();
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQA = async () => {
      try {
        const res = await axios.get(
          `https://backend-wyp5.onrender.com/api/questions/${semester}/${subject}/${module}`
        );
        setQuestions(res.data);
      } catch (err) {
        console.error('Failed to fetch questions:', err.message);
      }
    };
    fetchQA();
  }, [semester, subject, module]);

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || q.difficulty === filter;
    return matchesSearch && matchesFilter;
  });

  const difficultyColors = {
    Easy: 'bg-success text-white',
    Medium: 'bg-warning text-dark',
    Hard: 'bg-danger text-white'
  };

  return (
    <div className="qa-container">
      <button className="back-btn" onClick={() => navigate(`/module/${semester}/${subject}`)}>
        ← Back to Modules
      </button>

      <a
        href="https://www.instagram.com/sangeeth__babu__/"
        target="_blank"
        rel="noopener noreferrer"
        className="instagram-contact-btn"
        aria-label="Contact on Instagram"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.5.6.3 1 .6 1.5 1.1.5.5.8.9 1.1 1.5.2.4.4 1.1.5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.3-.3.6-.6 1-1.1 1.5-.5.5-.9.8-1.5 1.1-.4.2-1.1.4-2.3.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.5-.6-.3-1-.6-1.5-1.1-.5-.5-.8-.9-1.1-1.5-.2-.4-.4-1.1-.5-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.3.3-.6.6-1 1.1-1.5.5-.5.9-.8 1.5-1.1.4-.2 1.1-.4 2.3-.5C8.4 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7 .1 5.6.2 4.7.4 4 .7c-.9.3-1.6.8-2.3 1.5C.8 3 0.3 3.7 0 4.6c-.3.7-.5 1.6-.6 3C-.1 8.3 0 8.7 0 12s-.1 3.7.1 4.9c.1 1.4.3 2.3.6 3 .3.9.8 1.6 1.5 2.3.7.7 1.4 1.2 2.3 1.5.7.3 1.6.5 3 .6 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.4-.1 2.3-.3 3-.6.9-.3 1.6-.8 2.3-1.5.7-.7 1.2-1.4 1.5-2.3.3-.7.5-1.6.6-3 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.4-.3-2.3-.6-3-.3-.9-.8-1.6-1.5-2.3C20.3.8 19.6.3 18.7 0c-.7-.3-1.6-.5-3-.6C15.7-.1 15.3 0 12 0zm0 5.8A6.2 6.2 0 1 0 12 18.2 6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.6a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
        </svg>
      </a>

      <div className="qa-header">
        <h2>Module {module} - Questions & Answers</h2>
        <p>Semester {semester.slice(1)} · Subject: {subject}</p>
      </div>

      <div className="qa-controls">
        <input
          type="text"
          className="form-control"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="btn-group filter-buttons">
          {['All', 'Easy', 'Medium', 'Hard'].map(level => (
            <button
              key={level}
              className={`btn btn-sm ${filter === level ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setFilter(level)}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <h4 className="qa-title">Questions ({filteredQuestions.length})</h4>
      <p className="qa-sub">Click on any question to view the detailed answer</p>

      {filteredQuestions.map((q, index) => (
        <div key={index} className="qa-card">
          <div className="qa-question" onClick={() => setExpanded(expanded === index ? null : index)}>
            <strong>Q{index + 1}. {q.question}</strong>
            <div className="tags">
              <span className={`badge me-2 ${difficultyColors[q.difficulty]}`}>{q.difficulty}</span>
              <span className="badge bg-primary">{q.answerType || 'Long Answer'}</span>
            </div>
          </div>

          {expanded === index && (
            <div className="qa-answer">
              <strong>Answer:</strong>
              <div
                className="answer-html"
                dangerouslySetInnerHTML={{ __html: q.answer }}
              />
              {q.imageUrl && (
                <img src={q.imageUrl} alt="Answer Illustration" className="qa-image" />
              )}

              <div className="wrong-answer-wrapper">
                <a
                  href="https://www.instagram.com/sangeeth__babu__/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wrong-answer-link"
                >
                  🚫 Wrong Answer? Contact Here
                </a>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QAViewPage;
